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

import rendercolor from '@/utils/rendercor';

import Dia from '@/components/Dia';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import Missiondetail from '@/components/Missiondetail';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InitForm from '@/components/InitForm';

const { TabPane } = Tabs;

//ref穿透
let GetTaskList = (props: any) => {
  let {
      proj,
      model,
      miss,
      dispatch,
      loading,
      requireId,
      resetData,
      noaction,
    } = props,
    projectId = model.postdata.projectId, //props projectid
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      title: '',
      key: '',
    }),
    defaultfields: any = {},
    [fields, cf] = useState(defaultfields),
    [post, cpost] = useState({
      posturl: 'proj/queryByRequireId',
      postdata: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        requireId: requireId,
      },
    });

  let action = noaction
    ? []
    : [
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 120,
          render: (text: any, record: any) => renderAction(record),
        },
      ];

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
    ...action,
  ];

  function renderAction(record: any) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <IconButton
          style={{ borderRadius: 0 }}
          disabled={record.status != 1}
          onClick={() => {
            let defaultfieldes: any = {
              projectId: {
                value: model.postdata.projectId, //初始化值
                type: 'select', //类型
                title: '所属项目', //placeholder
                name: ['projectId'], //唯一标识
                required: true, //必填？
                disabled: true,
                options: model.ProjquerySelectList && model.ProjquerySelectList,
              },
              requireId: {
                value: record.requireId, //初始化值
                type: 'select', //类型
                title: '相关需求', //placeholder
                name: ['requireId'], //唯一标识
                required: true, //必填？
                // disabled: true,
                // hides: !dicKey,
                options:
                  miss.querySelectByProjectId && miss.querySelectByProjectId,
              },
              taskName: {
                value: record.taskName, //初始化值
                type: 'input', //类型
                title: '任务名称', //placeholder
                name: ['taskName'], //唯一标识
                required: true, //必填？
              },
              taskType: {
                value: record.taskType, //初始化值
                type: 'select', //类型
                title: '任务类型', //placeholder
                name: ['taskType'], //唯一标识
                required: true, //必填？
                options:
                  model.queryTaskTypeSelectList &&
                  model.queryTaskTypeSelectList,
              },
              taskDescription: {
                value: record.taskDescription, //初始化值
                type: 'editor',
                title: '任务描述',
                name: ['taskDescription'],
                required: false,
                rows: 6,
                col: { span: 24 },
              },
              priorityType: {
                value: record.priorityType, //初始化值
                type: 'select', //类型
                title: '优先级', //placeholder
                name: ['priorityType'], //唯一标识
                required: true, //必填？
                options: model.Bugpriority && model.Bugpriority, //buglist
              },
              currentUserId: {
                value: record.devUserId, //初始化值
                type: 'select', //类型
                title: '指派给', //placeholder
                name: ['currentUserId'], //唯一标识
                required: true, //必填？
                options:
                  model.querySelectListByProjectId &&
                  model.querySelectListByProjectId,
              },
              devStageEndDate: {
                value: moment(parseInt(record.devStageEndDate)), //初始化值
                type: 'datepicker',
                title: '截止日期',
                name: ['devStageEndDate'],
                required: true,
                format: 'YYYY-MM-DD',
                disabledDate: (current: any) => {
                  return (
                    current &&
                    current <
                      moment()
                        .add('day', -1)
                        .endOf('day')
                  );
                },
              },
              devStagePlanHours: {
                value: record.devStagePlanHours, //初始化值
                type: 'inputnumber',
                title: '预计时长',
                min: 1,
                name: ['devStagePlanHours'],
                required: true,
              },
              attachmentList: {
                value: record.attachmentList
                  ? mockfile(record.attachmentList)
                  : [], //初始化值
                type: 'upload',
                title: '附件',
                name: ['attachmentList'],
                required: false,
                col: { span: 24 },
              },
            };
            cf(defaultfieldes);
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '修改' + record.taskName,
                key: 'edit',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <EditIcon color={record.status != 1 ? 'action' : 'primary'} />
          </div>
        </IconButton>
        <Divider type="vertical"></Divider>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Popconfirm
            overlayStyle={{ zIndex: 9999999999 }}
            okText="确认"
            cancelText="取消"
            placement="bottom"
            title={'确认删除' + record.taskName + '？'}
            onConfirm={() => {
              setNewState(
                dispatch,
                'miss/MisdeleteById',
                { id: record.id },
                () => {
                  message.success('删除' + record.taskName + '成功！');
                  resetData();
                  setNewState(dispatch, post.posturl, post.postdata, () => {
                    hides(false);
                  });
                },
              );
            }}
          >
            <IconButton
              disabled={record.status != 1}
              aria-label="delete"
              style={{ borderRadius: 0 }}
            >
              <DeleteIcon color={record.status != 1 ? 'action' : 'error'} />
            </IconButton>
          </Popconfirm>
        </div>
      </div>
    );
  }

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
    <div style={{ backgroundColor: '#fff' }}>
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
        {iftype.visible ? (
          iftype.key == 'detail' ? (
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
                      title:
                        miss.MisquerytaskDetails.data.data.info.projectName,
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
                                    <Productdetail
                                      maindata={result.data.data}
                                    />
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
          ) : (
            <InitForm
              fields={fields}
              submitData={(values: any) => {
                let newfields = JSON.parse(JSON.stringify(values));
                newfields.id = iftype.curitem.id;
                let newlist = newfields.attachmentList.fileList
                  ? newfields.attachmentList.fileList.map(
                      (items: any, i: number) => {
                        return {
                          attachmentName: items.response
                            ? items.response.data.dataList[0].name
                            : items.name,
                          attachUrl: items.response
                            ? items.response.data.dataList[0].url
                            : items.url,
                        };
                      },
                    )
                  : [];
                newfields.attachmentList = newlist;
                if (iftype.key == 'edit') {
                  newfields.devStageEndDate = moment(
                    newfields.devStageEndDate,
                  ).valueOf();
                  setNewState(dispatch, 'miss/add', newfields, () => {
                    message.success('操作成功');
                    resetData();
                    setNewState(
                      dispatch,
                      post.posturl,
                      post.postdata,
                      () => {},
                    );
                    hides(false);
                  });
                  return;
                }
              }}
              onChange={() => {}}
              submitting={loading.effects['miss/add'] || !iftype.visible}
            ></InitForm>
          )
        ) : null}
      </Dia>

      <p
        style={{
          padding: 8,
          backgroundColor: '#1183fb',
          marginBottom: 8,
          color: '#fff',
        }}
      >
        <span>
          共 {count} 个任务,待开发 {beDevelop} 个，开发中 {developing}{' '}
          个，待测试 {beTest} 个，已完成 {completed} 个，待验收 {beCheck}{' '}
          个，已关闭 {closed} 个,总预计 {estimate} 小时，已消耗 {consume}{' '}
          小时，剩余 {surplus} 小时。
        </span>
        <a
          style={{
            float: 'right',
            marginRight: 12,
            color: '#fff',
            border: '#fff solid 1px',
            padding: '4px 6px',
            marginTop: -5,
          }}
          onClick={() => {
            setNewState(dispatch, 'miss/Misunpack', { id: requireId }, () => {
              resetData();
            });
          }}
        >
          拆包
        </a>
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
