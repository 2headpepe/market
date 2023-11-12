import React, { useEffect } from "react";

import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import { loginUser } from "../../store/auth/actionCreators";
import { IRootState, useAppDispatch } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const role= useSelector((state:IRootState)=>state.auth.authData.role)
  // useSelector(console.log );

  function loginHandle(values: { email: string; password: string }) {
    // console.log(values);
    dispatch(loginUser(values));
  }

  useEffect(()=>{
    if(role==='ADMIN'){
      navigate('/admin');
    }
    if(role==='USER'){
      navigate('/')
    }
  },[role]);
  return (
    <div className={styles.LoginPage}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <Form
          layout="vertical"
          onFinish={loginHandle}
        >
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
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <nav className={styles.formNav}>
          <span>Don't have an account?</span>
          <Link
            to="/register"
            className={styles.signupLink}
          >
            Sign up
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default LoginPage;
