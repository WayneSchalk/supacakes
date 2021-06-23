import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleTypo = (props) => {
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
  bold: { fontFamily: "Libre-bold" },
  reg: { fontFamily: "Libre" },
});

export default TitleTypo;
