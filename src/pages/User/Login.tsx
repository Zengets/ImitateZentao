import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, Link, history } from 'umi';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import useStyles from '@/utils/makestyle';

let Login = ({ model, dispatch }: any) => {
  //useForm hooks
  const { register, handleSubmit, errors } = useForm();
  //submit
  const onSubmit = (data: any) => {
    console.log(data);
    history.replace('/index');
  };

  //dispach数据
  function setNewState(type: any, values: any, fn: any) {
    dispatch({
      type: 'model/' + type,
      payload: values,
    }).then((res: any) => {
      if (res) {
        fn ? fn() : null;
      }
    });
  }

  useEffect(() => {
    setNewState('User', null, () => {});
  }, []);

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
            <h1
              style={{ textAlign: 'center', marginBottom: 36, color: '#000' }}
            >
              南高项目管理平台
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
                立即登录
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
              忘记密码？
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

export default connect(({ model, loading }: any) => ({
  model,
  loading: loading.effects['model/User'],
}))(Login);
