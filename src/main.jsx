import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from './redux/store';
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={1000} />
  </Provider>
);
