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
  Input,
  message,
  List,
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
import GroupIcon from '@material-ui/icons/Group';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import BugReportIcon from '@material-ui/icons/BugReport';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import styles from '../style.less';

let MissionChilds = React.forwardRef((props: any, ref: any) => {
  let { miss, dispatch, loading, model, ifJump } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'miss/querytaskMy',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        priorityType: '', //--------------------------优先级
        taskName: '', //--------------------任务名称
        beforeUserName: '', //---------------分配人名称
        projectId: '', //---------------项目id *
        status: '',
        ifJump: ifJump, //----------------------------状态        下拉框(所有)
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
    [fields, cf] = useState(defaultfields);

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
      width: 120,
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
      width: 120,
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
      width: 200,
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
      width: 120,
      ...getColumnSearchProps('beforeUserName', post.postdata, handleSearch),
    },
    {
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 102,
      },
      width: 120,
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
      title: '开始时间',
      width: 160,
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
      width: 120,
      sorter: {
        multiple: 98,
      },
    },
    {
      title: '消耗时长',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
      width: 120,
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
      width: 120,
      ...getColumnSelectProps(
        'status',
        miss.queryTaskStatusSelectList &&
          miss.queryTaskStatusSelectList.filter(item => {
            return !(item.dicKey == 7 || item.dicKey == 8);
          }),
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
      width: 220,
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

  function renderAction(record: any) {
    return (
      <div>
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
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认关闭任务：' + record.taskName + '？'}
          onConfirm={() => {
            setNewState(dispatch, 'miss/Misclose', { id: record.id }, () => {
              message.success('关闭任务：' + record.taskName + '成功！');
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
          <IconButton
            disabled={record.status == 7 || record.status == 8}
            aria-label="delete"
          >
            <Tooltip title="关闭">
              <HighlightOffIcon
                color={
                  record.status == 7 || record.status == 8 ? 'action' : 'error'
                }
              />
            </Tooltip>
          </IconButton>
        </Popconfirm>
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
              <AddCircleOutlineIcon style={{ fontSize: 22 }} color="primary" />
              <span style={{ fontSize: 14, color: '#1183fb', paddingLeft: 6 }}>
                新增
              </span>
            </div>
          </IconButton>
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
                    zIndex: 999999,
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
                                zIndex: 999999,
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
                    message.success('修改成功');
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
                    message.success('完成开发');
                    hides(false);
                  });
                  return;
                }
                if (iftype.key == 'test') {
                  setNewState(dispatch, 'miss/Mistest', newfields, () => {
                    resetdata(null);
                    message.success('完成开发');
                    hides(false);
                  });
                  return;
                }
                if (iftype.key == 'check') {
                  setNewState(dispatch, 'miss/Mischeck', newfields, () => {
                    resetdata(null);
                    message.success('完成开发');
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
                props.loading.effects['model/Mischeck'] || !iftype.visible
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
        data={miss.querytaskMy}
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
)(MissionChilds);
