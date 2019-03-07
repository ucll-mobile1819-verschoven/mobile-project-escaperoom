import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const window = {
      width,
      height
  };

export const isSmallDevice = width < 375;
