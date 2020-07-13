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
let ProjectRate = ({ dispatch, statics, loading }: any) => {
  let [curindex, changecur] = useState(0),
    start = moment()
      .startOf('month')
      .valueOf(),
    end = moment().valueOf(),
    [postdata, cpost] = useState({
      startMinDate: start, //项目开始时间起，必填
      startMaxDate: end, //项目开始时间止，必填
    });

  let columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
      width: 120,
    },
    {
      title: '需求数量',
      dataIndex: 'requireCount',
      key: 'requireCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '剩余需求数量',
      dataIndex: 'leftRequireCount',
      key: 'leftRequireCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '任务总数',
      dataIndex: 'taskCount',
      key: 'taskCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '剩余任务数',
      dataIndex: 'leftTaskCount',
      key: 'leftTaskCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '剩余工时',
      dataIndex: 'leftWorkHours',
      key: 'leftWorkHours',
      ellipsis: true,
      width: 120,
    },
    {
      title: '已消耗工时',
      dataIndex: 'expendWorkHours',
      key: 'expendWorkHours',
      ellipsis: true,
      width: 120,
    },
    {
      title: '进度',
      dataIndex: 'rate',
      key: 'rate',
      ellipsis: true,
      width: 120,
      render: (text: any) => <span>{text ? text + '%' : ''}</span>,
    },
    {
      title: '项目预计完成日期',
      dataIndex: 'planFinishDate',
      key: 'planFinishDate',
      ellipsis: true,
      width: 120,
      render: (text: any) => (
        <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: '项目实际完成时间',
      dataIndex: 'actualFinishDate',
      key: 'actualFinishDate',
      ellipsis: true,
      width: 120,
      render: (text: any) => (
        <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'bug数',
      dataIndex: 'bugCount',
      key: 'bugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '解决bug数',
      dataIndex: 'solvedBugCount',
      key: 'solvedBugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '严重bug数',
      dataIndex: 'seriousBugCount',
      key: 'seriousBugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: '严重bug比率',
      dataIndex: 'seriousBugRate',
      key: 'seriousBugRate',
      ellipsis: true,
      width: 120,
      render: (text: any) => <span>{text ? text + '%' : ''}</span>,
    },
  ];

  useEffect(() => {
    setNewState(dispatch, 'statics/queryProjectRate', postdata, () => {});
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
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
                'statics/queryProjectRate',
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
        data={{ list: statics.queryProjectRate }}
        columns={columns}
        pagination="false"
        scroll={{ x: 900 }}
        loading={loading.effects['statics/queryProjectRate']}
      ></AutoTable>
    </div>
  );
};

export default connect(({ statics, loading }: any) => ({
  statics,
  loading,
}))(ProjectRate);
