import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import User from "./Pages/User";
import Footer from "./Components/Footer";
import { store } from "./Store/store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              
                <User />
             
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
