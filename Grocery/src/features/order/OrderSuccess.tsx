import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import LottieView from 'lottie-react-native';
import { screenWidth } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { replace } from '@utils/NavigationUtils';

const OrderSuccess: FC = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('LiveTracking');
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.LottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}
      >
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}
        >
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        fontFamily={Fonts.Medium}
        style={styles.addressText}
      >
        {user?.address || 'Somewhere, Knowhere😊'}
      </CustomText>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  LottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
  },
});
