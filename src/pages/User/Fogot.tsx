import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, Link, history } from 'umi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import useStyles from '@/utils/makestyle';
import { Row, Col, message, Upload } from 'antd';
import setNewState from '@/utils/setNewState';
import {
  FormControl,
  InputLabel,
  FilledInput,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ImageIcon from '@material-ui/icons/Image';

let Fogot = (props: any) => {
  let { dispatch, user } = props;
  //useForm hooks
  const { register, handleSubmit, errors, getValues } = useForm();

  //倒计时
  let [num, cnum] = useState(60);
  let t: NodeJS.Timeout | null = null;

  //submit
  const onSubmit = (data: any) => {
    let { id } = user.res.data.data ? user.res.data.data : { id: '' };
    setNewState(
      dispatch,
      'user/reparePassword',
      {
        code: data.qrcode,
        newPassword: data.password,
        id,
      },
      () => {
        history.replace('/');
        message.success('密码修改成功');
      },
    );
  };
  let [values, setvalues] = useState({
    showPassword: false,
    showPasswords: false,
  });
  const handleClickShowPassword = (key: string) => {
    setvalues({ ...values, [key]: !values[key] });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    setNewState(dispatch, 'user/queryBackgroungImg', {}, () => {});
  }, []);
  return (
    <div
      className={styles.loginbg}
      style={{
        backgroundImage: `url(${
          user.queryBackgroungImg
            ? user.queryBackgroungImg
            : require('@/assets/images/bg.jpg')
        })`,
      }}
    >
      <div style={{ position: 'absolute', right: 48, top: 48, zIndex: 99998 }}>
        <Upload
          showUploadList={false}
          action="/zentao/common/uploadFile"
          onChange={(info: {
            file: { name?: any; status?: any; response?: any };
            fileList: any;
          }) => {
            const { status, response } = info.file;
            if (status == 'done') {
              let dicName = response.data.dataList[0].url;
              setNewState(
                dispatch,
                'user/uploadBackgroungImg',
                { dicName },
                () => {
                  setNewState(
                    dispatch,
                    'user/queryBackgroungImg',
                    {},
                    () => {},
                  );
                },
              );
            } else if (status == 'error') {
              message.error(`${info.file.name} 上传失败`);
            }
          }}
        >
          <IconButton>
            <ImageIcon
              style={{ color: '#fff', boxShadow: '0px 0px 2px #000' }}
            ></ImageIcon>
          </IconButton>
        </Upload>
      </div>
      <div className={styles.loginbox}>
        <Container maxWidth="xs">
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: 36,
              borderRadius: 6,
            }}
          >
            <h1 style={{ textAlign: 'left', marginBottom: 36, color: '#000' }}>
              找回密码
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                style={{ marginBottom: 18, color: '#fff' }}
                className={useStyles().root}
                type="search"
                fullWidth
                name="username"
                inputRef={register({ required: true })}
                id="outlined-basic"
                label="用户名"
                variant="outlined"
                error={Boolean(errors.username)}
                helperText={
                  errors.username ? (
                    '请输入用户名'
                  ) : (
                    <span style={{ opacity: 0 }}>11</span>
                  )
                }
              />
              <Row gutter={12}>
                <Col span={16}>
                  <TextField
                    style={{ marginBottom: 18, color: '#fff' }}
                    className={useStyles().root}
                    type="text"
                    fullWidth
                    name="qrcode"
                    inputRef={register({ required: true })}
                    id="outlined-basic"
                    label="验证码"
                    variant="outlined"
                    error={Boolean(errors.qrcode)}
                    helperText={
                      errors.qrcode ? (
                        '请输入验证码'
                      ) : (
                        <span style={{ opacity: 0 }}>11</span>
                      )
                    }
                  />
                </Col>
                <Col span={8}>
                  <Button
                    disabled={num < 60}
                    style={{ height: 56, color: '#fff' }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      setNewState(
                        dispatch,
                        'user/sendVerificationCode',
                        { accountName: getValues('username') },
                        () => {
                          t = setInterval(() => {
                            if (num == 0) {
                              cnum(60);
                              clearInterval(t);
                            } else {
                              cnum(num--);
                            }
                          }, 1000);
                        },
                      );
                    }}
                  >
                    {num < 60 ? num + 's' : '获 取'}
                  </Button>
                </Col>
              </Row>

              <FormControl
                className={useStyles().root}
                variant="outlined"
                style={{ width: '100%' }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  密码
                </InputLabel>
                <OutlinedInput
                  name="password"
                  fullWidth
                  style={{ marginBottom: 24 }}
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
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                找回密码
              </Button>
            </form>
            <Link
              to="/"
              style={{
                color: '#3f51b5',
                marginTop: 12,
                textAlign: 'right',
                display: 'inline-block',
                width: '100%',
              }}
            >
              立即登录
            </Link>
          </div>
        </Container>
      </div>

      <div className={styles.footer}>
        <p style={{ color: '#fff' }}>南高项目管理平台</p>
      </div>
    </div>
  );
};

export default connect(({ user, loading }: any) => ({
  user,
  loading: loading.effects['model/User'],
}))(Fogot);
