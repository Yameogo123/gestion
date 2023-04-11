import {useEffect, useRef} from 'react';
import {
  Animated,
} from 'react-native';

export const ZoomImgAnimation = ({children}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const ref = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    move()
  }, [])
  
  const move = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ref, {
          toValue: 1.5,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(ref, {
          toValue: 0.8,
          duration: 3000,
          useNativeDriver: true,
        })
      ])
    ).start();
  };


  return <Animated.View style={{transform: [{scale: ref}]}}>
        {children}
    </Animated.View>

};


