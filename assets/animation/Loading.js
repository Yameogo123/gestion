import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator animating={true} color={MD2Colors.red800} size={50} />
);

export default Loading;