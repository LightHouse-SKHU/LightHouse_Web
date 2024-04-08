import ReactDOM from "react-dom/client";
import App from "./Main/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Main/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />
    <App />
  </BrowserRouter>
);
