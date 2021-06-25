import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const getOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  try {
    const response = await fetch(
      `https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    const loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }

    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  } catch (err) {
    throw err;
  }
};

export const addOrder =
  (cartItems, totalAmount) => async (dispatch, getState) => {
    const date = new Date().toISOString();
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    console.log(userId);

    try {
      const response = await fetch(
        `https://supacakes-fc1d7-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date,
          }),
        }
      );
      const resData = await response.json();

      console.log(resData);
      if (!response.ok) {
        throw new Error(resData.error);
      }

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
