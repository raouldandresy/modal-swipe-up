
import React, { Component, Fragment, PureComponent } from 'react';
import { style } from './style';
import { Modal, TouchableOpacity, Text, Animated, PanResponder, View } from 'react-native';


interface ModalSwipeUpProps {
    showModal: boolean;
    onPressClose?: () => void;
    closeHeight?: number;
    onOpen?: () => void;
    submitButtonOnPress?: () => void;
}

interface ModalSwipeUpState {
    animated: Animated.Value;
    opacity: Animated.Value;
    showModal: boolean;
}

export default class ModalSwipeUp extends PureComponent<ModalSwipeUpProps, ModalSwipeUpState> {

    constructor(props: ModalSwipeUpProps) {
        super(props);
        this.state = {
            animated: new Animated.Value(-1000),
            opacity: new Animated.Value(1),
            showModal: false
        }
    }

    componentDidUpdate(prev: ModalSwipeUpProps){
        if(!prev.showModal && this.props.showModal){
            this.setState({showModal: true});
                Animated.timing(this.state.animated, {
                    duration: 500,
                    toValue: 0,
                    useNativeDriver: true
                 }).start();
            this.props.onOpen && this.props.onOpen();
        }
        if(prev.showModal && !this.props.showModal){
            this.onPressClose();
        }
    }
    
    onPress=() => {
        this.setState({animated: new Animated.Value(-1000), opacity: new Animated.Value(1), showModal: false});
        this.props.submitButtonOnPress && this.props.submitButtonOnPress();
    }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
            return true
        },

        onPanResponderMove: (e, gestureState) => {
            const { dy } = gestureState;
            if(this.props.closeHeight && dy < 0){
                this.state.animated.setValue(dy);
                let opacity = this.props.closeHeight ? this.props.closeHeight/dy : -1;
                this.state.opacity.setValue(-opacity);
            }
        },

        onPanResponderRelease: (e, gestureState) => {
            const { dy } = gestureState;
            if(this.props.closeHeight){
                if(dy < -this.props.closeHeight) { // Swipe up away
                   this.onPressClose();
                } else {  
                    this.setState({opacity: new Animated.Value(1)})
                    Animated.timing(this.state.animated, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true
                    }).start();
                }
            }
        }
    })

    onPressClose = () => {
        Animated.timing(this.state.animated, {
            duration: 500,
            toValue: -1000,
            useNativeDriver: true
         }).start(this.close);
    }

    close = () => {
        this.setState({animated: new Animated.Value(-1000), opacity: new Animated.Value(1), showModal: false})
        this.props.onPressClose && this.props.onPressClose();
    }

    render() { 
        return (
            <Modal visible={this.state.showModal} transparent>
            <Animated.View style={[{transform:[{translateY: this.state.animated}]},
                     style.wrapper,
                     {opacity: this.state.opacity}]} 
                     {...this.panResponder.panHandlers}>
                <CustomBody transparent >
                    {this.props.children}
                </CustomBody>
            </Animated.View >
            </Modal>
        );
    }
}

