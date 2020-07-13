import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Input,
  message,
  Tabs,
  Card,
  Popconfirm,
  Divider,
  Tooltip,
  Row,
  Col,
  Modal,
} from 'antd';
import Container from '@material-ui/core/Container';
import BugChild from './components/BugChild';
const { TabPane } = Tabs;

let Bugs = (props: any) => {
  let { proj, dispatch, loading, location, route } = props,
    index = location.query && location.query.ifJump,
    [keys, setkey] = useState(index ? index : '1');

  function callback(key: any) {
    setkey(key);
  }

  //set ref
  const ref = useRef();

  return (
    <Container maxWidth="xl">
      <Card>
        <Tabs
          animated
          activeKey={keys}
          onChange={callback}
          style={{ marginTop: -18 }}
          tabBarExtraContent={
            ref.current && keys == '1' ? ref.current.renderAdd() : null
          }
        >
          <TabPane tab={route.name} key="1">
            {keys == '1' && <BugChild ref={ref} key="1"></BugChild>}
          </TabPane>
          <TabPane tab="我的待办" key="2">
            {keys == '2' && (
              <BugChild
                key="2"
                addpostdata={{
                  isCurrentUser: 1,
                }}
              ></BugChild>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </Container>
  );
};

export default connect(({ proj, loading }: any) => ({
  proj,
  loading,
}))(Bugs);
