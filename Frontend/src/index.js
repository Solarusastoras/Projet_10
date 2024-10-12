import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import User from "./Pages/User";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { store } from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "../src/Components/utils/Protect_Route";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();