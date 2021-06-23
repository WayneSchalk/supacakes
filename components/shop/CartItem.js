import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>R: {props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity style={styles.deleteBtn} onPress={props.onRemove}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={20}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: { flexDirection: "row", alignItems: "center" },
  quantity: { fontFamily: "open-sans", color: "#888", fontSize: 16 },
  mainText: { fontFamily: "open-sans-bold", fontSize: 16 },
  deleteBtn: {
    marginLeft: 20,
  },
});