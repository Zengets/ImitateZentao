import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, Tag, Card, Row, Col, Spin, Divider } from 'antd';
import Container from '@material-ui/core/Container';
import First from './First';
import setNewState from './../../utils/setNewState';
import Third from './Third';
import Fourth from './Fourth';

let Homepage = ({ dispatch, home, model, loading }: any) => {
  //dispatch

  let col = { xs: 24, sm: 24, md: 6, lg: 6, xl: 5, xxl: 4 },
    colc = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 },
    cols = { xs: 24, sm: 24, md: 18, lg: 18, xl: 19, xxl: 20 };

  useEffect(() => {
    setNewState(
      dispatch,
      'home/IndexSecond',
      {
        id: model.postdata.projectId,
      },
      () => {},
    );
  }, [model.postdata.projectId]);

  return (
    <Container maxWidth="xl">
      <Spin spinning={loading.effects['home/IndexSecond']}>
        <Row gutter={12}>
          <Col {...cols}>
            <First></First>
          </Col>
          <Col {...col}>
            <Card title={moment().format('YYYY-MM-DD') + ' 个人中心'}>
              <div
                style={{
                  height: 300,
                }}
              >
                <Row>
                  <Col
                    {...colc}
                    onClick={() => {
                      history.push({
                        pathname: '/index/mission',
                        query: {
                          ifJump: '4',
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <p>延期任务数</p>
                      <h2 style={{ fontSize: 20, color: '#91c7ae' }}>
                        {home.IndexSecond.data.data.delayTaskCount}
                      </h2>
                    </div>
                  </Col>

                  <Col
                    {...colc}
                    onClick={() => {
                      history.push({
                        pathname: '/index/mission',
                        query: {
                          ifJump: '3',
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <p>今日必完成</p>
                      <h2 style={{ fontSize: 20, color: '#c23531' }}>
                        {home.IndexSecond.data.data.todayTaskCount}
                      </h2>
                    </div>
                  </Col>

                  <Col
                    {...colc}
                    onClick={() => {
                      history.push({
                        pathname: '/index/mission',
                        query: {
                          ifJump: '2',
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <p>待办任务数</p>
                      <h2 style={{ fontSize: 20, color: '#63869e' }}>
                        {home.IndexSecond.data.data.toDoTaskCount}
                      </h2>
                      {home.IndexSecond.data.data.lateTaskCount &&
                        home.IndexSecond.data.data.lateTaskCount > 0 && (
                          <Tag color="#f50" style={{ margin: 0 }}>
                            进度滞后 {home.IndexSecond.data.data.lateTaskCount}
                          </Tag>
                        )}
                    </div>
                  </Col>
                  <Col span={24}>
                    <Divider style={{ margin: '12px 0px 24px 0px' }}></Divider>
                  </Col>
                  <Col
                    {...colc}
                    onClick={() => {
                      history.push({
                        pathname: '/index/test/bugs',
                        query: {
                          ifJump: '2',
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <p>待办bug</p>
                      <h2 style={{ fontSize: 20, color: '#c23531' }}>
                        {home.IndexSecond.data.data.toDoBugCount}
                      </h2>
                    </div>
                  </Col>
                  <Col
                    {...colc}
                    onClick={() => {
                      history.push({
                        pathname: '/index/project/allpro',
                        query: {
                          ifJump: '2',
                        },
                      });
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        marginBottom: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <p>进行中的项目</p>
                      <h2 style={{ fontSize: 20, color: '#63869e' }}>
                        {home.IndexSecond.data.data.doingProjectCount}
                      </h2>
                      {home.IndexSecond.data.data.delayProjectCount &&
                        home.IndexSecond.data.data.delayProjectCount > 0 && (
                          <Tag color="#f50" style={{ margin: 0 }}>
                            已延期{' '}
                            {home.IndexSecond.data.data.delayProjectCount}
                          </Tag>
                        )}
                    </div>
                  </Col>
                </Row>
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
      </Spin>
    </Container>
  );
};

export default connect(({ home, model, loading }: any) => ({
  home,
  model,
  loading,
}))(Homepage);
