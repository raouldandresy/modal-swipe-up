import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, StyleProp, StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { style } from './style';

export interface ModalSwipeUpProps {
    /**
     * Controls the visibility of the modal.
     */
    showModal: boolean;

    /**
     * Callback executed when the modal is closed.
     */
    onPressClose?: () => void;

    /**
     * Swipe distance (in px) after which the modal closes. Defaults to 150.
     */
    closeHeight?: number;

    /**
     * Callback executed when the modal opens.
     */
    onOpen?: () => void;

    /**
     * Style applied to the modal container (e.g. backgroundColor, padding).
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Content to be displayed inside the modal.
     */
    children: React.ReactNode;
}

const OPEN_DURATION = 500;
const CLOSE_DURATION = 500;
const SNAP_BACK_DURATION = 150;
const DEFAULT_CLOSE_HEIGHT = 150;
// Upward movement (px) before the swipe takes over, so taps inside the content still work.
const ACTIVATION_OFFSET = 10;

/**
 * Full page modal that slides in from the top and closes with a swipe up.
 */
const ModalSwipeUp: React.FC<ModalSwipeUpProps> = ({
    showModal,
    onPressClose,
    closeHeight = DEFAULT_CLOSE_HEIGHT,
    onOpen,
    style: containerStyle,
    children,
}) => {
    const { height: windowHeight } = useWindowDimensions();
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useSharedValue(-windowHeight);

    // Latest callbacks for code that outlives a render (animation callbacks).
    const callbacks = useRef({ onPressClose, onOpen });
    callbacks.current = { onPressClose, onOpen };

    const finishClose = useCallback(() => {
        setIsVisible(false);
        callbacks.current.onPressClose?.();
    }, []);

    const close = useCallback(() => {
        translateY.value = withTiming(
            -windowHeight,
            { duration: CLOSE_DURATION },
            (finished) => {
                if (finished) scheduleOnRN(finishClose);
            },
        );
    }, [translateY, windowHeight, finishClose]);

    useEffect(() => {
        if (showModal) {
            translateY.value = -windowHeight;
            setIsVisible(true);
            translateY.value = withTiming(0, { duration: OPEN_DURATION });
            callbacks.current.onOpen?.();
        } else if (isVisible) {
            close();
        }
        // Only react to showModal changes; the other values are read without re-triggering.
    }, [showModal]);

    const panGesture = useMemo(
        () =>
            Gesture.Pan()
                .activeOffsetY(-ACTIVATION_OFFSET)
                .failOffsetX([-ACTIVATION_OFFSET * 2, ACTIVATION_OFFSET * 2])
                .onUpdate((e) => {
                    translateY.value = Math.min(0, e.translationY);
                })
                .onEnd((e) => {
                    if (e.translationY < -closeHeight) {
                        translateY.value = withTiming(
                            -windowHeight,
                            { duration: CLOSE_DURATION },
                            (finished) => {
                                if (finished) scheduleOnRN(finishClose);
                            },
                        );
                    } else {
                        translateY.value = withTiming(0, { duration: SNAP_BACK_DURATION });
                    }
                }),
        [translateY, closeHeight, windowHeight, finishClose],
    );

    // Fades out while swiping up; reaches 0 at the close threshold.
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateY.value, [-closeHeight, 0], [0, 1], Extrapolation.CLAMP),
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Modal visible={isVisible} transparent animationType="none" onRequestClose={close}>
            {/* Modal content lives in its own native root, so it needs its own gesture root. */}
            <GestureHandlerRootView style={StyleSheet.absoluteFill}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        // Composite the faded content as one layer so overlapping children don't flicker on Android.
                        needsOffscreenAlphaCompositing
                        style={[style.wrapper, containerStyle, animatedStyle]}
                    >
                        {children}
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    );
};

export default ModalSwipeUp;
