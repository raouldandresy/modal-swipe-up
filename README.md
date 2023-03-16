# modal-swipe-up

<div align="center">

<h1>React Native Modal Swipe-Up</h1>

**modal-swipe-up** is a swipeable, easy to use Modal for your React Native projects. You can close the modal by swiping up with pan gestures. Feel free to redesign inside of the Modal.

</div>

<br/>

## ⚙️ Installation

To install the package;

```
$ npm i modal-swipe-up
```

✅ It is done!

<!-- ## Usage -->

## 🚀 How to use

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ModalSwipeUp from 'modal-swipe-up';

export default App = () => {
  const [modalProps, setModalProps] = useState({
   // ...or any prop you want
  });
  const [isModalActive, setIsModalActive] = useState(false);

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
        <ModalSwipeUp showModal={isModalActive} 
          onPressClose={closeModal}
          closeHeight={200}>
        <PanelContent /> {/* Your Content Here */}
       </ModalSwipeUp>
    </View>
  );
};
```

## ☝️ Options

<br/>

| Properties              | Type       | Description                                                 | Default |
| ----------------------- | ---------- | ----------------------------------------------------------- | ------- |
| **showModal**           | `bool`     | Show/Hide the modal                                         | `false` |
| **onPressClose**        | `Function` | Fired when the modal is closed                              |         |
| **closeHeight**         | `number`   | Set minimum height for swipe up and close modal             |         |
| **onOpen**              | `Function` | Fired when the modal is opened                              |         |

#### ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

#### 👏 Contributing

If you have any questions or requests or want to contribute to `modal-swipe-upl`, please write the [issue](https://github.com/raouldandresy/modal-swipe-up/issues) or give me a Pull Request freely.
