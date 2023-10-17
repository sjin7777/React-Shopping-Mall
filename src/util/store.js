import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import thunk from "redux-thunk";
import user from "../modules/user";
import cart from "../modules/cart";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user,
    cart
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [logger, thunk];


function configureStore() {
    const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware))) 
    const persistor = persistStore(store);

    return { store, persistor }
}

export default configureStore;