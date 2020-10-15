import { Card, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';
import styles from '../index.less';
import {
  ClockCircleOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ItemCard(props: any) {
  const { dataList, statusList, curstate } = props;
  const [activeTabKey, setActiveTabKey] = useState(0);
  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  useMemo(() => {
    console.log(curstate);
    setActiveTabKey(curstate.toString());
  }, [curstate]);

  return (
    <Tabs
      centered={true}
      activeKey={activeTabKey}
      onChange={(key: any) => {
        onTabChange(key);
      }}
    >
      {statusList.map((item: any, ins: number) => (
        <TabPane
          tab={`${item.taskStatusName}(${
            dataList.filter((it: any) => {
              return it.taskStatusName == statusList[ins].taskStatusName;
            })[0].taskList.length
          })`}
          key={ins}
        >
          {dataList
            .filter((it: any) => {
              return (
                it.taskStatusName == statusList[activeTabKey].taskStatusName
              );
            })
            .map((item1: any, index: number) => {
              return item1.taskList.map((val: any, i: number) => {
                return (
                  <div
                    className={styles.span}
                    style={{
                      backgroundColor:
                        val.ifDelay == '1' ? '#fff' : 'rgba(255,0,0,0.2)',
                    }}
                    onClick={() => {}}
                  >
                    <div className={styles.rowspace}>
                      <span>{val.taskNo}</span>
                      <span>{val.currentUserName}</span>
                    </div>
                    <p style={{ margin: '6px 0', color: '#666' }}>
                      {val.taskName}
                    </p>
                    <div className={styles.rowspace}>
                      <span
                        style={{
                          color: val.priorityName == '高' ? 'red' : '#666',
                        }}
                      >
                        {val.priorityName}
                      </span>
                      <span>
                        <ClockCircleOutlined /> {val.devStagePlanHours}
                      </span>
                    </div>
                  </div>
                );
              });
            })}
        </TabPane>
      ))}
    </Tabs>
  );
}
