import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import Container from '@material-ui/core/Container';
import {
  Card,
  Row,
  Col,
  Modal,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
  Tooltip,
} from 'antd';
import styles from '../style.less';
import Button from '@material-ui/core/Button';
import AutoTable from '@/components/AutoTable';
import setNewState from '@/utils/setNewState';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import {
  UnlockOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import {
  getNextMonthDays,
  getNextWeekDays,
  getCurrMonthDays,
  getCurrWeekDays,
  getLastMonthDays,
  getLastWeekDays,
} from '@/utils/mwdtimepicker';
import ReactEcharts from 'echarts-for-react';

let { Option } = Select,
  { RangePicker } = DatePicker,
  { TreeNode } = TreeSelect;

const selectarr = [
  {
    label: '当日',
    value: 'a',
  },
  {
    label: '上周',
    value: 'b',
  },
  {
    label: '上月',
    value: 'c',
  },
  {
    label: '本周',
    value: 'd',
  },
  {
    label: '本月',
    value: 'e',
  },
  {
    label: '下周',
    value: 'f',
  },
  {
    label: '下月',
    value: 'g',
  },
];

let TaskFinish = ({ dispatch, statics, model, loading }: any) => {
  let [curindex, changecur] = useState(0),
    [fastest, cfastest] = useState(0),
    [active, cact] = useState(0),
    startday = moment().startOf('month'),
    endday = moment(),
    start = moment()
      .startOf('month')
      .valueOf(),
    end = moment().valueOf(),
    [postdata, cpost] = useState({
      departmentId: undefined, //部门id
      devUserId: undefined, //完成人员id
      acceptStageTimeStart: start, //完成日期起，必填
      acceptStageTimeEnd: end, //完成日期止，必填
      workdays: undefined,
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
      .reduce((result: any, userId: any) => {
        //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
        const children = data.filter((item: any) => item.userId === userId);
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

  let rerenderdata = (res: any, userId: any) => {
    let data = statics.queryTaskFinish.map((item: any) => {
      if (item.userId == userId) {
        item.workEfficiency = res;
      }
      return item;
    });

    setNewState(dispatch, 'statics/resetTaskFinish', data, () => {});
  };

  let columns = [
    //2020
    {
      title: '完成人员',
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
                    devStageEndDateStart: postdata.acceptStageTimeStart, //任务截止日期起
                    devStageEndDateEnd: postdata.acceptStageTimeEnd, //任务截止日期止
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
      title: '预计工时',
      dataIndex: 'planExpendHours',
      key: 'planExpendHours',
      ellipsis: true,
      width: 120,
      render: (text: any, record: any) => <span>{text}</span>,
    },
    {
      title: '实际工时',
      dataIndex: 'actualExpendHours',
      key: 'actualExpendHours',
      ellipsis: true,
      width: 120,
      render: (text: any, record: any) => <span>{text}</span>,
    },
    {
      title: '工作效率',
      dataIndex: 'completionEfficiency',
      key: 'completionEfficiency',
      ellipsis: true,
      width: 120,
      render: (text: any) => <span>{text ? text + '%' : ''}</span>,
    },
    {
      title: 'Bug数量',
      dataIndex: 'bugCount',
      key: 'bugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '理论总工时',
      dataIndex: 'theoreticalWorkingHours',
      key: 'theoreticalWorkingHours',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children:
            curindex == row.userId ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <InputNumber
                  min={1}
                  value={fastest}
                  onChange={(val: any) => {
                    cfastest(val);
                  }}
                ></InputNumber>
                <IconButton
                  onClick={() => {
                    if (isNaN(parseFloat(fastest))) {
                      return;
                    }
                    let hover =
                        row.childrens[row.childrens.length - 1]
                          .actualExpendHours,
                      res = ((hover * 100) / fastest).toFixed(2);
                    rerenderdata(res, row.userId);
                  }}
                >
                  <Tooltip title="保存">
                    <SaveIcon color="primary"></SaveIcon>
                  </Tooltip>
                </IconButton>
              </div>
            ) : (
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => {
                  console.log(
                    row.childrens[row.childrens.length - 1].actualExpendHours,
                  );
                  let hover =
                    row.childrens[row.childrens.length - 1].actualExpendHours;
                  if (!hover) {
                    return;
                  }
                  changecur(row.userId);
                  cfastest(text);
                }}
              >
                {text}
                <IconButton style={{ marginLeft: 8 }}>
                  <Tooltip title="编辑">
                    <EditIcon color="primary"></EditIcon>
                  </Tooltip>
                </IconButton>
              </span>
            ),
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
    {
      title: '工作饱和度',
      dataIndex: 'workEfficiency',
      key: 'workEfficiency',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        let workEfficiency =
          row.childrens[row.childrens.length - 1].workEfficiency;

        return {
          children: <span>{workEfficiency ? workEfficiency + '%' : ''}</span>,
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
                    devStageEndDateStart: postdata.acceptStageTimeStart,
                    devStageEndDateEnd: postdata.acceptStageTimeEnd,
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
    setNewState(dispatch, 'statics/queryTaskFinish', postdata, (res: any) => {
      cpost({
        ...postdata,
        workdays: parseInt(res.data.workdays),
      });
    });
    setNewState(dispatch, 'statics/DepqueryTreeList', {}, () => {});
    setNewState(dispatch, 'statics/queryDevList', {}, () => {});
  }, []);

  useMemo(() => {
    cpost({
      ...postdata,
      workdays: undefined,
    });
    setNewState(
      dispatch,
      'statics/queryTaskFinish',
      {
        ...postdata,
        workdays: undefined,
      },
      (res: any) => {
        cpost({
          ...postdata,
          workdays: parseInt(res.data.workdays),
        });
      },
    );
  }, [
    postdata.departmentId,
    postdata.devUserId,
    postdata.acceptStageTimeStart,
    postdata.acceptStageTimeEnd,
  ]);

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
        <div className={styles.items} style={{ width: 220 }}>
          <label className={styles.mys}>部门</label>
          <TreeSelect
            allowClear
            style={{ width: '100%' }}
            value={postdata.departmentId}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={statics.DepqueryTreeList ? statics.DepqueryTreeList : []}
            placeholder="请选择"
            treeDefaultExpandAll
            onChange={(value: any) => {
              setNewState(
                dispatch,
                'statics/queryDevList',
                { departmentId: value },
                () => {
                  cpost({
                    ...postdata,
                    departmentId: value,
                    devUserId: undefined,
                  });
                },
              );
            }}
          />
        </div>
        <div className={styles.items}>
          <label className={styles.mys}>完成人员</label>
          <Select
            allowClear
            style={{ width: 100 }}
            placeholder="请选择"
            value={postdata.devUserId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                devUserId: val,
              });
            }}
          >
            {statics.queryDevList.map(({ dicKey, dicName }: any, i: number) => (
              <Option key={i} value={dicKey}>
                {dicName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
        <div className={styles.items}>
          <label className={styles.mys}>任务期间</label>
          <RangePicker
            value={[
              moment(postdata.acceptStageTimeStart),
              moment(postdata.acceptStageTimeEnd),
            ]}
            onChange={(val: any) => {
              let starts = val ? moment(val[0]) : startday,
                ends = val ? moment(val[1]) : endday;
              cpost({
                ...postdata,
                acceptStageTimeStart: starts.valueOf(),
                acceptStageTimeEnd: ends.valueOf(),
              });
            }}
          />
        </div>
        <div className={styles.items}>
          <label className={styles.mys}>工作日天数</label>
          <InputNumber
            min={1}
            step={1}
            placeholder="请选择"
            value={postdata.workdays}
            onChange={(value: any) => {
              cpost({
                ...postdata,
                workdays: value,
              });
              setNewState(
                dispatch,
                'statics/queryTaskFinish',
                {
                  ...postdata,
                  workdays: value,
                },
                (res: any) => {},
              );
            }}
          />
        </div>
        {selectarr.map((item: any, i: number) => (
          <Button
            key={i}
            type="submit"
            variant="contained"
            color={active == item.value ? 'primary' : 'action'}
            disableElevation
            style={{ height: 32, borderRadius: 0, margin: '0 2px' }}
            onClick={() => {
              function getVal(val: string) {
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
              }
              cact(item.value);
              let starts = getVal(item.value)[0],
                ends = getVal(item.value)[1],
                newpostdata = {
                  ...postdata,
                  acceptStageTimeStart: starts.valueOf(),
                  acceptStageTimeEnd: ends.valueOf(),
                  workdays: undefined,
                };
              cpost(newpostdata);
              setNewState(
                dispatch,
                'statics/queryTaskFinish',
                newpostdata,
                (res: any) => {
                  newpostdata.workdays = parseInt(res.data.workdays);
                  cpost(newpostdata);
                },
              );
            }}
          >
            <span style={{ marginTop: 2 }}>{item.label}</span>
          </Button>
        ))}
      </div>

      <AutoTable
        bordered={true}
        data={{ list: createNewArr(statics.queryTaskFinish) }}
        columns={columns}
        pagination="false"
        scroll={{ x: 900 }}
        loading={loading.effects['statics/queryTaskFinish']}
        rowKey="userId"
      ></AutoTable>
    </div>
  );
};

export default connect(({ statics, model, loading }: any) => ({
  statics,
  model,
  loading,
}))(TaskFinish);
