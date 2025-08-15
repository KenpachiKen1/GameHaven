import React, { useState } from 'react';
import { Layout , Button} from 'antd';
import '../Components/Dashboard.css'
import Sidebar from './Sidebar';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import CustomHeader from './Header';
import MainContent from './MainContent';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapsed, isCollapsed] = useState(false)

    return(
        <Layout>
            <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
                <Sidebar/>
                <Button type='text' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } onClick={() => isCollapsed(!collapsed)}
                className="trigger-btn"
                />
            </Sider>
            <Layout>
                <Header className='header'>
                    <CustomHeader/>
                </Header>
                <Content className='content'>
                   <MainContent/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;