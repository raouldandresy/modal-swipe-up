import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalSwipeUp } from 'modal-swipe-up';

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

function Home() {
  const [visible, setVisible] = useState(false);
  // Insets are read from the root provider: a SafeAreaView inside the modal would
  // recompute its padding while the panel moves and make the content flicker.
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>modal-swipe-up</Text>
      <Button title="Open modal" onPress={() => setVisible(true)} />
      <ModalSwipeUp
        showModal={visible}
        closeHeight={300}
        onPressClose={() => setVisible(false)}
        style={styles.modal}
      >
        <View style={[styles.content, { paddingTop: insets.top + 24 }]}>
          <Text style={styles.modalTitle}>Swipe up to close</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </ModalSwipeUp>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 24, fontWeight: '600' },
  modal: { backgroundColor: '#004D60' },
  content: { padding: 24, gap: 16, alignItems: 'center' },
  modalTitle: { fontSize: 22, color: '#FFFFFF' },
});
