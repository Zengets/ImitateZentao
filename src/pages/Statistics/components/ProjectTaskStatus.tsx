import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import Container from '@material-ui/core/Container';
import { Card, Row, Col, Select, DatePicker } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import styles from '../style.less';
import AutoTable from '@/components/AutoTable';
import setNewState from '@/utils/setNewState';
import moment from 'moment';
import Button from '@material-ui/core/Button';

let { Option } = Select,
  { RangePicker } = DatePicker;
let ProjectTaskStatus = ({ dispatch, statics, loading }: any) => {
  let [curindex, changecur] = useState(0),
    start = moment()
      .startOf('month')
      .valueOf(),
    end = moment().valueOf(),
    [postdata, cpost] = useState({
      status: '1', //项目状态 1全部 2进行中 3已完成
      startMinDate: start, //项目开始时间起，必填
      startMaxDate: end, //项目开始时间止，必填
    });

  let columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '待激活',
      dataIndex: 'beActivation',
      key: 'beActivation',
      ellipsis: true,
      width: 120,
    },
    {
      title: '待开发',
      dataIndex: 'beDevelop',
      key: 'beDevelop',
      ellipsis: true,
      width: 120,
    },
    {
      title: '开发中',
      dataIndex: 'developing',
      key: 'developing',
      ellipsis: true,
      width: 120,
    },
    {
      title: '待测试',
      dataIndex: 'beTest',
      key: 'beTest',
      ellipsis: true,
      width: 120,
    },
    {
      title: '已完成',
      dataIndex: 'completed',
      key: 'completed',
      ellipsis: true,
      width: 120,
    },
    {
      title: '已关闭',
      dataIndex: 'closed',
      key: 'closed',
      ellipsis: true,
      width: 120,
    },
    {
      title: '总计',
      dataIndex: 'total',
      key: 'total',
      ellipsis: true,
      width: 120,
    },
  ];

  useEffect(() => {
    setNewState(dispatch, 'statics/queryProjectTaskStatus', postdata, () => {});
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
        <div className={styles.items}>
          <label className={styles.mys}>项目状态</label>
          <Select
            allowClear
            style={{ width: 100 }}
            value={postdata.status}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                status: val,
              });
            }}
          >
            <Option value="1">全部</Option>
            <Option value="2">进行中</Option>
            <Option value="3">已完成</Option>
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>项目起止时间</label>
          <RangePicker
            value={[
              moment(postdata.startMinDate),
              moment(postdata.startMaxDate),
            ]}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                startMinDate: val ? moment(val[0]).valueOf() : start,
                startMaxDate: val ? moment(val[1]).valueOf() : end,
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
                'statics/queryProjectTaskStatus',
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
        data={{ list: statics.queryProjectTaskStatus }}
        columns={columns}
        pagination="false"
        scroll={{ x: 720 }}
        loading={loading.effects['statics/queryProjectTaskStatus']}
      ></AutoTable>
    </div>
  );
};

export default connect(({ statics, loading }: any) => ({
  statics,
  loading,
}))(ProjectTaskStatus);
