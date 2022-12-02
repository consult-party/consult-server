/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import io from "socket.io-client";
import { Button, Input, message } from "antd";
import { useSearchParams } from "react-router-dom";
import React, { useRef, useState, useEffect, useCallback } from "react";


// import propTypes from "prop-types";
// import classnames from "classnames";

import StickyBlock from "./elements/StickyBlock";
import MessageBlock from "./elements/MessageBlock";
import ScrollContainer from "./elements/ScrollContainer";

// import css from "./style.scss";
// import css from "./style.less";

export default function RsaCryptoPage(props) {

  const socket = useRef();

  const input_ref = useRef();

  const [search_params] = useSearchParams();

  const [message_list, set_message_list] = useState([]);

  const [input_message, set_input_message] = useState("");

  useEffect(() => {
    const room_id = search_params.get("room_id");
    const user_id = search_params.get("user_id");
    socket.current = io(`ws://${window.location.hostname}:13500?room_id=${room_id}&user_id=${user_id}`);
  }, [search_params]);

  useEffect(() => {

    socket.current.on("connect", () => {
      console.log("已连接");
      document.title = "专线聊天";
    });

    socket.current.on("user_login", () => {
      message.success({ key: "user_info", content: "对方已上线", duration: 3 });
    });

    socket.current.on("user_leave", () => {
      message.warning({ key: "user_info", content: "对方已离线", duration: 0 });
    });

    socket.current.on("load_record", (records) => {
      set_message_list(records);
    });

    socket.current.on("input_blur", () => {
      document.title = "专线聊天";
    });

    socket.current.on("input_focus", () => {
      document.title = `对方正在输入...`;
    });

    socket.current.on("message", (content) => {
      const json_content = JSON.parse(content);
      set_message_list((message_list) => {
        const clone_message_list = [...message_list];
        return [...clone_message_list, json_content];
      });
    });

  }, [search_params]);

  const handleScrollHeight = useCallback(() => {
    document.body.scrollTop = document.body.scrollHeight;
    requestAnimationFrame(handleScrollHeight);
  }, []);

  const handleBlur = useCallback(() => {
    const user_id = search_params.get("user_id");
    socket.current.emit("input_blur", JSON.stringify({ user_id }));
  }, [search_params]);

  const handleFocus = useCallback(() => {
    const user_id = search_params.get("user_id");
    socket.current.emit("input_focus", JSON.stringify({ user_id }));
    requestAnimationFrame(handleScrollHeight);
  }, [search_params, handleScrollHeight]);

  const handlePublish = useCallback(async () => {
    if (!input_message) {
      message.warning({ key: "handlePublish", content: "不能发送空的消息!", duration: 2 });
      input_ref.current.blur();
    } else {
      const user_id = search_params.get("user_id");
      socket.current.emit("emit_message", JSON.stringify({ content: input_message, user_id }));
      set_input_message("");
      input_ref.current.blur();
    };
  }, [input_message, search_params]);

  return (
    <ScrollContainer message_list={message_list}>
      {message_list.map(({ content, user_id }, index) => (
        <MessageBlock key={index} content={content} user_id={user_id} />
      ))}
      <StickyBlock>
        <Input.Group compact>
          <Input.TextArea
            ref={input_ref}
            value={input_message}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ width: "80%" }}
            placeholder="请输入聊天信息"
            autoSize={{ minRows: 1, maxRows: 4 }}
            onChange={(event) => set_input_message(event.target.value)}
            onPressEnter={handlePublish}
          />
          <Button block type="primary" style={{ width: "20%", height: "100%" }} onClick={handlePublish}>
            发送
          </Button>
        </Input.Group>
      </StickyBlock>
    </ScrollContainer>
  )
};


RsaCryptoPage.propTypes = {

};

RsaCryptoPage.defaultProps = {

};