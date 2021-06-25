import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";

const OrderItems = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItems}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>R {props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={showDetails ? Colors.Secondary : Colors.Primary}
        title={showDetails ? "Hide" : "View Details"}
        onPress={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.productPrice}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({
  orderItems: {
    borderWidth: 1,
    borderColor: "#a9a9a9aa",
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: { fontFamily: "open-sans-bold", fontSize: 16 },
  date: { fontFamily: "open-sans", fontSize: 16, color: "#888" },
  detailItems: { width: "100%" },
});
