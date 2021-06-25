import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import Colors from "../constants/Colors";
import { Platform, SafeAreaView, Button, View } from "react-native";

import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

//Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ChartScreen from "../screens/shop/ChartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions";

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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "always", horizontal: "never" }}>
          <DrawerItems {...props} />
          <Button
            title="logout"
            color={Colors.Primary}
            onPress={() => {
              dispatch(authActions.logout());
              // props.navigation.navigate("Auth");
            }}
          />
        </SafeAreaView>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    headerShown: false,
  }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
