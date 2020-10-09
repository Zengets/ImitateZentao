import React, {
  useEffect,
  useState,
  useMemo,
  useImperativeHandle,
} from 'react';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  message,
  Popconfirm,
  Divider,
  Tooltip,
  Row,
  Col,
  Modal,
  Dropdown,
  Menu,
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
  getColumnRangeminProps,
  getColumnDateProps,
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import rendercolor from '@/utils/rendercor';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Missiondetail from '@/components/Missiondetail';
import AddMission from '@/components/AddMission';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import BugReportIcon from '@material-ui/icons/BugReport';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import styles from '../style.less';
import {
  UnlockOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import mockfile from '@/utils/mockfile';

let MissionChild = React.forwardRef((props: any, ref: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'miss/querytaskAll',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        priorityType: '', //--------------------------优先级
        taskName: '', //--------------------任务名称
        beforeUserName: '', //---------------分配人名称
        currentUserName: '', //------------------责任人名称
        projectId: '', //---------------项目id *
        status: '', //----------------------------状态        下拉框(所有)
        devStageRealStartTimeStart: '', //-----------------开始时间搜索  (到分钟)
        devStageRealStartTimeEnd: '', //-----------------开始时间搜索  (到分钟)
        devStageEndDateStart: '', //-----------------截止日期搜索  (到日)
        devStageEndDateEnd: '', //-----------------截止日期搜索  (到日)
        sortList: [
          //-------------------------------------------------------------------------排序字段
          {
            fieldName: 'taskNo', //-------------------任务编号
            sort: '',
          },
          {
            fieldName: 'priorityType', //----------------------优先级
            sort: '',
          },
          {
            fieldName: 'taskName', //--------------------任务名称
            sort: '',
          },
          {
            fieldName: 'beforeUserId', //---------------分配人人id
            sort: '',
          },
          {
            fieldName: 'currentUserId', //------------------责任人id
            sort: '',
          },
          {
            fieldName: 'devStagePlanHours', //---------------------预计
            sort: '',
          },
          {
            fieldName: 'devStageExpendHours', //--------------------------消耗
            sort: '',
          },
          {
            fieldName: 'devStageRealStartTime', //----------------------------开始时间
            sort: '',
          },
          {
            fieldName: 'devStageEndDate', //----------------------------截止日期
            sort: '',
          },
          {
            fieldName: 'status', //----------------------------状态
            sort: '',
          },
        ],
      },
    }),
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      title: '',
      fv: false,
      key: '',
    }),
    defaultfields: any = {},
    [fields, cf] = useState(defaultfields),
    [vs, cvs] = useState({
      vs: false,
      id: '',
    });

  useEffect(() => {
    setNewState(dispatch, 'miss/queryTaskStatusSelectList', {}, () => {});
  }, []);

  //父级组件项目变化调用
  useMemo(() => {
    if (model.postdata.projectId) {
      let projectId = model.postdata.projectId;
      setNewState(
        dispatch,
        'miss/querySelectListByProjectId',
        { projectId: projectId },
        () => {},
      );
      cpost({
        ...post,
        postdata: {
          ...post.postdata,
          projectId: projectId,
        },
      });
    }
  }, [model.postdata.projectId]);

  let columns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      key: 'taskNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 100,
      ...getColumnSearchProps('taskNo', post.postdata, handleSearch),
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
      sorter: {
        multiple: 21,
      },
      ellipsis: true,
      width: 90,
      ...getColumnSelectProps(
        'priorityType',
        model.Bugpriority,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      ellipsis: true,
      width: 400,
      sorter: {
        multiple: 99,
      },
      ...getColumnSearchProps('taskName', post.postdata, handleSearch),
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
      sorter: {
        multiple: 102,
      },
      width: 100,
      ...getColumnSearchProps('beforeUserName', post.postdata, handleSearch),
    },
    {
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 102,
      },
      width: 100,
      ...getColumnSearchProps('currentUserName', post.postdata, handleSearch),
      render: (text: any, record: any) =>
        record.status == 7 || record.status == 8 ? (
          <span>{text}</span>
        ) : (
          <IconButton
            onClick={() => {
              setNewState(
                dispatch,
                'miss/querySelectListByProjectId',
                { projectId: record.projectId },
                (res: any) => {
                  cf({
                    currentUserId: {
                      value: record.currentUserId, //初始化值
                      type: 'select', //类型
                      title: '指派给', //placeholder
                      name: ['currentUserId'], //唯一标识
                      required: true, //必填？
                      options: res.data.dataList,
                    },
                    devStagePlanHours: {
                      value: record.devStagePlanHours, //初始化值
                      type: 'inputnumber',
                      title: '预计时长',
                      min: 1,
                      name: ['devStagePlanHours'],
                      required: true,
                      hides: !(record.status == 3 || record.status == 4),
                    },
                    remark: {
                      value: '', //初始化值
                      type: 'textarea',
                      title: '备注',
                      name: ['remark'],
                      required: false,
                      rows: 6,
                      col: { span: 24 },
                    },
                  });
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: true,
                      title: `[${record.taskNo}]${record.taskName}`,
                      curitem: record,
                      fullScreen: false,
                      key: 'changecharge',
                    };
                  });
                },
              );
            }}
            className={styles.did}
          >
            <a style={{ marginLeft: 4 }}>{text}</a>
            <div className="hides">
              <TouchAppIcon
                color="primary"
                style={{ fontSize: 20 }}
              ></TouchAppIcon>
            </div>
          </IconButton>
        ),
    },
    {
      title: '开发人',
      dataIndex: 'devUserName',
      key: 'devUserName',
      sorter: {
        multiple: 2,
      },
      width: 100,
      ...getColumnSearchProps('devUserName', post.postdata, handleSearch),
    },
    {
      title: '测试人',
      dataIndex: 'testUserName',
      key: 'testUserName',
      sorter: {
        multiple: 1,
      },
      width: 100,
      ...getColumnSearchProps('testUserName', post.postdata, handleSearch),
    },
    {
      title: ' 验收人',
      dataIndex: 'acceptUserName',
      key: 'acceptUserName',
      sorter: {
        multiple: 37,
      },
      width: 100,
      ...getColumnSearchProps('acceptUserName', post.postdata, handleSearch),
    },

    {
      title: '开始时间',
      width: 120,
      dataIndex: 'devStageRealStartTime',
      key: 'devStageRealStartTime',
      sorter: {
        multiple: 96,
      },
      ...getColumnRangeProps(
        'devStageRealStartTimeStart',
        'devStageRealStartTimeEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any) {
        return (
          <span>
            {text && moment(parseInt(text)).format('YYYY-MM-DD HH:mm')}
          </span>
        );
      },
    },
    {
      title: '预计时长',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
      width: 100,
      sorter: {
        multiple: 98,
      },
    },
    {
      title: '消耗时长',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
      width: 100,
      sorter: {
        multiple: 97,
      },
    },
    {
      title: '截止日期',
      dataIndex: 'devStageEndDate',
      key: 'devStageEndDate',
      width: 120,
      sorter: {
        multiple: 95,
      },
      ...getColumnRangeProps(
        'devStageEndDateStart',
        'devStageEndDateEnd',
        post.postdata,
        handleSearch,
      ),
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
      sorter: {
        multiple: 94,
      },
      width: 80,
      ...getColumnSelectProps(
        'status',
        miss.queryTaskStatusSelectList && miss.queryTaskStatusSelectList,
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <span style={{ color: rendercolor('Missionstatus', text) }}>
          {text}
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 260,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function resetdata(fn: any) {
    if (projectId) {
      setNewState(dispatch, post.posturl, post.postdata, (res: any) => {
        cf(defaultfields);
        fn ? fn(res) : null;
      });
    }
  }

  const menus = (record: any) => (
    <Menu
      onClick={e => {
        cvs({
          ...vs,
          vs: e.key == '2',
        });
      }}
    >
      <Menu.Item key="1">
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
              taskName: {
                value: record.taskName, //初始化值
                type: 'input', //类型
                title: '任务名称', //placeholder
                name: ['taskName'], //唯一标识
                required: true, //必填？
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
            <span
              style={{
                fontSize: 16,
                paddingLeft: 4,
                color: record.status != 1 ? '#333' : '#1183fb',
              }}
            >
              编辑
            </span>
          </div>
        </IconButton>
      </Menu.Item>
      <Menu.Item key="2">
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
              <span
                style={{
                  fontSize: 16,
                  paddingLeft: 4,
                  color: record.status != 1 ? '#333' : 'red',
                  marginTop: 4,
                }}
              >
                删除
              </span>
            </IconButton>
          </Popconfirm>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <IconButton
          disabled={record.status == 7 || record.status == 8}
          aria-label="delete"
          style={{ borderRadius: 0 }}
          onClick={() => {
            cf({
              closeDescription: {
                value: '', //初始化值
                type: 'textarea',
                title: '关闭原因',
                name: ['closeDescription'],
                required: false,
                col: { span: 24 },
              },
            });
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: `确认关闭任务：${record.taskName}？`,
                curitem: record,
                key: 'close',
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
            <HighlightOffIcon
              color={
                record.status == 7 || record.status == 8 ? 'action' : 'error'
              }
            />
            <span style={{ fontSize: 16, paddingLeft: 4, color: 'red' }}>
              关闭
            </span>
          </div>
        </IconButton>
      </Menu.Item>
    </Menu>
  );

  function renderAction(record: any) {
    return (
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
          title={'确认激活:' + record.taskName + '？激活后将无法编辑/删除'}
          onConfirm={() => {
            setNewState(dispatch, 'miss/Misactive', { id: record.id }, () => {
              message.success('激活:' + record.taskName + '成功！');
              resetdata((res: any) => {
                setNewState(
                  dispatch,
                  'miss/MisquerytaskDetails',
                  { id: record.id },
                  () => {},
                );
                let result = res.data.page.list;
                ciftype({
                  ...iftype,
                  curitem: result.filter((items: any) => {
                    return items.id == record.id;
                  })[0],
                });
              });
            });
          }}
        >
          <IconButton disabled={record.status != 1}>
            <Tooltip title="激活">
              <UnlockOutlined
                style={{
                  color: record.status != 1 ? '#999' : '#1183fb',
                  fontSize: 18,
                }}
              />
            </Tooltip>
          </IconButton>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认开始开发:' + record.taskName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'miss/MisdevelopStart',
              { id: record.id },
              () => {
                message.success('开始开发:' + record.taskName + '成功！');
                resetdata((res: any) => {
                  setNewState(
                    dispatch,
                    'miss/MisquerytaskDetails',
                    { id: record.id },
                    () => {},
                  );
                  let result = res.data.page.list;
                  ciftype({
                    ...iftype,
                    curitem: result.filter((items: any) => {
                      return items.id == record.id;
                    })[0],
                  });
                });
              },
            );
          }}
        >
          <Tooltip title="开始开发">
            <IconButton disabled={record.status != 3} aria-label="delete">
              <PlayCircleFilledIcon
                color={record.status != 3 ? 'action' : 'primary'}
              />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status != 4}
          aria-label="delete"
          onClick={() => {
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  currentUserId: {
                    value: '', //初始化值
                    type: 'select', //类型
                    title: '指派给', //placeholder
                    name: ['currentUserId'], //唯一标识
                    required: true, //必填？
                    options: res.data.dataList,
                  },
                  realFinishTime: {
                    value: '', //初始化值
                    type: 'datepicker',
                    title: '完成时间',
                    name: ['realFinishTime'],
                    showTime: { format: 'HH:mm' },
                    format: 'YYYY-MM-DD HH:mm',
                    required: true,
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
                  devStageExpendHours: {
                    value: '', //初始化值
                    type: 'inputnumber',
                    title: '消耗时长',
                    min: 1,
                    name: ['devStageExpendHours'],
                    required: true,
                  },
                  devStageFinishDescription: {
                    value: '<p></p>', //初始化值
                    type: 'editor',
                    title: '开发描述',
                    name: ['devStageFinishDescription'],
                    required: false,
                    rows: 6,
                    col: { span: 24 },
                  },
                  attachmentList: {
                    value: [], //初始化值
                    type: 'upload',
                    title: '附件',
                    name: ['attachmentList'],
                    required: false,
                    col: { span: 24 },
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '完成开发',
                    curitem: record,
                    fullScreen: false,
                    key: 'finishdev',
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="完成开发">
            <CheckCircleIcon
              color={record.status != 4 ? 'action' : 'error'}
              style={{ fontSize: 23 }}
            />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>
        <IconButton
          aria-label="delete"
          disabled={record.status != 5}
          onClick={() => {
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  testStageResult: {
                    value: '', //初始化值
                    type: 'radio',
                    title: '测试结果',
                    name: ['testStageResult'],
                    required: true,
                    options: [
                      {
                        dicName: '通过',
                        dicKey: '1',
                      },
                      {
                        dicName: '不通过',
                        dicKey: '2',
                      },
                    ],
                    col: { span: 24 },
                  },
                  currentUserId: {
                    value: '', //初始化值
                    type: 'select', //类型
                    title: '指派给', //placeholder
                    name: ['currentUserId'], //唯一标识
                    required: true, //必填？
                    options: res.data.dataList,
                  },
                  testStageDescription: {
                    value: '<p></p>', //初始化值
                    type: 'editor',
                    title: '测试描述',
                    name: ['testStageDescription'],
                    required: false,
                    rows: 6,
                    col: { span: 24 },
                  },
                  attachmentList: {
                    value: [], //初始化值
                    type: 'upload',
                    title: '附件',
                    name: ['attachmentList'],
                    required: false,
                    col: { span: 24 },
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '测试信息',
                    curitem: record,
                    key: 'test',
                    fullScreen: false,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="测试">
            <BugReportIcon
              color={record.status != 5 ? 'action' : 'primary'}
              style={{ fontSize: 24 }}
            />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status != 6}
          aria-label="delete"
          onClick={() => {
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  acceptStageResult: {
                    value: '', //初始化值
                    type: 'radio',
                    title: '验收结果',
                    name: ['acceptStageResult'],
                    required: true,
                    options: [
                      {
                        dicName: '通过',
                        dicKey: '1',
                      },
                      {
                        dicName: '不通过',
                        dicKey: '2',
                      },
                    ],
                    col: { span: 24 },
                  },
                  currentUserId: {
                    value: '', //初始化值
                    type: 'select', //类型
                    title: '指派给', //placeholder
                    name: ['currentUserId'], //唯一标识
                    required: true, //必填？
                    hides: true,
                    options: res.data.dataList,
                  },
                  acceptStageDescription: {
                    value: '<p></p>', //初始化值
                    type: 'editor',
                    title: '验收描述',
                    name: ['acceptStageDescription'],
                    required: false,
                    rows: 6,
                    col: { span: 24 },
                  },
                  attachmentList: {
                    value: [], //初始化值
                    type: 'upload',
                    title: '附件',
                    name: ['attachmentList'],
                    required: false,
                    col: { span: 24 },
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '验收信息',
                    curitem: record,
                    key: 'check',
                    fullScreen: false,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="验收">
            <DoneAllIcon
              color={record.status != 6 ? 'action' : 'primary'}
              style={{ fontSize: 24 }}
            />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>
        <Dropdown
          overlay={menus(record)}
          visible={vs.vs && vs.id == record.id}
          onVisibleChange={(flag: any) =>
            cvs({
              id: record.id,
              vs: flag,
            })
          }
        >
          <div
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <EllipsisOutlined style={{ fontSize: 24, color: 'red' }} />
          </div>
        </Dropdown>
      </div>
    );
  }

  function handleSearch(value: any, dataIndex: any, dataIndexs: any) {
    if (dataIndexs) {
      cpost(() => {
        return {
          ...post,
          postdata: {
            ...post.postdata,
            [dataIndex]: value && value[0],
            [dataIndexs]: value && value[1],
          },
        };
      });
    } else {
      cpost(() => {
        return {
          ...post,
          postdata: {
            ...post.postdata,
            [dataIndex]: value,
          },
        };
      });
    }
  }

  let handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let newsorter = [];
    if (!Array.isArray(sorter)) {
      newsorter.push(sorter);
    } else {
      newsorter = sorter;
    }
    let sortList = newsorter.map((item: any, i: number) => {
      return {
        fieldName: item.columnKey,
        sort:
          item.order == 'descend' ? false : item.order == 'ascend' ? true : '',
      };
    });
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          sortList,
        },
      };
    });
  };

  useMemo(() => {
    if (!post.postdata.projectId) {
      return;
    }
    setNewState(dispatch, post.posturl, post.postdata, () => {
      cf(defaultfields);
    });
  }, [post]);

  let pageChange = (page: any, pageSize: any) => {
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          pageIndex: page,
          pageSize,
        },
      };
    });
  };

  function hides(key: any) {
    ciftype(() => {
      return {
        ...iftype,
        visible: key,
        fullScreen: false,
      };
    });
  }

  useImperativeHandle(ref, () => {
    return {
      renderAdd() {
        return (
          <div>
            <IconButton
              style={{ padding: 8, borderRadius: 4 }}
              onClick={() => {
                ciftype({
                  ...iftype,
                  fv: true,
                  title: '新增任务',
                });
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
                <AddCircleOutlineIcon
                  style={{ fontSize: 22 }}
                  color="primary"
                />
                <span
                  style={{ fontSize: 14, color: '#1183fb', paddingLeft: 6 }}
                >
                  新增
                </span>
              </div>
            </IconButton>
            <Divider type="vertical"></Divider>

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
                  `/zentao/umTask/exportFile?${bodyparse(post.postdata)}`,
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
          </div>
        );
      },
    };
  });

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
        {iftype.key == 'detail' ? (
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
            renderAction={() => renderAction(iftype.curitem)}
            maindata={miss.MisquerytaskDetails.data.data}
          ></Missiondetail>
        ) : (
          iftype.visible && (
            <InitForm
              fields={fields}
              submitData={(values: any) => {
                let newfields = JSON.parse(JSON.stringify(values));
                newfields.id = iftype.curitem.id;
                if (iftype.key == 'changecharge') {
                  setNewState(dispatch, 'miss/Misassign', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }

                if (iftype.key == 'close') {
                  setNewState(dispatch, 'miss/Misclose', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }

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
                if (iftype.key == 'finishdev') {
                  let res = moment(newfields.realFinishTime)
                    .startOf('minute')
                    .valueOf();
                  newfields.realFinishTime = newfields.realFinishTime
                    ? res
                    : '';
                  setNewState(dispatch, 'miss/MisdevelopEnd', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }
                if (iftype.key == 'test') {
                  setNewState(dispatch, 'miss/Mistest', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }
                if (iftype.key == 'check') {
                  setNewState(dispatch, 'miss/Mischeck', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }
                if (iftype.key == 'edit') {
                  newfields.devStageEndDate = moment(
                    newfields.devStageEndDate,
                  ).valueOf();
                  setNewState(dispatch, 'miss/add', newfields, () => {
                    resetdata(null);
                    message.success('操作成功');
                    hides(false);
                  });
                  return;
                }
              }}
              onChange={(newFields: any) => {
                if (!newFields) {
                  return;
                }
                let name = newFields ? newFields.name : '',
                  value = newFields.value;
                let key = name ? name[0] : '';
                if (key == 'testStageResult') {
                  cf(() => {
                    fields[key].value = value;
                    return {
                      ...fields,
                      currentUserId: {
                        ...fields.currentUserId,
                        value: value == 2 ? iftype.curitem.devUserId : '',
                        disabled: value == 2,
                      },
                    };
                  });
                }
                if (key == 'acceptStageResult') {
                  cf(() => {
                    fields[key].value = value;
                    return {
                      ...fields,
                      currentUserId: {
                        ...fields.currentUserId,
                        hides: value != 2,
                      },
                    };
                  });
                } else {
                }
              }}
              submitting={
                loading.effects['miss/Misassign'] ||
                loading.effects['miss/MisdevelopEnd'] ||
                loading.effects['miss/Mistest'] ||
                loading.effects['miss/Mischeck'] ||
                !iftype.visible
              }
            ></InitForm>
          )
        )}
      </Dia>
      <AddMission
        address="miss/add"
        iftype={iftype}
        cancel={(val: any) => {
          ciftype({
            ...iftype,
            fv: false,
            visible: false,
          });
          if (val) {
            resetdata(null);
          }
        }}
      ></AddMission>
      <AutoTable
        data={miss.querytaskAll}
        columns={columns}
        loading={loading.effects[post.posturl]}
        pageChange={pageChange}
        onChange={handleTableChange}
        scroll={{ y: '65vh' }}
      />
    </div>
  );
});

export default connect(
  ({ miss, model, loading }: any) => ({
    miss,
    model,
    loading,
  }),
  null,
  null,
  { forwardRef: true },
)(MissionChild);
