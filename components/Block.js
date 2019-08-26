import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import * as theme from '../theme';

export default class Block extends Component {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      color,
      style,
      children,
      ...props
    } = this.props;

    const blockStyles = [
      styles.block,
      flex && { flex },
      flex === false && { flex: 0 }, // Reset/Disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      color && styles[color], // Predefined styles color for background
      color && !styles[color] && { backgroundColor: color }, // Custom background color
      style,
    ];

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: theme.sizes.border,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.0,
    shadowRadius: 10,
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
});
