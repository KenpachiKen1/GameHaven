import { Avatar, Typography, Flex } from "antd";
import React from "react";
import Search from "antd/es/input/Search";
import { MessageOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";

const CustomHeader = () => {
    return (
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <Typography.Title level={3} type="secondary" style={{color: 'white'}}>
                Welcome User
            </Typography.Title>
            
            <Flex align="center" gap="3rem">
                <Search placeholder="Search for games/user" allowClear />
                <Flex align="center" gap="10px">
                    <NotificationOutlined className="header-icon" />
                    <MessageOutlined className="header-icon" />
                    <Avatar icon={<UserOutlined />} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CustomHeader;
