import { Card, Tabs, Menu } from 'antd';
import React, { useState } from 'react';
import PersonCenter from '@/components/PersonCenter';
import styles from './index.less';
import {
  ClockCircleOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import setNewState from '@/utils/setNewState';
import { connect, Link, history } from 'umi';
import Blackboard from './Blackboard';
import Blackport from './Blackport';
const { TabPane } = Tabs;

function BlackMain(props: any) {
  const menu = (
      <Menu>
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
    ),
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <Tabs
      className={styles.maintab}
      tabBarStyle={{
        backgroundColor: '#1183fb',
        padding: '6px 12px',
        color: '#fff',
      }}
      defaultActiveKey="0"
      tabBarExtraContent={
        <PersonCenter menu={menu} realName={userInfo.realName} />
      }
    >
      <TabPane tab={<span style={{ color: '#fff' }}>任务看板</span>} key={'0'}>
        <Blackboard></Blackboard>
      </TabPane>
      <TabPane
        tab={<span style={{ color: '#fff' }}>日/周/月 报</span>}
        key={'1'}
      >
        <Blackport></Blackport>
      </TabPane>
    </Tabs>
  );
}

export default connect(({ user, loading }: any) => ({
  user,
  loadings: loading.effects['user/blackboard'],
}))(BlackMain);
