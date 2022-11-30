/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function StickyBlock(props) {
  const { children } = props;

  const [content_element, set_content_element] = useState(null);

  const container_style = useMemo(() => ({
    borderTop: "1px soild #888",
    height: content_element && content_element.offsetHeight,
  }), [content_element]);

  const content_style = useMemo(() => ({
    padding: 10,
    position: "fixed",
    background: "#FFFFFF",
    left: 0, right: 0, bottom: 0
  }), []);

  return (
    <div style={container_style}>
      <div ref={set_content_element} style={content_style}>
        {children}
      </div>
    </div>
  )
};


StickyBlock.propTypes = {

};

StickyBlock.defaultProps = {

};