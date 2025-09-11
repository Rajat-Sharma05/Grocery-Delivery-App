import { FC, ReactNode } from "react";
import {StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

interface CustomerSafeAreaViewProps {
    children: ReactNode,
    style?: ViewStyle,
}


const CustomerSafeAreaView:FC<CustomerSafeAreaViewProps> = ({children, style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {children}
    </View>
  )
}

export default CustomerSafeAreaView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff'
  }
})