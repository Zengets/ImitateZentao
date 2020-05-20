import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, Link, history } from 'umi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import useStyles from '@/utils/makestyle';
import { Row, Col, message, Menu } from 'antd';
import Header from './Header';
import { UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dia from '@/components/Dia';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1183fb',
    },
    secondary: {
      light: '#0066ff',
      main: '#fff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});

let BasicLayout = (props: any) => {
  let { children } = props,
    [show, cshow] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item style={{ padding: '12px' }}>
        <UserOutlined style={{ fontSize: 16 }} />
        <span>个人档案</span>
      </Menu.Item>
      <Menu.Item
        style={{ padding: '12px' }}
        onClick={() => {
          cshow(true);
        }}
      >
        <LockOutlined style={{ fontSize: 16 }} />
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Item style={{ padding: '12px' }}>
        <LogoutOutlined style={{ fontSize: 16 }} />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  console.log(show);
  return (
    <ThemeProvider theme={theme}>
      <Dia
        show={show}
        cshow={(key: any) => {
          cshow(key);
        }}
      ></Dia>
      <Header menu={menu}></Header>
      <div style={{ height: 64 }}></div>
      {children}
    </ThemeProvider>
  );
};

export default connect(({ model, loading }: any) => ({
  model,
  loading: loading.effects['model/User'],
}))(BasicLayout);
