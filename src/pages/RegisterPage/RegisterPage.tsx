import React from "react";

import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import { ILoginRequest, IRegisterRequest } from "../../api/auth/types";
import { IRootState, useAppDispatch } from "../../store";
import { loginUser, registerUser } from "../../store/auth/actionCreators";
import { useSelector } from "react-redux";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useSelector((state:IRootState)=>state.auth.authData.accessToken);

  function registerHandle(values: IRegisterRequest) {

    dispatch(registerUser(values)).then(() => navigate("/"));
  }
  return (
    <div className={styles.RegisterPage}>
      <div className={styles.formWrapper}>
        <Form layout="vertical" onFinish={registerHandle}>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: "Please input your first name" }]}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: "Please input your last name" }]}

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <nav className={styles.formNav}>
          <span>Already have an account?</span>
          <Link
            to="/login"
            className={styles.signinLink}
          >
            Sign in
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default RegisterPage;
