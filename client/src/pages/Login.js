import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Login.css"; // Import CSS file

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("users/login", values);
      setLoading(false);
      message.success("Login Success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Prevent login user from accessing login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  // Form validation rules
  const validateMessages = {
    required: "This field is required",
    types: {
      email: "Please enter a valid email",
    },
  };

  return (
    <div className="register-page" style={{ paddingTop: "100px" }}>
      {loading && <Spinner />}
      <Form
        layout="vertical"
        onFinish={submitHandler}
        validateMessages={validateMessages}
      >
        <h1 >Expense Manager</h1>
        {/* Email field */}
        <div className="custom-label" >Email</div>
        <Form.Item name="email" rules={[{ type: "email", required: true }]}>
          <Input type="email" />
        </Form.Item>
        {/* Password field */}
        <div className="custom-label">Password</div>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        {/* Submit button */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-secondary login-btn">
            Login
          </button>
        </div>
        {/* Link to Register page */}
        <div className="mt-3 text-center">
          <Link to="/register" className="btn btn-secondary login-btn">
            New User? Please click here to Register
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
