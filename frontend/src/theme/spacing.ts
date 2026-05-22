export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const layout = {
  screenPadding: spacing[5],
  sectionGap: spacing[6],
  cardGap: spacing[4],
  controlHeight: 54,
  tabBarHeight: 78,
  maxWidth: 460,
} as const;
