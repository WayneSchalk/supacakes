import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/common/HeaderButton";
import OrderItems from "../../components/shop/OrderItems";
import * as ordersActions from "../../store/actions/ordersActions";
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getOrdersHandler = useCallback(async () => {
    setIsLoading(true);
    await dispatch(ordersActions.getOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    getOrdersHandler();
  }, [dispatch, getOrdersHandler]);

  const Orders = useSelector((state) => state.orders.orders);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  if (Orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You don't have any orders.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Orders}
      renderItem={(itemData) => (
        <OrderItems
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({});
