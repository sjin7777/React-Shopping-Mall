import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";

import App from './App';
import configureStore from './util/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { store, persistor } = configureStore();

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
