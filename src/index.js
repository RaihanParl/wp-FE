import React from "react";
import "antd/dist/antd.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./Login";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Layout } from "antd";
import "tachyons/css/tachyons.min.css";
import { ItemList } from "./ItemList";
import { Detail } from "./Detail";
import { RequestContextProvider } from "./context/useRequest.js";
import { TranasactionList } from "./TransactionList";
import { PageHeader } from "./Component/PageHeaders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ height: "100%" }}>
    <Layout style={{ height: "100%" }}>
      <PageHeader />
      <Content style={{ height: "100%" }}>
        <BrowserRouter>
          <RequestContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ItemList />} />
              <Route path="/transaction" element={<TranasactionList />} />
              <Route path="/car/:carId" element={<Detail />} />
            </Routes>
          </RequestContextProvider>
        </BrowserRouter>
      </Content>
      <Footer style={{ textAlign: "center" }}>Created by Kelompok 5</Footer>
    </Layout>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
