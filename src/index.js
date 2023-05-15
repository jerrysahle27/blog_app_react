import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="582487219642-la3d6cceqh4sd4a664ch59frf0i5qu08.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
