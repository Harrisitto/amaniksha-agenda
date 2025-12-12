import { StyleSheet } from 'react-native';

// Central color palette
export const colors = {
  indigoBloom: '#642ca9', // --indigo-bloom
  brilliantRose: '#ff36ab', // --brilliant-rose
  bubblegumFizz: '#ff74d4', // --bubblegum-fizz
  blushPop: '#ffb8de', // --blush-pop
  softBlush: '#ffdde1', // --soft-blush
  // utility
  white: '#ffffff',
  black: '#000000',
};

// Typographic styles exported for consistent usage across the app
export const typography = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.indigoBloom,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.indigoBloom,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.indigoBloom,
  },
  description: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
  },
  miniature: {
    fontSize: 11,
    color: '#555555',
  },
  footer: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center' as const,
  },
});

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blushPop,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 12,
    padding: 12,
  },
  fabPosition: { position: "absolute", right: 20, bottom: 30 },
  
});

export default colors;
