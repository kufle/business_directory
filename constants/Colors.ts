/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#7F57F1";
const tintColorDark = "#fff";
const primary = "#00BFA6";
const primarySoft = "#ccf2ed";
const white = "#FFFFFF";
const black = "#000000";
const grey = "#6c757d";
const grey2 = "#d0d0d0";
const red = "#dc3545";

export const Colors = {
  light: {
    text: "#11181C",
    text_muted: grey,
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  PRIMARY: primary,
  primarySoft: primarySoft,
  white: white,
  black: black,
  disabled: grey2,
  borderGrey: grey2,
  danger: red,
};
