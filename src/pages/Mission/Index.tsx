import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './style.less';
import { connect, history, Link } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { Tabs, Card } from 'antd';
import Container from '@material-ui/core/Container';
import MissionChild from './components/MissionChild';
import MissionChilds from './components/MissionChilds';
import { ProjectOutlined } from '@ant-design/icons';
import IconButton from '@material-ui/core/IconButton';

const { TabPane } = Tabs;

let Mission = (props: any) => {
  let { proj, dispatch, loading, route, location } = props,
    index = location.query && location.query.ifJump,
    [keys, setkey] = useState(index ? index : '1');

  function callback(key: any) {
    setkey(key);
  }

  //set ref
  const ref = useRef();

  // useMemo(()=>{
  //   if(location.query&&location.query.ifJump){
  //     setkey("2")
  //   }
  // },[location.query])
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
    <Container maxWidth="xl">
      <Card>
        <Tabs
          animated
          activeKey={keys}
          onChange={callback}
          style={{ marginTop: -18 }}
          tabBarExtraContent={
            ref.current && keys == '1' ? ref.current.renderAdd(board) : board()
          }
        >
          <TabPane tab={route.name} key="1">
            {keys == '1' && <MissionChild ref={ref} key="1"></MissionChild>}
          </TabPane>
          <TabPane tab="待办任务" key="2">
            {keys == '2' && <MissionChilds key="2" ifJump={3}></MissionChilds>}
          </TabPane>
          <TabPane tab="今日必完成" key="3">
            {keys == '3' && <MissionChilds key="3" ifJump={2}></MissionChilds>}
          </TabPane>
          <TabPane tab="延期任务" key="4">
            {keys == '4' && <MissionChilds key="4" ifJump={1}></MissionChilds>}
          </TabPane>
        </Tabs>
      </Card>
    </Container>
  );
};

export default connect(({ proj, loading }: any) => ({
  proj,
  loading,
}))(Mission);
