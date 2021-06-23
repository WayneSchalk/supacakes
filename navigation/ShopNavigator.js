import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

import { createDrawerNavigator } from "react-navigation-drawer";

//Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ChartScreen from "../screens/shop/ChartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const NavigationOptions =
  Platform.OS === "android"
    ? (androidNavigationOptions = {
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: Colors.Primary,
        headerTitleStyle: {
          fontFamily: "open-sans",
        },
      })
    : {
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: Colors.Primary,
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: "open-sans",
      };

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: ChartScreen,
  },

  {
    defaultNavigationOptions: NavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },

  {
    defaultNavigationOptions: NavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },

  {
    defaultNavigationOptions: NavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.Primary,
      itemsContainerStyle: { paddingTop: 40 },
    },
  }
);

export default createAppContainer(ShopNavigator);
