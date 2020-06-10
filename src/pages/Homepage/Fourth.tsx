import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import moment from 'moment';
import { message, Tabs, Card, Row, Col, List, Divider } from 'antd';
import setNewState from '@/utils/setNewState';
import FourthChildA from './FourthChildA';
import FourthChildB from './FourthChildB';
const { TabPane } = Tabs;

let Third = () => {
  function callback(key: any) {
    console.log(key);
  }

  return (
    <Card>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={<span style={{ fontSize: 14 }}>延期任务</span>} key="1">
          <FourthChildA></FourthChildA>
        </TabPane>
        <TabPane tab={<span style={{ fontSize: 14 }}>延期项目</span>} key="2">
          <FourthChildB></FourthChildB>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Third;
