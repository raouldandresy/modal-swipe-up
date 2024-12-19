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

✅ It is done!

## 🚀 How to use

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ModalSwipeUp from 'modal-swipe-up';

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
| **closeHeight**         | `number`   | Set minimum height for swipe up and close modal             |         |
| **onOpen**              | `Function` | Fired when the modal is opened                              |         |

## 🖼️ Demo

Here’s a quick demo of how the component works:

![Demo GIF](https://github.com/raouldandresy/gif/blob/main/swipe-up-modal.gif)

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions, requests, or want to contribute to `modal-swipe-up`, please write an [issue](https://github.com/raouldandresy/modal-swipe-up/issues) or submit a Pull Request freely.

