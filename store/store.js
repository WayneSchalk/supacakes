import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import productsReducers from "./reducers/productsReducers";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";

const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
