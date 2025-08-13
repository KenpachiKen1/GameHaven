import React, { useState } from "react";
import { Button, message, Steps, theme, Slider, Row, Col, InputNumber } from "antd";
import GamesDisplay from '../Components/GamesDisplay'
const Questionnaire = () => {
  const [Hours, setHours] = useState(1);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [games, setGames] = useState(null);
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  message.config({
    top: 100, // distance from top of the window
    duration: 2, // seconds
    maxCount: 1, // prevent stacking multiple messages
  });
  const levels = [
    { level: "Novice", description: "Just picked up the controller yesterday", minHours: 1, maxHours: 5, color: "#A8E6CF" },
    { level: "Casual", description: "Games when Netflix is down.", minHours: 6, maxHours: 20, color: "#FFD3B6" },
    { level: "Dedicated", description: "Has more game achievements than friends", minHours: 21, maxHours: 50, color: "#FF8C94" },
    { level: "No Life Legend", description: "Go interact with nature", minHours: 51, maxHours: 168, color: "#FFD700" },
  ];

  const handleChange = (value) => setHours(value);

  const getLevelByHours = (hours) => levels.find((level) => hours >= level.minHours && hours <= level.maxHours);
  const currLevel = getLevelByHours(Hours);

  const Platforms = () => {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    
    const platforms = [
      { name: 'PC', color: '#FF6B35', emoji: '💻' },
      { name: 'Nintendo', color: '#E60012', emoji: '🎮' },
      { name: 'Xbox', color: '#107C10', emoji: '🎮' },
      { name: 'Mobile', color: '#00D4FF', emoji: '📱' },
      { name: 'Playstation', color: '#003791', emoji: '🎮' }
    ];
  
    const handlePlatformClick = (platform) => {
      // If clicking the same platform, deselect it, otherwise select the new one
      setSelectedPlatform(selectedPlatform === platform ? null : platform);
    };
  
    return (
      <>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '32px',
          color: '#333',
          fontSize: '24px'
        }}>
           Choose your main gaming platform 
        </h2>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          padding: '20px'
        }}>
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              onClick={() => handlePlatformClick(platform.name)}
              style={{
                backgroundColor: selectedPlatform === platform.name 
                  ? platform.color 
                  : '#f5f5f5',
                color: selectedPlatform === platform.name ? 'white' : '#333',
                border: selectedPlatform === platform.name 
                  ? `3px solid ${platform.color}` 
                  : '2px solid #ddd',
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '16px 24px',
                borderRadius: '12px',
                minWidth: '140px',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: selectedPlatform === platform.name 
                  ? `0 8px 20px ${platform.color}40` 
                  : '0 2px 8px rgba(0,0,0,0.1)',
                transform: selectedPlatform === platform.name ? 'translateY(-4px)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (selectedPlatform !== platform.name) {
                  e.target.style.backgroundColor = '#e8e8e8';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlatform !== platform.name) {
                  e.target.style.backgroundColor = '#f5f5f5';
                  e.target.style.transform = 'none';
                }
              }}
            >
              <span style={{ fontSize: '24px' }}>{platform.emoji}</span>
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
        
        {selectedPlatform && (
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <p style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#333',
              margin: '0'
            }}>
              Your main platform: {selectedPlatform}
            </p>
          </div>
        )}
      </>
    );
  };
  
  const slider = () => (
    <>
    <h2 style={{textAlign: 'center'}}>About how many hours a week do you game?</h2>
      <div style={{ 
        fontSize: "18px", 
        marginBottom: 24, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap" 
      }}>
        {levels.map((item, index) => (
          <span
            key={index}
            style={{
              backgroundColor: item.level === currLevel.level ? currLevel.color : "#f5f5f5",
              color: item.level === currLevel.level ? "#000" : "#666",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: item.level === currLevel.level ? "bold" : "normal",
              border: item.level === currLevel.level ? "2px solid #333" : "1px solid #ddd",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              boxShadow: item.level === currLevel.level ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            }}
          >
            {item.level}
          </span>
        ))}
      </div>

      <Row style={{ marginBottom: 32 }}>
        <Col span={15}>
          <Slider min={1} max={168} onChange={handleChange} value={Hours} />
        </Col>
        <Col span={4}>
          <InputNumber min={1} max={168} style={{ margin: "0 16px" }} value={Hours} onChange={handleChange} />
        </Col>
      </Row>

      <div style={{ 
        textAlign: "center",
        padding: "24px",
        backgroundColor: currLevel.color,
        borderRadius: "12px",
        border: "2px solid #333",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        <div style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          marginBottom: "12px",
          color: "#333"
        }}>
          🎮 {currLevel.level} Gamer 🎮
        </div>
        <div style={{ 
          fontSize: "16px", 
          fontStyle: "italic",
          color: "#444",
          lineHeight: "1.4"
        }}>
          "{currLevel.description}"
        </div>
        <div style={{
          fontSize: "14px",
          marginTop: "8px",
          color: "#555",
          fontWeight: "500"
        }}>
          {Hours} hour{Hours !== 1 ? 's' : ''} per week
        </div>
      </div>
    </>
  );

  const steps = [
    { title: "Favorite Game", content: <GamesDisplay setGames={setGames} games={games}/>},
    { title: "Main Platform", content: Platforms()},
    { title: "Gaming Hours", content: slider() },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    lineHeight: "normal",
    textAlign: "left",
    color: token.colorText,
    backgroundColor: "white",
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
    minHeight: "300px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (

    <div style={containerStyle}>
        <h3 style={{textAlign: 'center', color:'black'}}>Lets get to know you better</h3>
      <Steps current={current} items={items} style={{ marginBottom: "20px" }} />
      <div style={contentStyle}>{steps[current].content}</div>

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
        {current === steps.length - 1 &&<Button type="primary" onClick={() => {message.success("Thank you!"); }}>Complete</Button>}
        {current > 0 && <Button style={{ margin: "0 8px" }} onClick={prev}>Previous</Button>}
      </div>
    </div>
  );
};

export default Questionnaire;