import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/register", value)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success(
          "Registration successfull , please wait for verification"
        );
        navigate("/login");
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register d-flex ">
      <h3>New User</h3>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <p>
            Already Registered
            <Link to="/login"> Login Here!</Link>
          </p>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
