import {useEffect, useRef, useState} from 'react';
import {
  Animated,
} from 'react-native';

export const FadeAnimation = ({children}) => {

  let ref = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    fadeIn()
  }, [])
  

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.loop(
      Animated.sequence([
        Animated.timing(ref, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(ref, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        })
      ])
    ).start()
    
  };

  return <Animated.View style={{opacity: ref}}>
        {children}
    </Animated.View>

};


