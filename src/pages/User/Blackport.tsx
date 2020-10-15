import React, { useState, useMemo, Component, useEffect, useRef } from 'react';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.less';
import {
  Row,
  Col,
  Affix,
  Radio,
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
import ReactEcharts from 'echarts-for-react';
import {
  getNextMonthDays,
  getNextWeekDays,
  getCurrMonthDays,
  getCurrWeekDays,
  getLastMonthDays,
  getLastWeekDays,
} from '@/utils/mwdtimepicker';

const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
  user: { xs: 24, sm: 24, md: 10, lg: 8, xl: 8, xxl: 5 },
  daterange: { xs: 0, sm: 0, md: 14, lg: 16, xl: 16, xxl: 19 },
  dateranges: { xs: 24, sm: 24, md: 0, lg: 0, xl: 0, xxl: 0 },
  daterangec: { xs: 0, sm: 0, md: 24, lg: 24, xl: 24, xxl: 24 },
};

function Blackport(props: any) {
  const [daterange, cdaterange] = useState([
      moment().startOf('day'),
      moment().endOf('day'),
    ]),
    [options, coption] = useState([]),
    [data, cdata] = useState([]),
    userInfo = JSON.parse(localStorage.getItem('userInfo')),
    [currentUserId, cuser] = useState(userInfo.id);

  useEffect(() => {
    setNewState(props.dispatch, 'model/UserqueryAll', {}, (res: any) => {
      coption(res.data.parentList);
    }); //人员 全局下拉框
  }, []);

  useMemo(() => {
    setNewState(
      props.dispatch,
      'user/blackport',
      {
        currentUserId,
        devStageEndDateStart: daterange[0].valueOf(), //任务截止日期起
        devStageEndDateEnd: daterange[1].valueOf(), //任务截止日期止
      },
      (result: any) => {
        cdata(result.data.dataList);
      },
    );
  }, [daterange, currentUserId]);

  let getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      toolbox: {
        show: true,
        x: '90.6%',
        y: '6%',
        feature: {
          saveAsImage: {
            show: true,
            excludeComponents: ['toolbox'],
            pixelRatio: 2,
            name: data.name + data.date + '工作报表',
          },
        },
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],
          top: '10%',
          left: '8%',
          bottom: '22%',
          right: '20%',
          symbolSize: 5,
          edgeForkPosition: '5%',
          roam: true,

          initialTreeDepth: 3,
          lineStyle: {
            width: 1,
          },
          label: {
            distance: 10,
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            formatter: (params: any) => {
              console.log(params);
              if (params.data.date) {
                return (
                  '{a|' + params.name + ' 工作报表\n' + params.data.date + '}'
                );
              }

              if (params.data.endDate) {
                let lasttimer =
                  params.data.status == 3
                    ? '{a|' +
                      params.name +
                      '\n ' +
                      params.data.endDate +
                      ' [任务数:' +
                      params.data.children.length +
                      '] ' +
                      '}{abs|}'
                    : '{a|' +
                      params.name +
                      '\n ' +
                      params.data.endDate +
                      ' [任务数:' +
                      params.data.children.length +
                      '] ' +
                      '}{abg|}';

                return lasttimer;
              }

              if (params.data.statusName) {
                let lasttimer =
                  params.data.ifDelay == '2'
                    ? '{a|' +
                      params.data.statusName +
                      '} {txt|' +
                      params.name +
                      '}{ab|}'
                    : params.data.status == 3
                    ? '{a|' +
                      params.data.statusName +
                      '} {txt|' +
                      params.name +
                      '}'
                    : params.data.status == 7
                    ? '{c|' +
                      params.data.statusName +
                      '} {txt|' +
                      params.name +
                      '}'
                    : '{b|' +
                      params.data.statusName +
                      '} {txt|' +
                      params.name +
                      '}';

                return lasttimer;
              }
            },
            rich: {
              txt: {
                color: '#999',
                align: 'left',
              },
              a: {
                color: '#000',
                lineHeight: 22,
                align: 'center',
              },
              b: {
                color: '#1183fb',
                align: 'left',
              },
              c: {
                color: '#00b600',
                align: 'left',
              },

              abg: {
                backgroundColor: '#f0f0f0',
                color: '#fff',
                width: '100%',
                align: 'right',
                height: 22,
                borderRadius: [0, 0, 4, 4],
              },
              abs: {
                backgroundColor: '#ffa2be',
                color: '#fff',
                width: '100%',
                align: 'right',
                height: 22,
                borderRadius: [0, 0, 4, 4],
              },
              ab: {
                backgroundColor: '#ffa2be',
                width: '100%',
                align: 'right',
                padding: 6,
              },
            },
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
  };

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
            <div style={{ flex: 1, minWidth: 260 }}>
              <Row
                gutter={24}
                style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
              >
                <Col
                  {...layout.user}
                  style={{
                    textAlign: 'left',
                    padding: '0 10px',
                  }}
                >
                  <span style={{ paddingRight: '10px' }}>员工 </span>
                  <Select
                    showSearch
                    style={{
                      width: '80%',
                      margin: '10px 0',
                      textAlign: 'left',
                      fontSize: 10,
                    }}
                    placeholder="请选择员工"
                    value={currentUserId}
                    onChange={(value: any) => {
                      cuser(value);
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
                      showToday={true}
                      allowClear={false}
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
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 240,
              }}
            >
              <Radio.Group
                buttonStyle="solid"
                defaultValue="a"
                size="small"
                onChange={(e: any) => {
                  cdaterange(() => {
                    let val = e.target.value;
                    if (val == 'a') {
                      return [moment().startOf('day'), moment().endOf('day')];
                    } else if (val == 'b') {
                      return getLastWeekDays();
                    } else if (val == 'c') {
                      return getLastMonthDays();
                    } else if (val == 'd') {
                      return getCurrWeekDays();
                    } else if (val == 'e') {
                      return getCurrMonthDays();
                    } else if (val == 'f') {
                      return getNextWeekDays();
                    } else if (val == 'g') {
                      return getNextMonthDays();
                    }
                  });
                }}
              >
                <Radio.Button value="b">上周</Radio.Button>
                <Radio.Button value="d">本周</Radio.Button>
                <Radio.Button value="f">下周</Radio.Button>

                <Radio.Button value="c">上月</Radio.Button>
                <Radio.Button value="e">本月</Radio.Button>
                <Radio.Button value="g">下月</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </Affix>
        {/* pc组件 */}
        <Row>
          <ReactEcharts
            style={{
              width: '100%',
              height: '85vh',
            }}
            option={getOption()}
          ></ReactEcharts>
        </Row>
        {data.userName ? (
          <Empty description="你搜了才有啊，你搜"></Empty>
        ) : null}
      </Spin>
    </div>
  );
}

export default connect(({ user, loading }: any) => ({
  user,
  loadings: loading.effects['user/blackport'],
}))(Blackport);
