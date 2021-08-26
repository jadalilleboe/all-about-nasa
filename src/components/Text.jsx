import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary, 
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorOnDarkBackground: {
    color: theme.colors.onDarkBackground
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
      fontSize: theme.fontSizes.heading
  },
  fontSizeBig: {
    fontSize: theme.fontSizes.big
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  paddingAround: {
    padding: 10
  },
  centered: {
    textAlign: 'center'
  }
});

const Text = ({ color, fontSize, fontWeight, style, padding, align, backgroundColor, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'onDarkBackground' && styles.colorOnDarkBackground,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'big' && styles.fontSizeBig,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
    backgroundColor === 'primary' && styles.backgroundColorPrimary,
    padding === 'paddingAround' && styles.paddingAround,
    align === 'center' && styles.centered
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;