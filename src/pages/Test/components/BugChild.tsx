import React, {
  useEffect,
  useState,
  useMemo,
  useImperativeHandle,
} from 'react';
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
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutoTable from '@/components/AutoTable';
import {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnRangeProps,
  getColumnRangeminProps,
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import BuildIcon from '@material-ui/icons/Build';
import EditIcon from '@material-ui/icons/Edit';
import mockfile from '@/utils/mockfile';
import Projectdetail from '@/components/Projectdetail';
import Bugdetail from '@/components/Bugdetail';
import rendercolor from '@/utils/rendercor';
import Productdetail from '@/components/Productdetail';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

let Bugs = React.forwardRef((props: any, ref: any) => {
  let { bug, dispatch, loading, model, addpostdata } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'bug/BugqueryList',
      postdata: {
        ...addpostdata,
        projectId: projectId, //项目id，筛选条件
        bugNo: '', //bug编号，筛选条件
        severityName: '', //严重程度key，筛选条件
        priorityName: '', //优先级key，筛选条件
        bugName: '', //项目标题，筛选条件
        openUserName: '', //创建人名，筛选条件
        openMinTime: '', //创建起时间，筛选条件
        openMaxTime: '', //创建止时间，筛选条件
        solveUserName: '', //处理人名，筛选条件
        solveMinTime: '', //处理起时间，筛选条件
        solveMaxTime: '', //处理止时间，筛选条件
        currentUserName: '', //当前负责人名，筛选条件
        status: '', //状态key，筛选条件
        sortList: [
          //排序字段
          {
            fieldName: 'bugNo', //bug编号
            sort: '',
          },
          {
            fieldName: 'severityName', //严重程度
            sort: '',
          },
          {
            fieldName: 'priorityName', //优先级
            sort: '',
          },
          {
            fieldName: 'bugName', //bug标题
            sort: '',
          },
          {
            fieldName: 'openUserName', //创建人名
            sort: '',
          },
          {
            fieldName: 'openTime', //创建时间
            sort: '',
          },
          {
            fieldName: 'solveUserName', //处理人名
            sort: '',
          },
          {
            fieldName: 'solveTime', //处理时间
            sort: '',
          },
          {
            fieldName: 'currentUserName', //当前负责人名
            sort: '',
          },
          {
            fieldName: 'status', //状态
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
      key: '',
    }),
    defaultfields: any = {
      bugName: {
        value: '', //初始化值
        type: 'input', //类型
        title: 'Bug名称', //placeholder
        name: ['bugName'], //唯一标识
        required: true, //必填？
      },
      projectId: {
        value: projectId, //初始化值
        type: 'select', //类型
        title: '所属项目', //placeholder
        name: ['projectId'], //唯一标识
        required: true, //必填？
        disabled: true,
        options: model.ProjquerySelectList && model.ProjquerySelectList,
      },
      solveUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '指派给', //placeholder
        name: ['solveUserId'], //唯一标识
        required: true, //必填？
        options:
          model.querySelectListByProjectId && model.querySelectListByProjectId,
      },
      bugType: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug类型', //placeholder
        name: ['bugType'], //唯一标识
        required: false, //必填？
        options: bug.Bugtype && bug.Bugtype,
      },
      severityType: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug严重程度', //placeholder
        name: ['severityType'], //唯一标识
        required: false, //必填？
        options: bug.Bugseverity && bug.Bugseverity,
      },
      priorityType: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug优先级', //placeholder
        name: ['priorityType'], //唯一标识
        required: false, //必填？
        options: model.Bugpriority && model.Bugpriority,
      },
      steps: {
        value: '', //初始化值
        type: 'editor',
        title: '重现步骤',
        name: ['steps'],
        required: true,
        col: { span: 24 },
      },
      endDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '截止日期',
        name: ['endDate'],
        required: false,
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
    if (bug.done) {
      let arr = [
        'Bugstatus',
        'Bugtype',
        'Bugstage',
        'Bugseverity',
        'Bugsolution',
      ]; //下拉框汇总
      arr.map((item: any) => {
        setNewState(dispatch, `bug/${item}`, {}, () => {});
      });
    }

    let query = history.location.query.data;
    query = query ? JSON.parse(query) : null;

    if (query && query.length > 0) {
      let step = '',
        reality = '',
        expection = ''; //step,reality,expection
      query.map((item: any, i: number) => {
        step += item.step ? `<br/>${i + 1} : ${item.step}` : '';
        reality += item.reality ? `<br/>${i + 1} : ${item.reality}` : '';
        expection += item.expection ? `<br/>${i + 1} : ${item.expection}` : '';
      });
      let defaulttext = `<p style="text-align:start;" size="0">[步骤] ${step}</p><p></p><p>[结果] ${reality}</p><p></p><p>[期望] ${expection}</p>`;
      cf({
        ...defaultfields,
        steps: {
          ...fields.steps,
          value: defaulttext, //初始化值
        },
      });
      ciftype(() => {
        return {
          ...iftype,
          visible: true,
          title: '新建Bug',
          key: 'add',
          fullScreen: false,
        };
      });
    }
  }, []);

  //父级组件项目变化调用
  useMemo(() => {
    if (projectId) {
      setNewState(
        dispatch,
        'model/querySelectListByProjectId',
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
  }, [model.postdata]);

  let columns = [
    {
      title: 'Bug编号',
      dataIndex: 'bugNo',
      key: 'bugNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSearchProps('bugNo', post.postdata, handleSearch),
    },
    {
      title: '严重程度',
      dataIndex: 'severityName',
      key: 'severityName',
      sorter: {
        multiple: 111,
      },
      width: 120,
      ellipsis: true,
      ...getColumnSelectProps(
        'severityType',
        bug.Bugseverity,
        post.postdata,
        handleSearch,
      ),
      render: (text: any, record: any) => (
        <b style={{ color: rendercolor('Buglevel', record.severityType) }}>
          {text}
        </b>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
      sorter: {
        multiple: 111,
      },
      width: 120,
      ...getColumnSelectProps(
        'priorityType',
        model.Bugpriority,
        post.postdata,
        handleSearch,
      ),
      render: (text: any, record: any) => (
        <b style={{ color: rendercolor('Buglevel', record.priorityType) }}>
          {text}
        </b>
      ),
    },
    {
      title: 'Bug名称',
      dataIndex: 'bugName',
      key: 'bugName',
      ellipsis: true,
      sorter: {
        multiple: 99,
      },
      ...getColumnSearchProps('bugName', post.postdata, handleSearch),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'bug/BugqueryById',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
                    title: `[${record.bugNo}]` + text,
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
      title: '创建人',
      dataIndex: 'openUserName',
      key: 'openUserName',
      sorter: {
        multiple: 100,
      },
      width: 120,
      ...getColumnSelectProps(
        'openUserId',
        model.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'openTime',
      key: 'openTime',
      width: 120,
      sorter: {
        multiple: 113,
      },
      ...getColumnRangeminProps(
        'openMinTime',
        'openMaxTime',
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
      title: '处理人',
      dataIndex: 'solveUserName',
      key: 'solveUserName',
      sorter: {
        multiple: 100,
      },
      width: 120,
      ...getColumnSelectProps(
        'solveUserId',
        model.querySelectListByProjectId && model.querySelectListByProjectId,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '处理时间',
      dataIndex: 'solveTime',
      key: 'solveTime',
      sorter: {
        multiple: 98,
      },
      width: 120,
      ...getColumnRangeminProps(
        'solveMinTime',
        'solveMaxTime',
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
      title: '当前负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 100,
      },
      width: 120,
      ...getColumnSelectProps(
        'currentUserId',
        model.querySelectListByProjectId && model.querySelectListByProjectId,
        post.postdata,
        handleSearch,
      ),
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
        bug.Bugstatus && bug.Bugstatus,
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <span style={{ color: rendercolor('Bugstatus', text) }}>{text}</span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (text: any, record: any) => renderAction(record, false),
    },
  ];

  function renderAction(record: any, shown: boolean) {
    return (
      <div>
        {shown && (
          <span>
            <IconButton
              disabled={record.status != 3}
              onClick={() => {
                cf({
                  solveUserId: {
                    value: null, //初始化值
                    type: 'select', //类型
                    title: '指派给', //placeholder
                    name: ['solveUserId'], //唯一标识
                    required: true, //必填？
                    options:
                      model.querySelectListByProjectId &&
                      model.querySelectListByProjectId,
                  },
                  activateDescription: {
                    value: '<p></p>', //初始化值
                    type: 'editor', //类型
                    title: '激活描述', //placeholder
                    name: ['activateDescription'], //唯一标识
                    required: true, //必填？
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
                    title: '激活Bug:' + record.bugName,
                    key: 'active',
                    curitem: record,
                    fullScreen: false,
                  };
                });
              }}
            >
              <Tooltip title="激活">
                <PlayCircleOutlineIcon
                  color={record.status != 3 ? 'action' : 'error'}
                />
              </Tooltip>
            </IconButton>
            <Divider type="vertical"></Divider>
          </span>
        )}

        <IconButton
          disabled={record.status != 1}
          onClick={() => {
            cf({
              acceptUserId: {
                value: null, //初始化值
                type: 'select', //类型
                title: '指派给', //placeholder
                name: ['acceptUserId'], //唯一标识
                required: true, //必填？
                options:
                  model.querySelectListByProjectId &&
                  model.querySelectListByProjectId,
              },
              solution: {
                value: null, //初始化值
                type: 'select', //类型
                title: '解决方案', //placeholder
                name: ['solution'], //唯一标识
                required: true, //必填？
                options: bug.Bugsolution && bug.Bugsolution,
              },
              solveDescription: {
                value: '<p></p>', //初始化值
                type: 'editor', //类型
                title: '处理描述', //placeholder
                name: ['solveDescription'], //唯一标识
                required: false, //必填？
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
                title: '处理Bug:' + record.bugName,
                key: 'deal',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <Tooltip title="处理">
            <BuildIcon
              color={record.status != 1 ? 'action' : 'primary'}
              style={{ fontSize: 20 }}
            />
          </Tooltip>
        </IconButton>

        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status != 2}
          aria-label="delete"
          onClick={() => {
            cf({
              acceptResult: {
                value: null, //初始化值
                type: 'radio', //类型
                title: '验收结果', //placeholder
                name: ['acceptResult'], //唯一标识
                required: true, //必填？
                options: [
                  {
                    dicName: '不通过',
                    dicKey: 0,
                  },
                  {
                    dicName: '通过',
                    dicKey: 1,
                  },
                ],
              },
              solveUserId: {
                value: null, //初始化值
                type: 'select', //类型
                title: '指派给', //placeholder
                name: ['solveUserId'], //唯一标识
                required: true, //必填？
                hides: true,
                options:
                  model.querySelectListByProjectId &&
                  model.querySelectListByProjectId,
              },
              acceptDescription: {
                value: '<p></p>', //初始化值
                type: 'editor', //类型
                title: '处理描述', //placeholder
                name: ['acceptDescription'], //唯一标识
                required: false, //必填？
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
                title: '验证Bug:' + record.bugName,
                key: 'checks',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <Tooltip title="验证">
            <PlaylistAddCheckIcon
              color={record.status != 2 ? 'action' : 'error'}
              style={{ fontSize: 26 }}
            />
          </Tooltip>
        </IconButton>

        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status != 1}
          onClick={() => {
            setNewState(
              dispatch,
              'model/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  bugName: {
                    ...defaultfields.bugName,
                    value: record.bugName, //初始化值
                  },
                  projectId: {
                    ...defaultfields.projectId,
                    value: record.projectId, //初始化值
                    hides: true,
                  },
                  solveUserId: {
                    ...defaultfields.solveUserId,
                    value: record.solveUserId, //初始化值
                    options: res.data.dataList,
                  },
                  bugType: {
                    ...defaultfields.bugType,
                    value: record.bugType, //初始化值
                  },
                  severityType: {
                    ...defaultfields.severityType,
                    value: record.severityType, //初始化值
                  },
                  priorityType: {
                    ...defaultfields.priorityType,
                    value: record.priorityType, //初始化值
                  },
                  steps: {
                    ...defaultfields.steps,
                    value: record.steps, //初始化值
                  },
                  endDate: {
                    ...defaultfields.endDate,
                    value: record.endDate
                      ? moment(parseInt(record.endDate))
                      : undefined, //初始化值
                  },
                  attachmentList: {
                    ...defaultfields.attachmentList,
                    value: record.attachmentList
                      ? mockfile(record.attachmentList)
                      : [], //初始化值
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '修改' + record.bugName,
                    key: 'edit',
                    curitem: record,
                    fullScreen: false,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="修改">
            <EditIcon color={record.status != 1 ? 'action' : 'primary'} />
          </Tooltip>
        </IconButton>
        {shown && (
          <span>
            <Divider type="vertical"></Divider>
            <Popconfirm
              overlayStyle={{ zIndex: 9999999999 }}
              okText="确认"
              cancelText="取消"
              placement="bottom"
              title={'确认删除' + record.bugName + '？'}
              onConfirm={() => {
                setNewState(
                  dispatch,
                  'bug/Bugdelete',
                  { id: record.id },
                  () => {
                    message.success('删除' + record.bugName + '成功！');
                    setNewState(dispatch, post.posturl, post.postdata, () => {
                      hides(false);
                    });
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
          </span>
        )}
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
    if (post.postdata.projectId) {
      setNewState(dispatch, post.posturl, post.postdata, () => {});
    }
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
              ciftype(() => {
                return {
                  ...iftype,
                  visible: true,
                  title: '新建Bug',
                  key: 'add',
                };
              });
              cf(defaultfields);
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
          <Bugdetail
            showOther={() => {
              setNewState(
                dispatch,
                'bug/ProjqueryById',
                { id: bug.BugqueryById.data.data.projectId },
                (res: any) => {
                  Modal.info({
                    style: { top: 20 },
                    zIndex: 999999,
                    width: 1200,
                    maskClosable: true,
                    title: bug.BugqueryById.data.data.projectName,
                    content: (
                      <Projectdetail
                        showProduct={() => {
                          setNewState(
                            dispatch,
                            'bug/ProdqueryInfo',
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
            renderAction={() => renderAction(iftype.curitem, true)}
            maindata={bug.BugqueryById.data.data}
          ></Bugdetail>
        ) : (
          iftype.visible && (
            <InitForm
              fields={fields}
              submitData={(values: any) => {
                let newfields = JSON.parse(JSON.stringify(values));
                //文件处理
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

                if (iftype.key == 'active') {
                  setNewState(
                    dispatch,
                    'bug/Bugactivate',
                    {
                      ...newfields,
                      id: iftype.curitem.id,
                    },
                    () => {
                      ciftype(() => {
                        return {
                          ...iftype,
                          visible: false,
                        };
                      });
                      setNewState(dispatch, post.posturl, post.postdata, () => {
                        message.success(
                          '已激活' + iftype.curitem.bugName + '！',
                        );
                      });
                    },
                  );
                  return;
                }

                if (iftype.key == 'deal') {
                  setNewState(
                    dispatch,
                    'bug/Bugsolve',
                    {
                      ...newfields,
                      id: iftype.curitem.id,
                    },
                    () => {
                      ciftype(() => {
                        return {
                          ...iftype,
                          visible: false,
                        };
                      });
                      setNewState(dispatch, post.posturl, post.postdata, () => {
                        message.success(
                          '已处理' + iftype.curitem.bugName + '！',
                        );
                      });
                    },
                  );
                  return;
                }

                if (iftype.key == 'checks') {
                  setNewState(
                    dispatch,
                    'bug/Bugconfirm',
                    {
                      ...newfields,
                      id: iftype.curitem.id,
                    },
                    () => {
                      ciftype(() => {
                        return {
                          ...iftype,
                          visible: false,
                        };
                      });
                      setNewState(dispatch, post.posturl, post.postdata, () => {
                        message.success(
                          '已验收' + iftype.curitem.bugName + '！',
                        );
                      });
                    },
                  );

                  return;
                }

                //新增修改
                if (iftype.key == 'edit') {
                  newfields.id = iftype.curitem.id;
                }

                if (iftype.key == 'add' && history.location.query.id) {
                  newfields.caseId = history.location.query.id;
                }

                newfields.endDate = moment(newfields.endDate).valueOf();
                setNewState(dispatch, 'bug/Bugsave', newfields, () => {
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: false,
                    };
                  });
                  setNewState(dispatch, post.posturl, post.postdata, () => {
                    message.success('操作成功');
                  });
                });
              }}
              onChange={(newFields: any) => {
                if (!newFields) {
                  return;
                }
                let name = newFields ? newFields.name : '',
                  value = newFields.value;
                let key = name ? name[0] : '';
                if (key == 'projectId') {
                  setNewState(
                    dispatch,
                    'model/querySelectListByProjectId',
                    { projectId: value },
                    (res: any) => {
                      cf(() => {
                        fields[key].value = value;
                        fields.currentUserId.value = '';
                        fields.currentUserId.options = res.data.dataList;
                        return {
                          ...fields,
                        };
                      });
                    },
                  );
                } else if (key == 'acceptResult') {
                  cf(() => {
                    fields[key].value = value;
                    return {
                      ...fields,
                      solveUserId: {
                        ...fields.solveUserId,
                        value: iftype.curitem.solveUserId,
                        hides: value == 1,
                      },
                    };
                  });
                } else {
                }
              }}
              submitting={
                props.loading.effects['bug/Bugsave'] ||
                props.loading.effects['bug/Bugsolve'] ||
                props.loading.effects['bug/Bugconfirm'] ||
                props.loading.effects['bug/Bugactivate'] ||
                !iftype.visible
              }
            ></InitForm>
          )
        )}
      </Dia>
      <AutoTable
        data={bug.BugqueryList}
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
  ({ bug, model, loading }: any) => ({
    bug,
    model,
    loading,
  }),
  null,
  null,
  { forwardRef: true },
)(Bugs);
