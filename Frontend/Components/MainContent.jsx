import { Flex, Card, Typography } from "antd";
import React from "react";
import Banner from "./Banner";

const MainContent = () => {
    return (
        <Flex vertical gap="24px">
            {/* Top Banner spanning the full width */}
            <Banner/>
            
            {/* Row of three evenly spaced cards below the banner */}
            <Flex gap="24px" justify="space-between">
                <Card title="Statistic Card 1" style={{ flex: 1 }}>
                    <Typography.Title level={4}>2,435</Typography.Title>
                    <Typography.Text type="secondary">Total Views</Typography.Text>
                </Card>

                <Card title="Statistic Card 2" style={{ flex: 1 }}>
                    <Typography.Title level={4}>1,821</Typography.Title>
                    <Typography.Text type="secondary">Total Likes</Typography.Text>
                </Card>

                <Card title="Statistic Card 3" style={{ flex: 1 }}>
                    <Typography.Title level={4}>312</Typography.Title>
                    <Typography.Text type="secondary">New Followers</Typography.Text>
                </Card>
            </Flex>
        </Flex>
    )
};

export default MainContent;