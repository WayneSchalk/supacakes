import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavigationContainer from "./navigation/NavigationContainer";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { View } from "react-native";

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSansBold.ttf"),
    "open-sans": require("./assets/fonts/OpenSansRegular.ttf"),
    "Libre-bold": require("./assets/fonts/LibreBaskervilleBold.ttf"),
    Libre: require("./assets/fonts/LibreBaskervilleRegular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
