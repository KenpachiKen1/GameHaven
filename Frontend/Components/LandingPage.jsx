import React, { useState , useEffect, useRef } from "react";
import "./LandingPage.css"; // 👈 make sure you create this
import { Carousel, Tabs } from "antd";
import { motion } from "framer-motion";
import { Button, Form, Input, Typography } from "antd";
import video1 from "../src/assets/video1.mp4";
import video2 from "../src/assets/video2.mp4";
import video3 from "../src/assets/video3.mp4";
import video4 from "../src/assets/video4.mp4";

import screenshot from "../src/assets/screenshot.jpeg";
import PixelHand from "../src/assets/PixelHand.png";
import PixelHandTouching from "../src/assets/PixelHandTouching.png";
import Title from "antd/es/typography/Title";
const { Text } = Typography;

const LandingPage = () => {
  const [tabKey, setTabKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);
  const frames = [PixelHand, PixelHandTouching];
  const carouselRef = useRef(null);
  const [frame, setFrame] = useState(0);

  const goToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % frames.length);
    }, 300); // change every 150ms
    return () => clearInterval(interval);
  }, []); //how I am changing the frame every 150ms
  const signup = () => (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: "25%" }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={createProfile}
      layout="vertical"
    >
      {/* form fields */}
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "You need to enter a First Name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "You need to enter a Last Name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "You need to enter an email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Username"
        name="userName"
        rules={[{ required: true, message: "You need to enter a username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "You need to enter a password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
      <Button type="primary" htmlType="submit" className="auth-button">
          Create Profile
    </Button>
      </Form.Item>
    </Form>
  );

  const login = () => (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: "25%" }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={createProfile}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[{ required: true, message: "You need to enter a username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "You need to enter a password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Clickable text only, no button */}
      <Text
        onClick={() => setTabKey("2")}
        style={{ color: "blue", cursor: "pointer", display: "inline-block", marginBottom: 16 }}
      >
        Don't have an account? Make one now!
      </Text>

      <Form.Item>
      <Button type="primary" htmlType="submit" className="auth-button">
          Login
    </Button>
      </Form.Item>
    </Form>
  );

  const createProfile = async (values) => {
    try {
      setError(false);
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/users/create_user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        setError(true);
        throw new Error("failed to create account");
      }
      const result = await response.json();
      setProfile(result);
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 2 }}
        style={{ textAlign: "center", marginTop: 40 }}
      >
        🎮 Welcome to Game Haven!
      </motion.h1>

      <div 
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000
      }}
    >
        <img src={frames[frame]} alt="Pixel Animation" style={{imageRendering: "pixelated", width: "100%", height:"175px"}}></img>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          maxWidth: 1200,
          margin: "40px auto",
          padding: "0 20px",
          gap: 60, // More space between left and right divs
        }}
      >
        {/* Left side container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40, // gap between carousel and social media
            flex: "1 1 65%",
            maxWidth: 750,
          }}
        >
          {/* Carousel container */}
          <div
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={3} style={{ textAlign: "center" }}>
              Connect with your friends and share your gaming journey!
            </Title>
            <Carousel arrows ref={carouselRef}>
              <div>
                <video src={video1} controls style={{ width: "100%", height: "100%" }}  onEnded={goToNext}/>
              </div>
              <div>
                <video src={video2} controls style={{ width: "100%", height: "100%" }} onEnded={goToNext}/>
              </div>
              <div>
                <video src={video3} controls style={{ width: "100%", height: "100%" }} onEnded={goToNext}/>
              </div>
              <div>
                <video src={video4} controls style={{ width: "100%", height: "100%" }} onEnded={goToNext}/>
              </div>
              <div>
                <img src={screenshot} alt="Star Lord ranking" style={{ width: "100%", height: "100%" }}  />
              </div>
            </Carousel>
            <Text style={{ display: "block", textAlign: "center", marginTop: 16, fontWeight: 'bold', fontSize: '25px'}}> Connect with friends, share clips, build communities</Text>
          </div>

          {/* Social Media Div */}
          <div
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              minHeight: 120,
              width: "100%",
            }}
          >
            <Title level={3} style={{ textAlign: "center" }}>
              Follow me on social media
            </Title>
            <Text style={{ display: "block", textAlign: "center", marginTop: 16 }}>
              Stay updated with the latest news and features.
            </Text>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Button type="primary" href="https://www.linkedin.com/in/kentimi" target="_blank">
                My LinkedIn!
              </Button>
              <Button type="primary" href="https://instagram.com/13kken" target="_blank" style={{ marginLeft: 8 }}>
                My Instagram!
              </Button>
            </div>
          </div>
        </div>

        {/* Right side container */}
        <div
          style={{
            backgroundColor: "white",
            padding: 32,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: 400,
            flex: "0 0 400px",
            alignSelf: "flex-start",
          }}
        >
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Get Connected Today!
          </Title>
          <Tabs
            activeKey={tabKey}
            onChange={setTabKey}
            centered
            items={[
              { label: "Login", key: "1", children: login() },
              { label: "Sign Up", key: "2", children: signup() },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
