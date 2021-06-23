import React from "react";
import { StyleSheet, Button, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const PrimaryButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <LinearGradient
        style={styles.cont}
        colors={["#4c669f", "#3b5998", "#192f6a"]}>
        <Text>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
});
