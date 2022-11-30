/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Outlet } from "react-router-dom";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function BasicLayout(props) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Outlet />
    </div>
  )
};


BasicLayout.propTypes = {


};
BasicLayout.defaultProps = {


};