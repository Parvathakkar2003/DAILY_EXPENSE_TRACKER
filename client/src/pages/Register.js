import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Prevent login user from accessing register page
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
    <div className="register-page">
      {loading && <Spinner />}
      <Form
        layout="vertical"
        onFinish={submitHandler}
        validateMessages={validateMessages}
        style={{ paddingTop: "170px" }}
      >
        <h1>User Registration</h1>
        {/* Name field */}
        <div className="custom-label">Name</div>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* Email field */}
        <div className="custom-label">Email</div>
        <Form.Item
          name="email"
          rules={[{ type: "email", required: true }]}
        >
          <Input type="email" />
        </Form.Item>
        {/* Password field */}
        <div className="custom-label">Password</div>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
        >
          <Input type="password" />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <button type="submit" className="btn btn-secondary register-btn">
            Register
          </button>
        </Form.Item>
        {/* Link to Login page */}
        <div className="mt-3 text-center">
          <Link to="/login" className="btn btn-secondary register-btn">
            Existing User? Please click here to Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
