import React, { useState } from 'react';
import { Flex, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


const Dashboard = () => {
    const [collapsed, isCollapsed] = useState(false)
    return(
        <Layout>
            <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'></Sider>
                <Layout>
                <Header></Header>
                </Layout>
        </Layout>
    );
};
