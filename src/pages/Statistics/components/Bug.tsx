import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import Container from '@material-ui/core/Container';
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
  Tooltip,
  Modal,
} from 'antd';
import styles from '../style.less';
import Button from '@material-ui/core/Button';
import AutoTable from '@/components/AutoTable';
import setNewState from '@/utils/setNewState';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ReactEcharts from 'echarts-for-react';

import {
  UnlockOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons';

let { Option } = Select,
  { RangePicker } = DatePicker,
  { TreeNode } = TreeSelect;
//工作日计算
function workday_count(start: any, end: any) {
  let first = start.clone().endOf('week'); // 第一周最后一天
  let last = end.clone().startOf('week'); // 最后一周第一天
  let days = (last.diff(first, 'days') * 5) / 7;
  let wfirst = first.day() - start.day();
  if (start.day() == 0) --wfirst;
  let wlast = end.day() - last.day();
  if (end.day() == 6) --wlast;
  return wfirst + days + wlast;
}

let Bug = ({ dispatch, statics, model, loading }: any) => {
  let [curindex, changecur] = useState(0),
    startday = moment().startOf('month'),
    endday = moment(),
    [postdata, cpost] = useState({
      productId: undefined, //产品id
      projectId: undefined, // 项目id，根据产品联动
      solveUserId: undefined, //人员id，独立下拉框
      openMinTime: startday.valueOf(),
      openMaxTime: endday.valueOf(),
    });

  let createNewArr = (data: any) => {
    return data
      .reduce((result: any, item: any) => {
        //首先将userId字段作为新数组result取出
        if (result.indexOf(item.userId) < 0) {
          result.push(item.userId);
        }
        return result;
      }, [])
      .reduce((result: any, id: any) => {
        //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
        const children = data.filter((item: any) => item.userId == id);

        result = result.concat(
          children.map((item: any, index: any) => ({
            ...item,
            childrens: children,
            rowSpan: index === 0 ? children.length : 0, //将第一行数据添加rowSpan字段
          })),
        );
        return result;
      }, []);
  };

  let columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: (
            <a
              onClick={() => {
                setNewState(
                  dispatch,
                  'statics/blackport',
                  {
                    currentUserId: row.userId,
                    devStageEndDateStart: postdata.openMinTime, //任务截止日期起
                    devStageEndDateEnd: postdata.openMaxTime, //任务截止日期止
                  },
                  (res: any) => {
                    let getOption = (data: any) => {
                      return {
                        tooltip: {
                          trigger: 'item',
                          triggerOn: 'mousemove',
                        },
                        toolbox: {
                          show: true,
                          x: '96.6%',
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
                                    '{a|' +
                                    params.name +
                                    ' 工作报表\n' +
                                    params.data.date +
                                    '}'
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
                    Modal.info({
                      title: `${row.userName}${row.projectDate}任务看板`,
                      width: '96%',
                      style: { top: 12 },
                      maskClosable: true,
                      content: (
                        <ReactEcharts
                          style={{
                            width: '100%',
                            height: '80vh',
                          }}
                          option={getOption(res.data.dataList)}
                        ></ReactEcharts>
                      ),
                    });
                  },
                );
              }}
            >
              {row.userName}
            </a>
          ),
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: text,
          props: {
            rowSpan: parseInt(row.count),
          },
        };
      },
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
      width: 120,
    },
    {
      title: '项目起止日期',
      dataIndex: 'projectDate',
      key: 'projectDate',
      ellipsis: true,
      width: 120,
    },
    {
      title: '总任务数',
      dataIndex: 'testCount',
      key: 'testCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '已测试任务数',
      dataIndex: 'finishTestCount',
      key: 'finishTestCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '完成进度',
      dataIndex: 'completionEfficiency',
      key: 'completionEfficiency',
      ellipsis: true,
      width: 120,
      render: (text: any) => <span>{text ? text + '%' : ''}</span>,
    },
    {
      title: '提交bug数',
      dataIndex: 'bugCount',
      key: 'bugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '提交bug总计',
      dataIndex: 'bugTotal',
      key: 'bugTotal',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: text,
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
    //2020.9.29 导出路径接口
    {
      title: '导出',
      dataIndex: 'daochu',
      key: 'daochu',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: (
            <IconButton
              style={{ padding: 8, borderRadius: 4 }}
              onClick={() => {
                function bodyparse(vals: any) {
                  delete vals.sortList;
                  let val = JSON.parse(JSON.stringify(vals));
                  delete val.pageSize;
                  delete val.pageIndex;
                  let res = '';
                  for (let key in val) {
                    let value = val[key] ? val[key] : '';

                    res += `&${key}=${value}`;
                  }
                  return res.substr(1);
                }
                window.open(
                  `/zentao/umTask/exportTaskReport?${bodyparse({
                    currentUserId: row.userId,
                    devStageEndDateStart: postdata.openMinTime,
                    devStageEndDateEnd: postdata.openMaxTime,
                  })}`,
                );
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '6px 12px',
                }}
              >
                <ExportOutlined style={{ color: '#1183fb', fontSize: 18 }} />
                <span
                  style={{ fontSize: 14, color: '#1183fb', paddingLeft: 6 }}
                >
                  导出
                </span>
              </div>
            </IconButton>
          ),
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
  ];

  useEffect(() => {
    setNewState(dispatch, 'statics/queryBug', postdata, () => {});
    setNewState(dispatch, 'statics/ProdqueryAllSelectAll', {}, () => {});
    setNewState(dispatch, 'statics/umRequiretoproj', {}, () => {});
    setNewState(dispatch, 'statics/queryTestList', {}, () => {});
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
        <div className={styles.items}>
          <label className={styles.mys}>产品</label>
          <Select
            allowClear
            style={{ width: 200 }}
            placeholder="请选择"
            value={postdata.productId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                productId: val,
                projectId: undefined,
                solveUserId: undefined,
              });
              setNewState(
                dispatch,
                'statics/umRequiretoproj',
                { productId: val },
                () => {},
              );
              setNewState(
                dispatch,
                'statics/queryTestList',
                { productId: val },
                () => {},
              );
            }}
          >
            {statics.ProdqueryAllSelectAll.map(
              ({ dicKey, dicName }: any, i: number) => (
                <Option key={i} value={dicKey}>
                  {dicName}
                </Option>
              ),
            )}
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>项目</label>
          <Select
            allowClear
            style={{ width: 200 }}
            placeholder="请选择"
            value={postdata.projectId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                projectId: val,
                solveUserId: undefined,
              });
              setNewState(
                dispatch,
                'statics/queryTestList',
                {
                  productId: postdata.productId,
                  projectId: val,
                },
                () => {},
              );
            }}
          >
            {statics.umRequiretoproj.map(
              ({ dicKey, dicName }: any, i: number) => (
                <Option key={i} value={dicKey}>
                  {dicName}
                </Option>
              ),
            )}
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>人员</label>
          <Select
            allowClear
            style={{ width: 100 }}
            placeholder="请选择"
            value={postdata.solveUserId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                solveUserId: val,
              });
            }}
          >
            {statics.queryTestList.map(
              ({ dicKey, dicName }: any, i: number) => (
                <Option key={i} value={dicKey}>
                  {dicName}
                </Option>
              ),
            )}
          </Select>
        </div>
        <div className={styles.items}>
          <label className={styles.mys}>任务截止日期</label>
          <RangePicker
            value={[moment(postdata.openMinTime), moment(postdata.openMaxTime)]}
            onChange={(val: any) => {
              let starts = val ? moment(val[0]) : startday,
                ends = val ? moment(val[1]) : endday;
              cpost({
                ...postdata,
                openMinTime: starts.valueOf(),
                openMaxTime: ends.valueOf(),
              });
            }}
          />
        </div>

        <div className={styles.items}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            style={{ height: 32, borderRadius: 0 }}
            onClick={() => {
              setNewState(dispatch, 'statics/queryBug', postdata, () => {});
            }}
          >
            <span style={{ marginTop: 2 }}>查询</span>
          </Button>
        </div>
      </div>

      <AutoTable
        bordered={true}
        data={{ list: createNewArr(statics.queryBug) }}
        columns={columns}
        pagination="false"
        scroll={{ x: 900 }}
        loading={loading.effects['statics/queryBug']}
        rowKey="userId"
      ></AutoTable>
    </div>
  );
};

export default connect(({ statics, model, loading }: any) => ({
  statics,
  model,
  loading,
}))(Bug);
