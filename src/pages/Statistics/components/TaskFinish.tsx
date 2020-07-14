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
} from 'antd';
import styles from '../style.less';
import Button from '@material-ui/core/Button';
import AutoTable from '@/components/AutoTable';
import setNewState from '@/utils/setNewState';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
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

let TaskFinish = ({ dispatch, statics, model, loading }: any) => {
  let [curindex, changecur] = useState(0),
    [fastest, cfastest] = useState(0),
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
      workdays: parseInt(workday_count(startday, endday)), //工作日天数，必填
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
    {
      title: '完成人员',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: row.userName,
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
      title: '预计消耗',
      dataIndex: 'planExpendHours',
      key: 'planExpendHours',
      ellipsis: true,
      width: 120,
    },
    {
      title: '实际消耗',
      dataIndex: 'actualExpendHours',
      key: 'actualExpendHours',
      ellipsis: true,
      width: 120,
    },
    {
      title: '完成效率',
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
      title: '工作效率',
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
  ];

  useEffect(() => {
    setNewState(dispatch, 'statics/queryTaskFinish', postdata, () => {});
    setNewState(dispatch, 'statics/DepqueryTreeList', {}, () => {});
    setNewState(dispatch, 'statics/depuserlist', {}, () => {});
  }, []);

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
                'statics/depuserlist',
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
            {statics.depuserlist.map(({ dicKey, dicName }: any, i: number) => (
              <Option key={i} value={dicKey}>
                {dicName}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>项目起止时间</label>
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
                workdays: parseInt(workday_count(starts, ends)),
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
              setNewState(
                dispatch,
                'statics/queryTaskFinish',
                postdata,
                () => {},
              );
            }}
          >
            <span style={{ marginTop: 2 }}>查询</span>
          </Button>
        </div>
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
