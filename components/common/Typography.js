import React from "react";
import { Text, StyleSheet } from "react-native";

const Typography = (props) => {
  return (
    <Text
      style={
        props.bold
          ? { ...props.style, ...styles.bold }
          : { ...props.style, ...styles.reg }
      }>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: { fontFamily: "open-sans-bold" },
  reg: { fontFamily: "open-sans" },
});

export default Typography;
