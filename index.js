import * as React from "react";
import { registerRootComponent } from "expo";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import App from "./App";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Poppins",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#ffffff",
    accent: "#f1c40f",
  },
  fonts: configureFonts(fontConfig),
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
registerRootComponent(App);
