/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import classnames from "classnames";
import React, { useMemo } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.less";

export default function FlexContainer(props) {
  const { flex, align, justify, style, className, children, ...otherProps } = props;

  const computed_style = useMemo(() => ({ ...style, flex, alignItem: align, justifyContent: justify }), [style, flex]);

  const computed_class = useMemo(() => classnames(css.flex_box, className), [className]);

  return (
    <div style={computed_style} className={computed_class} {...otherProps}>
      {children}
    </div>
  )
};


FlexContainer.propTypes = {

};

FlexContainer.defaultProps = {
  justify: "center",
  align: "middle"
};