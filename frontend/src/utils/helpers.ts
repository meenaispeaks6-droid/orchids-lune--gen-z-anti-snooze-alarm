import { Dimensions } from 'react-native';

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function isSmallScreen() {
  return Dimensions.get('window').width < 380;
}

export function percentHeight(value: number, max = 100) {
  return `${clamp(value, 0, max)}%`;
}
