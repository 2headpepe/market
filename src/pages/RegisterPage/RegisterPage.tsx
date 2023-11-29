import { Button, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import { IRegisterRequest } from "../../api/auth/types";
import { IRootState, useAppDispatch } from "../../store";
import { logoutUser, registerUser } from "../../store/auth/actionCreators";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {message } from 'antd';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // createLink();

  function registerHandle(values: IRegisterRequest) {
    dispatch(registerUser(values));
    // uploadPhoto();
  }
  const [messageApi, contextHolder] = message.useMessage();
  const authData = useSelector((state: IRootState) => state.auth.authData);
  useEffect(() => {
    if(authData.isLoading) return;
    if(authData.accessToken) {
      messageApi.success({type:'success',content:"Successfully registered"},1,()=>{
      navigate("/login");
      dispatch(logoutUser());
      })
    }
    if(authData.regError) messageApi.error({type:'error',content:"Failed to register. Unsuitable data. "},2)
  }, [authData]);
  return (
    <div className={styles.RegisterPage}>
      {contextHolder}
      <div className={styles.formWrapper}>
        <Form layout="vertical" onFinish={registerHandle}>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}
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
            label="Phone number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number" },
            ]}
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
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <nav className={styles.formNav}>
          <span>Already have an account?</span>
          <Link to="/login" className={styles.signinLink}>
            Sign in
          </Link>
        </nav>
      </div>
      <Modal></Modal>
    </div>
  );
}

export default RegisterPage;
