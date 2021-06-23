import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Typography from "../../components/common/Typography";
import * as cartActions from "../../store/actions/cartActions";

const ProductDetailsScreen = (props) => {
  const dispatch = useDispatch();

  const productId = props.navigation.getParam("productId");

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View>
        <Button
          title="add to cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Typography style={styles.price}>
        R{selectedProduct.price.toFixed(2)}
      </Typography>
      <Typography style={styles.description}>
        {selectedProduct.description}
      </Typography>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 22,
    color: "#888",
    textAlign: "center",
    margin: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailsScreen;
