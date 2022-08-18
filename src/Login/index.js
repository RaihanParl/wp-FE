import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { URL } from "../config";
import { useRequest } from "../context/useRequest";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const onFinish = async (values) => {
    await doLogin(values);
  };
  const { post } = useRequest();
  const navigate = useNavigate();
  const doLogin = async (values) => {
    const data = `${values.username}:${values.password}`;
    try {
      const { json } = await post(
        `${URL}/login`,
        {},
        { Authorization: `Basic ${window.btoa(data)}` }
      );
      localStorage.setItem("token", json.data.token);
      navigate("/");
    } catch {
      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
        height: "100%",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
