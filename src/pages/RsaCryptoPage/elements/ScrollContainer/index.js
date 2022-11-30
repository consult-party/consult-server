/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function ScrollContainer(props) {

  const { message_list, children } = props;

  const scroll_element = useRef(null);

  useEffect(() => {
    scroll_element.current.scrollTo({ top: scroll_element.current.scrollHeight });
  }, [message_list]);

  return (
    <div ref={scroll_element} style={{ height: "100%", overflowY: "scroll" }}>
      {children}
    </div>
  )
};


ScrollContainer.propTypes = {


};
ScrollContainer.defaultProps = {


};