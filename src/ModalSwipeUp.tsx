import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Modal,
    PanResponder,
    StyleProp,
    View,
    ViewStyle,
    useWindowDimensions,
} from 'react-native';
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
// Vertical movement (px) needed before the modal claims the gesture, so taps
// and scrolling inside the children keep working.
const GESTURE_ACTIVATION = 8;

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
    const translateY = useRef(new Animated.Value(-windowHeight)).current;

    // Latest values for the long-lived PanResponder and effect.
    const latest = useRef({ windowHeight, closeHeight, onPressClose, onOpen });
    latest.current = { windowHeight, closeHeight, onPressClose, onOpen };

    const close = useCallback(() => {
        Animated.timing(translateY, {
            duration: CLOSE_DURATION,
            toValue: -latest.current.windowHeight,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (!finished) return;
            setIsVisible(false);
            latest.current.onPressClose?.();
        });
    }, [translateY]);

    useEffect(() => {
        if (showModal) {
            translateY.setValue(-latest.current.windowHeight);
            setIsVisible(true);
            Animated.timing(translateY, {
                duration: OPEN_DURATION,
                toValue: 0,
                useNativeDriver: true,
            }).start();
            latest.current.onOpen?.();
        } else if (isVisible) {
            close();
        }
        // Only react to showModal changes; isVisible is read without re-triggering.
    }, [showModal]);

    useEffect(() => () => translateY.stopAnimation(), [translateY]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_e, { dx, dy }) =>
                    dy < -GESTURE_ACTIVATION && Math.abs(dy) > Math.abs(dx),
                onPanResponderMove: (_e, { dy }) => {
                    if (dy < 0) translateY.setValue(dy);
                },
                onPanResponderRelease: (_e, { dy }) => {
                    if (dy < -latest.current.closeHeight) {
                        close();
                    } else {
                        Animated.timing(translateY, {
                            toValue: 0,
                            duration: SNAP_BACK_DURATION,
                            useNativeDriver: true,
                        }).start();
                    }
                },
                onPanResponderTerminate: () => {
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: SNAP_BACK_DURATION,
                        useNativeDriver: true,
                    }).start();
                },
            }),
        [close, translateY],
    );

    // Fades out while swiping up; reaches 0 at the close threshold.
    const opacity = translateY.interpolate({
        inputRange: [-closeHeight, 0],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={close}
        >
            <Animated.View
                style={[
                    style.wrapper,
                    containerStyle,
                    { opacity, transform: [{ translateY }] },
                ]}
                {...panResponder.panHandlers}
            >
                <View>{children}</View>
            </Animated.View>
        </Modal>
    );
};

export default ModalSwipeUp;
