import { Menu } from "antd";
import {
  BarsOutlined,
  FileProtectOutlined,
  HomeOutlined,
  SettingOutlined,
  UndoOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import React from "react";

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
    >
      <Menu.Item key="waited" icon={<HomeOutlined />}>
        WaitedUsers
      </Menu.Item>
      <Menu.Item key="approved" icon={<UserSwitchOutlined />}>
        Approved Users
      </Menu.Item>
      <Menu.Item key="rejected" icon={<UndoOutlined />}>
        Rejected Users
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.SubMenu key="subsettings" icon={<BarsOutlined />} title="Tasks">
        <Menu.Item key="task-1">Task 1</Menu.Item>
        <Menu.Item key="task-2">Task 2</Menu.Item>
        <Menu.SubMenu key="subTasks" title="subtasks">
          <Menu.Item key="subtask-1">subtask 1</Menu.Item>
          <Menu.Item key="subtask-2">subtask 2</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="formateur" icon={<FileProtectOutlined />}>
        Formateur
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
