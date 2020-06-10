import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
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
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AutoTable from '@/components/AutoTable';
import {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnRangeProps,
  getColumnRangeminProps,
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import mockfile from '@/utils/mockfile';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import GroupIcon from '@material-ui/icons/Group';
import rendercolor from '@/utils/rendercor';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import BugReportIcon from '@material-ui/icons/BugReport';
import Missiondetail from '@/components/Missiondetail';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneAllIcon from '@material-ui/icons/DoneAll';

let FourthChildA = ({ dispatch, home, model, loading, miss }: any) => {
  let [dataList, cdata] = useState([]),
    [post, cpost] = useState({
      posturl: 'home/IndexFifth',
      postdata: {
        taskNo: '', //任务编号
        taskName: '', //任务名
        currentUserId: '', //当前负责人id
        deadDateStart: '', //截止起日期
        deadDateEnd: '', //截止止日期
        projectId: '', //所属项目id
        sortList: [
          //排序字段
          {
            fieldName: 'taskNo', //任务编号
            sort: '',
          },
          {
            fieldName: 'taskName', //任务名
            sort: '',
          },
          {
            fieldName: 'currentUserName', //当前负责人名
            sort: '',
          },
          {
            fieldName: 'deadDate', //截止日期
            sort: '',
          },
          {
            fieldName: 'projectName', //所属项目名
            sort: '',
          },
        ],
      },
    }),
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      resdata: {},
      title: '',
      key: '',
    }),
    defaultfields: any = {
      taskName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '任务名称', //placeholder
        name: ['taskName'], //唯一标识
        required: true, //必填？
      },
      projectId: {
        value: null, //初始化值
        type: 'select', //类型
        title: '所属项目', //placeholder
        name: ['projectId'], //唯一标识
        required: true, //必填？
        disabled: true,
        options: model.ProjquerySelectList && model.ProjquerySelectList,
      },
      taskDescription: {
        value: '', //初始化值
        type: 'textarea',
        title: '任务描述',
        name: ['taskDescription'],
        required: false,
        rows: 6,
        col: { span: 24 },
      },
      requireDesctription: {
        value: '', //初始化值
        type: 'textarea',
        title: '需求描述',
        name: ['requireDesctription'],
        required: true,
        rows: 6,
        col: { span: 24 },
      },
      currentUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '指派给', //placeholder
        name: ['currentUserId'], //唯一标识
        required: true, //必填？
        options:
          miss.querySelectListByProjectId && miss.querySelectListByProjectId,
      },
      deadDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '截止日期',
        name: ['deadDate'],
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
      devStagePlanHours: {
        value: '', //初始化值
        type: 'inputnumber',
        title: '预计时长',
        name: ['devStagePlanHours'],
        required: true,
      },
      devStageStartDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '开始日期',
        name: ['devStageStartDate'],
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
      devStageEndDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '截止日期',
        name: ['devStageEndDate'],
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
      techDesctription: {
        value: '', //初始化值
        type: 'textarea',
        title: '技术描述',
        name: ['techDesctription'],
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
    },
    [fields, cf] = useState(defaultfields);

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, (res: any) => {
      cdata(res.data.dataList);
    });
    setNewState(dispatch, 'home/queryTaskStatusSelectList', {}, () => {});
  }, []);

  let columns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      key: 'taskNo',
      sorter: {
        multiple: 100,
      },
      width: 110,
      ...getColumnSearchProps('taskNo', post.postdata, handleSearch),
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      ellipsis: true,
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
                'home/MisquerytaskDetails',
                { id: record.id },
                (res: any) => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
                    resdata: res.data.data,
                    title: text + '详情',
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
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: {
        multiple: 101,
      },
      ellipsis: true,
      width: 240,
      ...getColumnSelectProps(
        'projectId',
        model.ProjquerySelectList && model.ProjquerySelectList,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 102,
      },
      width: 120,
      ...getColumnSelectProps(
        'currentUserId',
        model.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '截止日期',
      dataIndex: 'deadDate',
      key: 'deadDate',
      sorter: {
        multiple: 95,
      },
      width: 120,
      ...getColumnRangeProps(
        'deadDateStart',
        'deadDateEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any) {
        return (
          <span
            style={{
              color:
                moment()
                  .startOf('day')
                  .valueOf() > moment(parseInt(text)).valueOf()
                  ? 'red'
                  : 'green',
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
        home.IndexThird.data.statusList && home.IndexThird.data.statusList,
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <span style={{ color: rendercolor('Missionstatus', text) }}>
          {text}
        </span>
      ),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <Tooltip title="激活">
          <IconButton
            disabled={record.status != 1}
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
                      col: { span: 24 },
                      options: res.data.dataList && res.data.dataList,
                    },
                  });
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: true,
                      title: '激活任务:' + record.taskName + ',并选择指派人',
                      key: 'jihuo',
                      curitem: record,
                      fullScreen: false,
                    };
                  });
                },
              );
            }}
          >
            <PlayCircleOutlineIcon
              color={record.status != 1 ? 'action' : 'primary'}
            />
          </IconButton>
        </Tooltip>

        <Divider type="vertical"></Divider>

        <IconButton
          disabled={record.status != 2}
          onClick={() => {
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  currentUserId: {
                    ...fields.currentUserId,
                    options: res.data.dataList,
                  },
                  devStagePlanHours: {
                    ...fields.devStagePlanHours,
                    value: null, //初始化值
                  },
                  devStageStartDate: {
                    ...fields.devStageStartDate,
                    value: undefined, //初始化值
                  },
                  devStageEndDate: {
                    ...fields.devStageEndDate,
                    value: undefined, //初始化值
                  },
                  techDesctription: {
                    ...fields.techDesctription,
                    value: null, //初始化值
                  },
                  attachmentList: {
                    ...fields.attachmentList,
                    value: [], //初始化值
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '分配任务:' + record.taskName,
                    key: 'assgin',
                    curitem: record,
                    fullScreen: false,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="分配">
            <GroupIcon
              color={record.status != 2 ? 'action' : 'primary'}
              style={{ fontSize: 26 }}
            />
          </Tooltip>
        </IconButton>
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
                setNewState(
                  dispatch,
                  post.posturl,
                  post.postdata,
                  (res: any) => {
                    cdata(res.data.dataList);
                    hides(false);
                  },
                );
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
            cf({
              currentUserId: {
                value: '', //初始化值
                type: 'select', //类型
                title: '指派给', //placeholder
                name: ['currentUserId'], //唯一标识
                required: true, //必填？
                options:
                  miss.querySelectListByProjectId &&
                  miss.querySelectListByProjectId,
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
                value: '', //初始化值
                type: 'textarea',
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
          }}
        >
          <Tooltip title="完成开发">
            <PowerSettingsNewIcon
              color={record.status != 4 ? 'action' : 'error'}
            />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>
        <IconButton
          aria-label="delete"
          disabled={record.status != 5}
          onClick={() => {
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
                options:
                  miss.querySelectListByProjectId &&
                  miss.querySelectListByProjectId,
              },
              testStageDescription: {
                value: '', //初始化值
                type: 'textarea',
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
                options:
                  miss.querySelectListByProjectId &&
                  miss.querySelectListByProjectId,
              },
              acceptStageDescription: {
                value: '', //初始化值
                type: 'textarea',
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
        <IconButton
          disabled={record.status != 1}
          onClick={() => {
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  taskName: {
                    ...fields.taskName,
                    value: record.taskName, //初始化值
                  },
                  projectId: {
                    ...fields.projectId,
                    value: record.projectId, //初始化值
                  },
                  taskDescription: {
                    ...fields.taskDescription,
                    value: record.taskDescription, //初始化值
                  },
                  requireDesctription: {
                    ...fields.requireDesctription,
                    value: record.requireDesctription, //初始化值
                  },
                  currentUserId: {
                    ...fields.currentUserId,
                    value: record.currentUserId, //初始化值
                    options: res.data.dataList,
                  },
                  deadDate: {
                    ...fields.deadDate,
                    value: record.deadDate
                      ? moment(parseInt(record.deadDate))
                      : undefined, //初始化值
                  },
                  attachmentList: {
                    ...fields.attachmentList,
                    value: record.attachmentList
                      ? mockfile(record.attachmentList)
                      : [], //初始化值
                  },
                });
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
              },
            );
          }}
        >
          <Tooltip title="编辑">
            <EditIcon color={record.status != 1 ? 'action' : 'primary'} />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>

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
                setNewState(
                  dispatch,
                  post.posturl,
                  post.postdata,
                  (res: any) => {
                    cdata(res.data.dataList);
                    hides(false);
                  },
                );
              },
            );
          }}
        >
          <Tooltip title="删除">
            <IconButton disabled={record.status != 1} aria-label="delete">
              <DeleteIcon color={record.status != 1 ? 'action' : 'error'} />
            </IconButton>
          </Tooltip>
        </Popconfirm>
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
              setNewState(dispatch, post.posturl, post.postdata, (res: any) => {
                cdata(res.data.dataList);
                hides(false);
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
    setNewState(dispatch, post.posturl, post.postdata, (res: any) => {
      cdata(res.data.dataList);
    });
  }, [post]);

  function hides(key: any) {
    ciftype(() => {
      return {
        ...iftype,
        visible: key,
        fullScreen: false,
      };
    });
    setTimeout(() => {
      cf(defaultfields);
    }, 200);
  }
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
                { id: iftype.resdata.info.projectId },
                (res: any) => {
                  Modal.info({
                    style: { top: 20 },
                    zIndex: 999999,
                    width: 800,
                    maskClosable: true,
                    title: iftype.resdata.info.projectName,
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
                                width: 800,
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
            maindata={iftype.resdata}
            renderAction={() => renderAction(iftype.curitem)}
          ></Missiondetail>
        ) : (
          <InitForm
            fields={fields}
            submitData={() => {
              let newfields = JSON.parse(JSON.stringify(fields));
              for (let i in newfields) {
                newfields[i] = newfields[i].value;
              }

              newfields.id = iftype.curitem.id;

              if (iftype.key == 'jihuo') {
                setNewState(
                  dispatch,
                  'miss/Misactivation',
                  {
                    id: iftype.curitem.id,
                    currentUserId: newfields.currentUserId,
                  },
                  () => {
                    hides(false);
                    setNewState(
                      dispatch,
                      post.posturl,
                      post.postdata,
                      (res: any) => {
                        cdata(res.data.dataList);
                        message.success('激活成功！');
                      },
                    );
                  },
                );
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

              if (iftype.key == 'assgin') {
                newfields.devStageStartDate = newfields.devStageStartDate
                  ? moment(newfields.devStageStartDate)
                      .startOf('day')
                      .valueOf()
                  : '';
                newfields.devStageEndDate = newfields.devStageEndDate
                  ? moment(newfields.devStageEndDate)
                      .startOf('day')
                      .valueOf()
                  : '';
                setNewState(dispatch, 'miss/Misassign', newfields, () => {
                  setNewState(
                    dispatch,
                    post.posturl,
                    post.postdata,
                    (res: any) => {
                      cdata(res.data.dataList);
                      message.success('分配成功');
                      hides(false);
                    },
                  );
                });
                return;
              }
              if (iftype.key == 'finishdev') {
                let res = moment(newfields.realFinishTime)
                  .startOf('minute')
                  .valueOf();
                newfields.realFinishTime = newfields.realFinishTime ? res : '';
                setNewState(dispatch, 'miss/MisdevelopEnd', newfields, () => {
                  setNewState(
                    dispatch,
                    post.posturl,
                    post.postdata,
                    (res: any) => {
                      cdata(res.data.dataList);
                      message.success('已经完成开发');
                      hides(false);
                    },
                  );
                });
                return;
              }
              if (iftype.key == 'test') {
                setNewState(dispatch, 'miss/Mistest', newfields, () => {
                  setNewState(
                    dispatch,
                    post.posturl,
                    post.postdata,
                    (res: any) => {
                      cdata(res.data.dataList);
                      message.success('操作成功');
                      hides(false);
                    },
                  );
                });
                return;
              }
              if (iftype.key == 'check') {
                setNewState(dispatch, 'miss/Mischeck', newfields, () => {
                  setNewState(
                    dispatch,
                    post.posturl,
                    post.postdata,
                    (res: any) => {
                      cdata(res.data.dataList);
                      message.success('操作成功');
                      hides(false);
                    },
                  );
                });
                return;
              }

              newfields.deadDate = moment(newfields.deadDate)
                .startOf('day')
                .valueOf();

              setNewState(dispatch, 'miss/Missave', newfields, () => {
                setNewState(
                  dispatch,
                  post.posturl,
                  post.postdata,
                  (res: any) => {
                    cdata(res.data.dataList);
                    message.success('修改成功');
                    hides(false);
                  },
                );
              });
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
              } else if (key == 'acceptStageResult') {
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
                cf(() => {
                  fields[key].value = value;
                  return {
                    ...fields,
                  };
                });
              }
            }}
            submitting={loading.effects['model/Mischeck']}
          ></InitForm>
        )}
      </Dia>

      <AutoTable
        data={{ list: dataList }}
        columns={columns}
        loading={loading.effects[post.posturl]}
        pagination={'false'}
        onChange={handleTableChange}
        scroll={{ y: '65vh' }}
      />
    </div>
  );
};

export default connect(({ home, miss, model, loading }: any) => ({
  home,
  miss,
  model,
  loading,
}))(FourthChildA);
