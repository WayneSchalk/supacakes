import { createStore, combineReducers, applyMiddleware } from "redux";
import productsReducers from "./reducers/productsReducers";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";
import authReducer from "./reducers/authReducer";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
