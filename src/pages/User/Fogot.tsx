import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, Link, history } from 'umi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import useStyles from '@/utils/makestyle';
import { Row, Col, message } from 'antd';

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
      'reparePassword',
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
  //dispach数据
  function setNewState(type: any, values: any, fn: any) {
    dispatch({
      type: 'user/' + type,
      payload: values,
    }).then((res: any) => {
      if (res) {
        fn ? fn() : null;
      }
    });
  }

  return (
    <div
      className={styles.loginbg}
      style={{ backgroundImage: `url(${require('@/assets/images/bg.jpg')})` }}
    >
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
                        'sendVerificationCode',
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

              <TextField
                style={{ marginBottom: 18, color: '#fff' }}
                className={useStyles().root}
                type="password"
                fullWidth
                name="password"
                inputRef={register({ required: true })}
                id="outlined-basic"
                label="密码"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={
                  errors.password ? (
                    '请输入密码'
                  ) : (
                    <span style={{ opacity: 0 }}>11</span>
                  )
                }
              />

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
        <p style={{ color: '#fff' }}>南高项目管理平台/禅道阉割版</p>
      </div>
    </div>
  );
};

export default connect(({ user, loading }: any) => ({
  user,
  loading: loading.effects['model/User'],
}))(Fogot);
