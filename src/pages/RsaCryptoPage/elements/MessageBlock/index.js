/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import moment from "moment";
import classnames from "classnames";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Row, Col, Avatar, Divider, Space } from "antd";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.less";

export default function MessageBlock(props) {
  const { user_id, style, className, content } = props;

  const [search_params] = useSearchParams();

  const computed_style = useMemo(() => ({ ...style, width: "100%" }), [style]);

  const is_current_user = useMemo(() => user_id === search_params.get("user_id"), [user_id, search_params]);

  const computed_class = useMemo(() => classnames({
    [css.is_current_user]: is_current_user,
    [css.messsage_block]: true,
    [className]: true,
  }), [className, is_current_user]);

  if (is_current_user) {
    return (
      <Row justify="end" align="top" style={computed_style} className={computed_class}>
        <Space size={10} style={{ padding: "10px 0px" }}>
          <Col className={css.content_block}>
            {content}
          </Col>
          <Avatar />
        </Space>
      </Row>
    )
  };

  return (
    <Row justify="start" align="top" style={computed_style} className={computed_class}>
      <Space size={10} style={{ padding: "10px 0px" }}>
        <Avatar />
        <Col className={css.content_block}>
          {content}
        </Col>
      </Space>
    </Row>
  )
};


MessageBlock.propTypes = {

};

MessageBlock.defaultProps = {

};