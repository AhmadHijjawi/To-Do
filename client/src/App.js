import React, { Suspense } from "react";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { AppRouter } from "./pages";
import { createStore } from "redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
axios.defaults.withCredentials = true;
const store = createStore(rootReducer, {});

function ToDO() {
  return (
    <Provider store={store}>
      <div className='root-container'>
        <Suspense fallback={<h1>Loading</h1>}>
          <AppRouter />
        </Suspense>
      </div>
    </Provider>
  );
}

export default ToDO;
