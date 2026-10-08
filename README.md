# modal-swipe-up

<div align="center">

<h1>React Native Modal Swipe-Up</h1>

**modal-swipe-up** is a swipeable, easy-to-use Modal for your React Native projects. You can close the modal by swiping up with pan gestures. Feel free to redesign the inside of the Modal.

</div>

<br/>

## ⚙️ Installation

To install the package:

```bash
npm i modal-swipe-up
```

[![npm version](https://badge.fury.io/js/modal-swipe-up.svg)](https://badge.fury.io/js/modal-swipe-up)

Peer dependencies:

```bash
# Expo (picks the versions matching your SDK)
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler

# Bare React Native (follow their install guides for the Babel/worklets setup)
npm i react-native-reanimated react-native-worklets react-native-gesture-handler
```

Works with Expo Go and with development builds. Reanimated 4 requires the New Architecture (the default on current Expo SDKs).

✅ It is done!

## 🚀 How to use

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ModalSwipeUp } from 'modal-swipe-up';

const App = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <ModalSwipeUp
        showModal={isModalActive}
        onPressClose={closeModal}
        closeHeight={200}
      >
        <View><Text>Your Content Here</Text></View>
      </ModalSwipeUp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
```

## ☝️ Options

| Property               | Type       | Description                                                 | Default |
| ----------------------- | ---------- | ----------------------------------------------------------- | ------- |
| **showModal**           | `bool`     | Show/Hide the modal                                         | `false` |
| **onPressClose**        | `Function` | Fired when the modal is closed                              |         |
| **closeHeight**         | `number`   | Swipe distance (px) after which the modal closes            | `150`   |
| **onOpen**              | `Function` | Fired when the modal is opened                              |         |
| **style**               | `ViewStyle` | Style of the modal container (e.g. `backgroundColor`)      | white background |

## 📝 Notes

### Safe area inside the modal (avoid flickering)

Do **not** use `SafeAreaView` inside the modal content. It recalculates its padding from its position on screen, so while the panel moves (especially on a slow swipe, on Android) the content flickers.

Read the insets once, from outside the modal, and apply them as plain padding:

```javascript
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Wrap your app once:
// <SafeAreaProvider><Home /></SafeAreaProvider>

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <ModalSwipeUp showModal={visible} onPressClose={close} closeHeight={150}>
      <View style={{ paddingTop: insets.top + 24 }}>
        <Text>Your Content Here</Text>
      </View>
    </ModalSwipeUp>
  );
};
```

### Other things to know

- Gestures need `react-native-gesture-handler`, `react-native-reanimated` and `react-native-worklets`. They are native modules: in a bare or development-build app, rebuild after installing them (Expo Go already includes them).
- The swipe starts after a short upward drag. Taps and buttons inside the modal still work, but an upward drag inside a vertical `ScrollView` will close the modal.
- The Android back button closes the modal.

## 🧪 Example app

A runnable Expo app is in [`example/`](./example):

```bash
cd example
npm install
npx expo run:ios # or run:android
```

## 🖼️ Demo

Here’s a quick demo of how the component works:

![Demo GIF](https://github.com/raouldandresy/gif/blob/main/swipe-up-modal.gif)

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions, requests, or want to contribute to `modal-swipe-up`, please write an [issue](https://github.com/raouldandresy/modal-swipe-up/issues) or submit a Pull Request freely.

