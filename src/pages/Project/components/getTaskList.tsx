import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
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
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AutoTable from '@/components/AutoTable';
import {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnRangeProps,
} from '@/components/TbSearch';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import rendercolor from '@/utils/rendercor';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import Dia from '@/components/Dia';
import AddMission from '@/components/AddMission';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import Missiondetail from '@/components/Missiondetail';

const { TabPane } = Tabs;

//ref穿透
let GetTaskList = (props: any) => {
  let { proj, model, miss, dispatch, loading, requireId } = props,
    projectId = model.postdata.projectId, //props projectid
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      title: '',
      key: '',
    }),
    [post, cpost] = useState({
      posturl: 'proj/queryByRequireId',
      postdata: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        requireId: requireId,
      },
    });

  let columns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      key: 'taskNo',
      ellipsis: true,
      width: 120,
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
      ellipsis: true,
      width: 120,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      ellipsis: true,
      width: 200,
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'miss/MisquerytaskDetails',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
                    title: `[${record.taskNo}]` + text,
                    key: 'detail',
                    fullScreen: true,
                  });
                },
              );
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '分配人',
      dataIndex: 'beforeUserName',
      key: 'beforeUserName',
      width: 120,
    },
    {
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      width: 120,
    },
    {
      title: '预计时长',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
      width: 120,
    },
    {
      title: '消耗时长',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
      width: 120,
    },
    {
      title: '截止日期',
      dataIndex: 'devStageEndDate',
      key: 'devStageEndDate',
      width: 120,
      render(text: any, record: any) {
        return (
          <span
            style={{
              color: record.ifDelay == 1 ? '#666' : '#fff',
              backgroundColor: record.ifDelay == 1 ? 'transparent' : '#e84e0f',
              padding: '0 8px',
            }}
          >
            {text && moment(parseInt(text)).format('YYYY-MM-DD')}
          </span>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
      width: 120,
      render: (text: any) => (
        <span style={{ color: rendercolor('Missionstatus', text) }}>
          {text}
        </span>
      ),
    },
  ];

  //postdata changes callback
  useMemo(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post.postdata]);

  useMemo(() => {
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          requireId,
        },
      };
    });
  }, [requireId]);

  function pageChange(page: any, pageSize: any, postdata: string) {
    cpost(() => {
      return {
        ...post,
        [postdata]: {
          ...post[postdata],
          pageIndex: page,
          pageSize,
        },
      };
    });
  }

  function hides(key: any) {
    ciftype(() => {
      return {
        ...iftype,
        visible: key,
        fullScreen: false,
      };
    });
  }

  let {
    beDevelop,
    beTest,
    surplus,
    beCheck,
    estimate,
    developing,
    closed,
    consume,
    completed,
    count,
  } = proj.queryByRequireId?.data?.data;

  return (
    <div>
      <Dia
        fullScreen={iftype.fullScreen}
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
          hides(key);
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        {iftype.visible && (
          <Missiondetail
            showOther={() => {
              setNewState(
                dispatch,
                'miss/ProjqueryById',
                { id: miss.MisquerytaskDetails.data.data.info.projectId },
                (res: any) => {
                  Modal.info({
                    style: { top: 20 },
                    zIndex: 66,
                    width: 1200,
                    maskClosable: true,
                    title: miss.MisquerytaskDetails.data.data.info.projectName,
                    content: (
                      <Projectdetail
                        showProduct={() => {
                          setNewState(
                            dispatch,
                            'miss/ProdqueryInfo',
                            { id: res.data.data.productId },
                            (result: any) => {
                              Modal.info({
                                style: { top: 20 },
                                zIndex: 66,
                                width: 1200,
                                maskClosable: true,
                                title: res.data.data.productName,
                                content: (
                                  <Productdetail maindata={result.data.data} />
                                ),
                                okText: '晓得了',
                              });
                            },
                          );
                        }}
                        maindata={res.data.data}
                      />
                    ),
                    okText: '晓得了',
                  });
                },
              );
            }}
            maindata={miss.MisquerytaskDetails.data.data}
          ></Missiondetail>
        )}
      </Dia>
      <p style={{ padding: 8, backgroundColor: '#f0f0f0', marginBottom: 8 }}>
        共 {count} 个任务,待开发 {beDevelop} 个，开发中 {developing} 个，待测试{' '}
        {beTest} 个，已完成 {completed} 个，待验收 {beCheck} 个，已关闭 {closed}{' '}
        个,总预计 {estimate} 小时，已消耗 {consume} 小时，剩余 {surplus} 小时。
      </p>
      <AutoTable
        data={proj.queryByRequireId}
        columns={columns}
        loading={loading.effects[post.posturl]}
        pageChange={(page: any, pageSize: any) =>
          pageChange(page, pageSize, 'postdata')
        }
        scroll={{ y: '65vh' }}
      />
    </div>
  );
};

export default connect(({ proj, miss, model, loading }: any) => ({
  proj,
  miss,
  model,
  loading,
}))(GetTaskList);
