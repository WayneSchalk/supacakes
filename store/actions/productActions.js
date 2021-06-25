import { Product } from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          +resData[key].price
        )
      );
    }

    dispatch({ type: SET_PRODUCT, products: loadedProducts });
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  } catch (err) {
    throw err;
  }
};

export const createProduct =
  (title, imageUrl, price, description) => async (dispatch) => {
    const response = await fetch(
      "https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageUrl, price, description }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        price,
        description,
      },
    });
  };

export const updateProduct =
  (id, title, imageUrl, description) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, imageUrl, description }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { title, imageUrl, description },
      });
    } catch (e) {
      throw e;
    }
  };
