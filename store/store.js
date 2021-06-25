import { createStore, combineReducers, applyMiddleware } from "redux";
import productsReducers from "./reducers/productsReducers";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
