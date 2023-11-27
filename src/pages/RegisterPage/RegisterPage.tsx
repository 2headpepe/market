import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import { IRegisterRequest } from "../../api/auth/types";
import {  useAppDispatch } from "../../store";
import { registerUser } from "../../store/auth/actionCreators";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // createLink();

  function registerHandle(values: IRegisterRequest) {

    dispatch(registerUser(values)).then(() => navigate("/login"));
    // uploadPhoto();
  }
  console.log('1')
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
