import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
const { Header, Content, Sider } = Layout;
const items1 = ["list of transaction"].map((key) => ({
  key,
  label: `${key}`,
}));
export const PageHeader = () => (
  <Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      items={items1}
    />
  </Header>
);
