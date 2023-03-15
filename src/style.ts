import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';

export const style = StyleSheet.create({
    title:{
        fontFamily: 'Lato-Bold',
        fontSize: 34,
        color: '#004D60'
    },
    header: { 
        height: 44, 
        alignSelf: 'flex-start', 
        marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight  : 0,
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        zIndex: 10
    }
});
