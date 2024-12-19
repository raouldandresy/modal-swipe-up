/**
 * ModalSwipeUp Component
 * 
 * A swipeable modal component for React Native applications.
 * Allows users to open, close, and interact with the modal using animations and gestures.
 * 
 * Props:
 * - showModal (boolean): Controls the visibility of the modal.
 * - onPressClose (function, optional): Callback executed when the modal is closed.
 * - closeHeight (number): Threshold height for swipe-to-close gesture.
 * - onOpen (function, optional): Callback executed when the modal opens.
 * - submitButtonOnPress (function, optional): Callback executed when the submit action is triggered.
 * - children (React.ReactNode): Content to be displayed inside the modal.
 */

import React, { useEffect, useRef, useState } from 'react';
import { style } from './style';
import { Modal, Animated, PanResponder, View } from 'react-native';

interface ModalSwipeUpProps {
    /**
     * Controls the visibility of the modal.
     */
    showModal: boolean;

    /**
     * Callback executed when the modal is closed.
     */
    onPressClose?: () => void;

    /**
     * Threshold height for swipe-to-close gesture.
     */
    closeHeight: number;

    /**
     * Callback executed when the modal opens.
     */
    onOpen?: () => void;

    /**
     * Content to be displayed inside the modal.
     */
    children: React.ReactNode;
}

/**
 * Functional component for ModalSwipeUp.
 * 
 * @param {ModalSwipeUpProps} props - Props for the ModalSwipeUp component.
 */
const ModalSwipeUp: React.FC<ModalSwipeUpProps> = ({
    showModal,
    onPressClose,
    closeHeight,
    onOpen,
    submitButtonOnPress,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    /**
     * Handles updates to the showModal prop to open or close the modal.
     */
    useEffect(() => {
        if (showModal) {
            setIsVisible(true);
            Animated.timing(animatedValue, {
                duration: 500,
                toValue: 0,
                useNativeDriver: true,
            }).start();
            onOpen && onOpen();
        } else if (!showModal && isVisible) {
            handlePressClose();
        }
    }, [showModal]);

    /**
     * Handles the submit button press action and resets modal state.
     */
    const handlePress = () => {
        animatedValue.setValue(-1000);
        opacityValue.setValue(1);
        setIsVisible(false);
        submitButtonOnPress && submitButtonOnPress();
    };

    /**
     * Handles the close action with animation.
     */
    const handlePressClose = () => {
        Animated.timing(animatedValue, {
            duration: 500,
            toValue: -1000,
            useNativeDriver: true,
        }).start(() => closeModal());
    };

    /**
     * Closes the modal and resets animation values.
     */
    const closeModal = () => {
        animatedValue.setValue(-1000);
        opacityValue.setValue(1);
        setIsVisible(false);
        onPressClose && onPressClose();
    };

    /**
     * PanResponder to handle swipe gestures for the modal.
     */
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            const { dy } = gestureState;
            if (closeHeight && dy < 0) {
                animatedValue.setValue(dy);
                const opacity = closeHeight ? closeHeight / dy : -1;
                opacityValue.setValue(-opacity);
            }
        },
        onPanResponderRelease: (e, gestureState) => {
            const { dy } = gestureState;
            if (closeHeight) {
                if (dy < -closeHeight) {
                    handlePressClose();
                } else {
                    opacityValue.setValue(1);
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    }).start();
                }
            }
        },
    });

    return (
        <Modal visible={isVisible} transparent>
            <Animated.View
                style={[
                    { transform: [{ translateY: animatedValue }] },
                    style.wrapper,
                    { opacity: opacityValue },
                ]}
                {...panResponder.panHandlers}
            >
                <View>{children}</View>
            </Animated.View>
        </Modal>
    );
};

export default ModalSwipeUp;
