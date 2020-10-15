import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history, Link } from 'umi';
import moment from 'moment';
import { message, Tabs, Card, Row, Col, List, Divider } from 'antd';
import setNewState from '@/utils/setNewState';
import ThirdChildA from './ThirdChildA';
import ThirdChildB from './ThirdChildB';
import FourthChildA from './FourthChildA';
import FourthChildB from './FourthChildB';
import { ProjectOutlined } from '@ant-design/icons';
import IconButton from '@material-ui/core/IconButton';

const { TabPane } = Tabs;

let Third = () => {
  function callback(key: any) {
    console.log(key);
  }
  const board = () => (
    <IconButton style={{ padding: 8, borderRadius: 4, fontSize: 14 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '6px 12px',
        }}
      >
        <ProjectOutlined
          style={{ color: '#1183fb', fontSize: 18, marginRight: 6 }}
        ></ProjectOutlined>
        <Link to="/blackboard" target="_blank">
          任务看板
        </Link>
      </div>
    </IconButton>
  );

  return (
    <Card>
      <Tabs
        style={{ marginTop: -12 }}
        defaultActiveKey="1"
        onChange={callback}
        tabBarExtraContent={board()}
      >
        <TabPane tab={<span style={{ fontSize: 14 }}>待办任务</span>} key="1">
          <ThirdChildA></ThirdChildA>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: 14 }}>待解决Bug</span>} key="2">
          <ThirdChildB></ThirdChildB>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: 14 }}>延期任务</span>} key="3">
          <FourthChildA></FourthChildA>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: 14 }}>延期项目</span>} key="4">
          <FourthChildB></FourthChildB>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Third;
