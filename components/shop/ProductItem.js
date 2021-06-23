import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import Typography from "../common/Typography";

const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: props.image }} style={styles.image} />
            </View>

            <View style={styles.details}>
              <Typography bold={true} style={styles.title}>
                {props.title}
              </Typography>
              <Typography style={styles.price}>
                R{props.price.toFixed(2)}
              </Typography>
            </View>

            <View style={styles.buttonContainer} color={Colors.Primary}>
              {props.children}
            </View>
          </View>
        </TouchableComp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  touchable: { overflow: "hidden", borderRadius: 10 },
  imageContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: "60%",
    width: "100%",
    overflow: "hidden",
  },
  image: { height: "100%", width: "100%" },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: { fontSize: 14, color: "#888" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
