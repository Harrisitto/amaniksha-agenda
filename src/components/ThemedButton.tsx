import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../theme/colors';

type Props = {
  title: string;
  onPress?: () => void;
  color?: string; // background color override
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
};

export default function ThemedButton({ title, onPress, color, style, textStyle, disabled }: Props) {
  const bg = color || colors.brilliantRose;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.6 : 1 },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 96,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
