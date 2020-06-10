import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, TreeSelect, Card, Row, Col, List, Divider } from 'antd';
import Container from '@material-ui/core/Container';
import First from './First';
import setNewState from './../../utils/setNewState';
import Third from './Third';
import Fourth from './Fourth';

let Homepage = ({ dispatch, home, model }: any) => {
  //dispatch

  let col = { xs: 24, sm: 24, md: 6, lg: 6, xl: 5, xxl: 4 },
    cols = { xs: 24, sm: 24, md: 18, lg: 18, xl: 19, xxl: 20 };

  useEffect(() => {
    setNewState(dispatch, 'home/IndexSecond', {}, () => {});
  }, []);

  return (
    <Container maxWidth="xl">
      <Row gutter={12}>
        <Col {...cols}>
          <First></First>
        </Col>
        <Col {...col}>
          <Card title={moment().format('YYYY-MM-DD') + ' 剩余工作统计'}>
            <div
              style={{
                height: 300,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p>我的任务</p>
                <h2 style={{ fontSize: 20, color: '#91c7ae' }}>
                  {home.IndexSecond.data.data.taskNum}
                </h2>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>我的bug</p>
                <h2 style={{ fontSize: 20, color: '#c23531' }}>
                  {home.IndexSecond.data.data.bugNum}
                </h2>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>进行中的项目</p>
                <h2 style={{ fontSize: 20, color: '#63869e' }}>
                  {home.IndexSecond.data.data.projectNum}
                </h2>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={12} style={{ marginTop: 12, paddingBottom: 24 }}>
        <Col span={24}>
          <Third></Third>
        </Col>
        {/* <Col span={0}>
          <Fourth></Fourth>
        </Col> */}
      </Row>
    </Container>
  );
};

export default connect(({ home, model, loading }: any) => ({
  home,
  model,
  loading: loading.effects['home/User'],
}))(Homepage);
