import 
{  UserOutlined, 
    ProfileOutlined, 
    SettingOutlined, 
    SmileOutlined, 
    CommentOutlined, 
    LogoutOutlined
} from "@ant-design/icons";


import { Flex, Menu, Button } from "antd";
import React from "react";
import { IoGameController} from "react-icons/io5";
import '../Components/Sidebar.css'


const Sidebar = () => {
    return(
        <>
        <Flex align="center" justify="center">
            <div className="logo">
            <IoGameController size={40} color="black" />
            </div>
        </Flex>

        <Menu mode='inline' defaultSelectedKeys={['1']} className="menu-bar"
            items={[{
                key: '1',
                icon: <UserOutlined/>,
                label: 'Dashboard',
            },
            {
                key: '2',
                icon: <ProfileOutlined/>,
                label: 'Your Profile',
            },
            {
                key: '3',
                icon: <SmileOutlined/>,
                label: 'Friends',
            },
            {
                key: '4',
                icon: <CommentOutlined/>,
                label: 'Messages',
            },
            {
                key: '5',
                icon: <SettingOutlined/>,
                label: 'Settings',
            },
            {
                key: '6',
                icon: <LogoutOutlined/>,
                label: 'Logout',
            },
        
        ]}

        
        />
        
        </>
    );
};


export default Sidebar;