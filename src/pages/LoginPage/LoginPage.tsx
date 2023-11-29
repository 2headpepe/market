import React, { useEffect } from "react";

import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import { loginUser } from "../../store/auth/actionCreators";
import { IRootState, useAppDispatch } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const authData = useSelector((state: IRootState) => state.auth.authData);

  function loginHandle(values: { email: string; password: string }) {
    dispatch(loginUser(values));
  }

  useEffect(() => {
    if (authData.role) {
      message.success(
        { type: "success", content: "Successfully logged in" },
        1,
        () => {
          if (authData.role === "ADMIN") {
            navigate("/admin");
          }
          if (authData.role === "USER") {
            navigate("/");
          }
        }
      );
    }
    else if(authData.error){
      message.error({type:'error',content:'Failed to login. Incorrect data.'},2)
    }
  }, [authData.role,authData.error]);
  return (
    <div className={styles.LoginPage}>
      {contextHolder}
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <Form layout="vertical" onFinish={loginHandle}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <nav className={styles.formNav}>
          <span>Don't have an account?</span>
          <Link to="/register" className={styles.signupLink}>
            Sign up
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default LoginPage;
