import { Card, Typography, Flex, Button } from "antd";
import React from "react";

const Banner = () => {
    return (
        <Card 
            className="banner-card"
            style={{ 
                minHeight: '320px', 
                width: '100%', 
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Flex vertical justify="space-between" style={{ height: '270px' }}>
                <div>
                    <Typography.Title 
                        level={1} 
                        style={{ 
                            margin: '0 0 16px 0', 
                            fontSize: '2.5rem',
                            color: '#262626',
                            fontWeight: '600'
                        }}
                    >
                        Clip of the day!
                    </Typography.Title>
                    <Typography.Text 
                        style={{ 
                            fontSize: '18px', 
                            color: '#666',
                            fontWeight: '400'
                        }}
                    >
                        Congrats to: <strong style={{ color: '#1890ff' }}>Insert username here</strong>
                    </Typography.Text>
                </div>
                
                {/* Media showcase area */}
                <div style={{ 
                    height: '160px', 
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #d9d9d9',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <Typography.Text 
                            style={{ 
                                color: '#999', 
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            📺 Media content will be displayed here
                        </Typography.Text>
                    </div>
                </div>

                <Button 
                    type="primary" 
                    size="large"
                    className="banner-button"
                    style={{
                        marginTop: '16px',
                        height: '40px',
                        alignSelf: 'flex-start',
                        background: '#1890ff',
                        borderColor: '#1890ff',
                        fontWeight: '500',
                        borderRadius: '6px'
                    }}
                >
                    🎮 Explore all gaming clips
                </Button>
            </Flex>
        </Card>
    )
}

export default Banner;