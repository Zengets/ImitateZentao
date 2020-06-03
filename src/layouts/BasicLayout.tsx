import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, Link, history } from 'umi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import useStyles from '@/utils/makestyle';
import { Row, Col, message, Menu, ConfigProvider } from 'antd';
import Header from './Header';
import { UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dia from '@/components/Dia';
import setNewState from '@/utils/setNewState';
import {
  FormControl,
  InputLabel,
  FilledInput,
  IconButton,
  OutlinedInput,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import zhCN from 'antd/es/locale/zh_CN';

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
    error: {
      main: '#f44336',
    },
  },
});

let BasicLayout = (props: any) => {
  let { children, dispatch } = props,
    [show, cshow] = useState(false),
    [values, setvalues] = useState({
      showPassword: false,
      showPasswords: false,
    });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    setNewState(
      props.dispatch,
      'model/changePassword',
      {
        password: data.password,
        newPassword: data.newpassword,
      },
      () => {
        setNewState(props.dispatch, 'model/Logout', null, () => {
          message.success('密码修改成功，请重新登录');
          history.replace('/');
        });
      },
    );
  };

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
      <Menu.Item
        style={{ padding: '12px' }}
        onClick={() => {
          setNewState(props.dispatch, 'model/Logout', null, () => {
            history.replace('/');
          });
        }}
      >
        <LogoutOutlined style={{ fontSize: 16 }} />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  const handleClickShowPassword = (key: string) => {
    setvalues({ ...values, [key]: !values[key] });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    setNewState(dispatch, 'model/UserqueryAll', {}, () => {}); //全局下拉框
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dia
        maxWidth="xs"
        title="修改密码"
        show={show}
        cshow={(key: any) => {
          cshow(key);
        }}
        onOk={handleSubmit(onSubmit)}
      >
        <form
          className={useStyles().root}
          onSubmit={handleSubmit(onSubmit)}
          id="resetpwd"
          name="resetpwd"
        >
          <FormControl
            variant="outlined"
            style={{ width: '100%', marginBottom: 18 }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              旧密码
            </InputLabel>
            <OutlinedInput
              name="password"
              fullWidth
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              inputRef={register({ required: true })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('showPassword')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <span style={{ fontSize: 12, color: '#f50', paddingLeft: 14 }}>
              {errors.password ? (
                '请输入密码'
              ) : (
                <span style={{ opacity: 0 }}>11</span>
              )}
            </span>
          </FormControl>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel htmlFor="outlined-adornment-password">
              新密码
            </InputLabel>
            <OutlinedInput
              name="newpassword"
              fullWidth
              id="outlined-adornment-password"
              type={values.showPasswords ? 'text' : 'password'}
              error={Boolean(errors.newpassword)}
              inputRef={register({ required: true })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('showPasswords')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPasswords ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <span style={{ fontSize: 12, color: '#f50', paddingLeft: 14 }}>
              {errors.newpassword ? (
                '请输入新密码'
              ) : (
                <span style={{ opacity: 0 }}>11</span>
              )}
            </span>
          </FormControl>

          <Button style={{ display: 'none' }} type="submit">
            hidden
          </Button>
        </form>
      </Dia>
      <Header
        menu={menu}
        routes={props.route.routes}
        location={props.history.location}
      ></Header>
      <div style={{ height: 106 }}></div>

      <div
        style={{
          backgroundColor: '#f0f0f0',
          paddingTop: 20,
          minHeight: 'calc(100vh - 108px)',
        }}
      >
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </div>
    </ThemeProvider>
  );
};

export default connect(({ model, loading }: any) => ({
  model,
  loading: loading.effects['model/User'],
}))(BasicLayout);
