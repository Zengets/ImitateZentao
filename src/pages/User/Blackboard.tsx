import React, { useState, useMemo, Component, useEffect, useRef } from 'react';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.less';
import {
  Row,
  Col,
  Affix,
  Modal,
  Select,
  DatePicker,
  Space,
  Card,
  Menu,
  Spin,
  Empty,
  Switch,
} from 'antd';
import ItemCard from './components/Itemcard';
import { connect, Link, history } from 'umi';
import moment from 'moment';
import {
  ClockCircleOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import setNewState from '@/utils/setNewState';
const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  proj: { xs: 24, sm: 24, md: 8, lg: 8, xl: 6, xxl: 5 },
  daterange: { xs: 0, sm: 0, md: 16, lg: 16, xl: 18, xxl: 19 },
  dateranges: { xs: 24, sm: 24, md: 0, lg: 0, xl: 0, xxl: 0 },
  daterangec: { xs: 0, sm: 0, md: 24, lg: 24, xl: 24, xxl: 24 },
};

function Blackboard(props: any) {
  const [daterange, cdaterange] = useState([
      moment().startOf('month'),
      moment().add('month', 1),
    ]),
    [options, coption] = useState([]),
    [data, cdata] = useState([]),
    [statusList, cstatusList] = useState([
      {
        taskNum: '0',
        taskStatusName: '待开发',
      },
      {
        taskNum: '0',
        taskStatusName: '开发中',
      },
      {
        taskNum: '0',
        taskStatusName: '待测试',
      },
      {
        taskNum: '0',
        taskStatusName: '待验收',
      },
      {
        taskNum: '0',
        taskStatusName: '已完成',
      },
    ]),
    userInfo = JSON.parse(localStorage.getItem('userInfo')),
    fval = localStorage.getItem('val'),
    [currentUserId, cuser] = useState(userInfo.id),
    [proj, cpro] = useState(fval ? fval : null),
    [curstate, changestate] = useState('0');

  useEffect(() => {
    setNewState(props.dispatch, 'model/ProjquerySelectList', {}, (res: any) => {
      coption(res.data.dataList);
    });
  }, []);

  useMemo(() => {
    setNewState(
      props.dispatch,
      'user/blackboard',
      {
        projectId: proj, //项目id
        currentUserId,
        devStageEndDateStart: daterange[0].valueOf(), //任务截止日期起
        devStageEndDateEnd: daterange[1].valueOf(), //任务截止日期止
      },
      (result: any) => {
        cdata(result.data.dataList);
        result.data.statusNumList.length > 0 &&
          cstatusList(result.data.statusNumList);
      },
    );
  }, [daterange, proj, currentUserId]);

  //pc
  function Pc() {
    return (
      <div style={{ padding: '12px 10px 12px 12px' }}>
        <Row
          gutter={24}
          style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
        >
          <Col
            md={4}
            sm={0}
            xs={0}
            style={{
              textAlign: 'center',
              border: '1px solid #DCDCDC',
              padding: '12px 0',
              backgroundColor: '#f9f9f9',
            }}
          >
            需求{' '}
          </Col>
          {statusList.map((item: any, i: any) => {
            return (
              <Col
                md={4}
                sm={0}
                xs={0}
                style={{
                  textAlign: 'center',
                  border: '1px solid #DCDCDC',
                  marginLeft: -1,
                  padding: '12px 0',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {item.taskStatusName}({item.taskNum})
              </Col>
            );
          })}
        </Row>
        {data.map((item: any, index: any) => {
          return (
            <Row
              gutter={24}
              className={styles.row}
              style={{ marginLeft: 0, marginRight: 0, marginTop: -1 }}
              key={index}
            >
              <Col
                md={4}
                sm={0}
                xs={0}
                className={styles.lineCol}
                key={item.id}
              >
                <ul className={styles.sectitle}>
                  <li>优先级:{item.priorityName}</li>
                  <li>任务数：{item.taskNum}</li>
                </ul>
                <div style={{ marginTop: 4 }}>
                  {item.requireName}
                  <a className={styles.todetail}>详情</a>
                </div>
              </Col>
              {statusList.map((itemz: any, int: any) => {
                return (
                  <Col
                    key={int}
                    md={4}
                    sm={0}
                    xs={0}
                    className={styles.lineCol}
                  >
                    {item.taskStatusList.map((item1: any) => {
                      if (item1.taskStatusName == itemz.taskStatusName) {
                        return item1.taskList.map((val: any) => {
                          return (
                            <div
                              className={styles.span}
                              style={{
                                backgroundColor:
                                  val.ifDelay == '1'
                                    ? '#fff'
                                    : 'rgba(255,0,0,0.2)',
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
                                    color:
                                      val.priorityName == '高' ? 'red' : '#666',
                                  }}
                                >
                                  {val.priorityName}
                                </span>
                                <span>
                                  <ClockCircleOutlined />{' '}
                                  {val.devStagePlanHours}
                                </span>
                              </div>
                            </div>
                          );
                        });
                      }
                    })}
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    );
  }

  //mobile
  function Mobile() {
    return (
      <div style={{ padding: 12 }}>
        <Row
          style={{ display: 'flex', justifyContent: 'center', color: '#fff' }}
        >
          {statusList.map((item: any, i: any) => {
            return (
              <Col
                key={i}
                span={24}
                style={{
                  textAlign: 'center',
                  padding: '12px 0',
                  backgroundColor: curstate == i ? '#1183fb' : '#DCDCDC',
                  flex: 1,
                  marginBottom: 12,
                  borderRight: '#fff solid 1px',
                  color: curstate == i ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  changestate(i);
                }}
              >
                {item.taskStatusName}({item.taskNum})
              </Col>
            );
          })}
        </Row>
        {data.map((item: any) => {
          return (
            <Row
              gutter={24}
              style={{
                width: '100%',
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 12,
              }}
              key={item.id}
            >
              <Col
                span={24}
                style={{
                  backgroundColor: '#ddd',
                  padding: '10px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1, marginLeft: 12 }}>
                  {item.requireName} <a className={styles.todetail}>详情</a>
                </div>
                <ul
                  className={styles.sectitle}
                  style={{ width: 150, marginRight: 12 }}
                >
                  <li>优先级:{item.priorityName}</li>
                  <li>任务数：{item.taskNum}</li>
                </ul>
              </Col>
              <Col
                span={24}
                style={{
                  marginTop: -1,
                  border: '1px solid #f0f0f0',
                  padding: 12,
                  paddingTop: 0,
                  backgroundColor: '#f0f0f0',
                }}
              >
                <ItemCard
                  curstate={curstate}
                  dataList={item.taskStatusList}
                  statusList={statusList}
                />
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ marginTop: -4 }}>
      <Spin spinning={props.loadings} style={{ height: '100vh' }}>
        <Affix offsetTop={0} style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1183fb',
              color: '#fff',
              position: 'relative',
            }}
          >
            <div style={{ flex: 1 }}>
              <Row
                gutter={24}
                style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
              >
                <Col
                  {...layout.proj}
                  style={{
                    textAlign: 'left',
                    padding: '0 10px',
                  }}
                >
                  <span style={{ paddingRight: '10px' }}>项目 </span>
                  <Select
                    showSearch
                    style={{
                      width: '80%',
                      minWidth: 200,
                      margin: '10px 0',
                      textAlign: 'left',
                      fontSize: 10,
                    }}
                    placeholder="请选择项目"
                    value={proj}
                    onChange={(value: any) => {
                      cpro(value);
                    }}
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear
                  >
                    {options.map((item: any, i: any) => {
                      return (
                        <Option
                          title={item.dicName}
                          key={i}
                          value={item.dicKey}
                        >
                          {item.dicName}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col
                  {...layout.daterange}
                  style={{
                    textAlign: 'left',
                    padding: '0',
                  }}
                >
                  <span style={{ paddingRight: '10px' }}>日期</span>
                  <Space
                    direction="vertical"
                    size={12}
                    style={{ margin: '10px 0' }}
                  >
                    <RangePicker
                      allowClear={false}
                      showToday={true}
                      value={daterange}
                      onChange={(value: any) => {
                        cdaterange(value);
                      }}
                      locale={locale}
                    />
                  </Space>
                </Col>
                <Col
                  {...layout.dateranges}
                  style={{
                    textAlign: 'left',
                    padding: '0 10px',
                  }}
                >
                  <span style={{ paddingRight: '10px' }}>日期 </span>
                  <Space
                    className={styles.mblim}
                    direction="horizontal"
                    size={12}
                    style={{ margin: '10px 0', width: '80%' }}
                  >
                    <DatePicker
                      allowClear={false}
                      locale={locale}
                      value={daterange[0]}
                      className={styles.datePicker}
                      onChange={value => {
                        cdaterange(() => {
                          let newrange = daterange.map((it, i) => {
                            if (i == 0) {
                              return value;
                            } else {
                              return it;
                            }
                          });
                          return newrange;
                        });
                      }}
                    />
                    <DatePicker
                      allowClear={false}
                      locale={locale}
                      value={daterange[1]}
                      className={styles.datePicker}
                      onChange={value => {
                        cdaterange(() => {
                          let newrange = daterange.map((it, i) => {
                            if (i == 1) {
                              return value;
                            } else {
                              return it;
                            }
                          });
                          return newrange;
                        });
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
              }}
            >
              <Switch
                size="default"
                checkedChildren="自己"
                unCheckedChildren="全部"
                defaultChecked
                onChange={(checked: boolean, event: Event) => {
                  if (checked) {
                    cuser(userInfo.id);
                  } else {
                    cuser('');
                  }
                }}
              />
            </div>
          </div>
        </Affix>
        {/* pc组件 */}
        <Row>
          <Col {...layout.daterangec}>
            <Pc></Pc>
          </Col>
          <Col {...layout.dateranges}>
            <Mobile></Mobile>
          </Col>
        </Row>
        {data.length == 0 ? (
          <Empty description="你搜了才有啊，你搜"></Empty>
        ) : null}
      </Spin>
    </div>
  );
}

export default connect(({ user, loading }: any) => ({
  user,
  loadings: loading.effects['user/blackboard'],
}))(Blackboard);
