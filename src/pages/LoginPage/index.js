/* eslint-disable react/prop-types */
// import axios from "axios";
import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function LoginPage() {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    const { room_id, user_id } = await form.validateFields();
    navigate(`/chat?room_id=${room_id}&user_id=${user_id}`);
  }, [form, navigate]);

  return (
    <Form layout="horizontal" form={form} style={{ padding: 20 }}>
      <Form.Item name="room_id" label="房间ID" rules={[{ required: true }]}>
        <Input placeholder="请输入房间ID" />
      </Form.Item>
      <Form.Item name="user_id" label="用户ID" rules={[{ required: true }]}>
        <Input placeholder="请输入用户ID" />
      </Form.Item>
      <Button block type="primary" onClick={handleSubmit}>进入聊天室</Button>
    </Form>
  )
};


LoginPage.propTypes = {


};
LoginPage.defaultProps = {


};