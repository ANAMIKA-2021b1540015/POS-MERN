import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    dispatch({ type: "showLoading" });
    await axios
      .post("/api/users/login", value)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("Login Successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
        message.error("Login Failed");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register d-flex ">
      <h3>Login Here</h3>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <p>
            Already Registered
            <Link to="/register"> Register Here!</Link>
          </p>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
