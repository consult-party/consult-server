import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/layouts/basic_layouts";

import LoginPage from "@/pages/LoginPage";
import RsaCryptoPage from "@/pages/RsaCryptoPage";

import "@/global.less";



export default () => (
  <Routes>
    <Route path="/" element={(<BasicLayout />)}>
      <Route path="/" element={(<LoginPage />)} />
      <Route path="/chat" element={(<RsaCryptoPage />)} />
    </Route>
  </Routes>
);