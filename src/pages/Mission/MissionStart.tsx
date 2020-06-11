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
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import mockfile from '@/utils/mockfile';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import Missiondetail from '@/components/Missiondetail';

let MissionStart = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskRelease',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        taskName: '', //--------------------任务名称
        openUserId: '', //---------------创建人id
        currentUserId: '', //------------------指派人id
        projectId: projectId, //---------------任务id
        openDateStart: '', //-----------------创建时间搜索  (到分钟)
        openDateEnd: '', //-----------------创建时间搜索  (到分钟)
        deadDateStart: '', //-----------------截止日期搜索  (到日)
        deadDateEnd: '', //-----------------截止日期搜索  (到日)
        sortList: [
          //-------------------------------------------------------------------------排序字段
          {
            fieldName: 'taskNo', //-------------------任务编号
            sort: '',
          },
          {
            fieldName: 'taskName', //--------------------任务名称
            sort: '',
          },
          {
            fieldName: 'openUserName', //---------------创建人id
            sort: '',
          },
          {
            fieldName: 'currentUserName', //------------------指派人id
            sort: '',
          },
          {
            fieldName: 'openDate', //---------------------创建时间
            sort: '',
          },
          {
            fieldName: 'deadDate', //--------------------------截止日期
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
      taskName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '任务名称', //placeholder
        name: ['taskName'], //唯一标识
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

  //父级组件项目变化调用
  useMemo(() => {
    if (projectId) {
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
  }, [model.postdata]);

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
                'miss/MisquerytaskDetails',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
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
      title: '指派给',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 100,
      },
      width: 120,
      ...getColumnSelectProps(
        'currentUserId',
        miss.querySelectListByProjectId && miss.querySelectListByProjectId,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'openDate',
      key: 'openDate',
      sorter: {
        multiple: 98,
      },
      width: 120,

      ...getColumnRangeminProps(
        'openDateStart',
        'openDateEnd',
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
      title: '截止日期',
      dataIndex: 'deadDate',
      key: 'deadDate',
      sorter: {
        multiple: 97,
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
                  ? '#fff'
                  : '#666',
              backgroundColor:
                moment()
                  .startOf('day')
                  .valueOf() > moment(parseInt(text)).valueOf()
                  ? '#e84e0f'
                  : 'transparent',
              padding: '0 8px',
            }}
          >
            {text && moment(parseInt(text)).format('YYYY-MM-DD')}
          </span>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          disabled={record.status != 1}
          onClick={() => {
            cf({
              currentUserId: {
                value: record.currentUserId, //初始化值
                type: 'select', //类型
                title: '指派给', //placeholder
                name: ['currentUserId'], //唯一标识
                required: true, //必填？
                col: { span: 24 },
                options:
                  miss.querySelectListByProjectId &&
                  miss.querySelectListByProjectId,
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
          }}
        >
          <Tooltip title="激活">
            <PlayCircleOutlineIcon
              color={record.status != 1 ? 'action' : 'primary'}
            />
          </Tooltip>
        </IconButton>

        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status == 4 || record.status == 5}
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
            <EditIcon
              color={
                record.status == 4 || record.status == 5 ? 'action' : 'primary'
              }
            />
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
    setTimeout(() => {
      cf(defaultfields);
    }, 200);
  }

  return (
    <Container maxWidth="xl">
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
                    width: 800,
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
            renderAction={() => renderAction(iftype.curitem)}
            maindata={miss.MisquerytaskDetails.data.data}
          ></Missiondetail>
        ) : (
          <InitForm
            fields={fields}
            submitData={() => {
              let newfields = JSON.parse(JSON.stringify(fields));
              for (let i in newfields) {
                newfields[i] = newfields[i].value;
              }
              if (iftype.key == 'jihuo') {
                setNewState(
                  dispatch,
                  'miss/Misactivation',
                  {
                    id: iftype.curitem.id,
                    currentUserId: newfields.currentUserId,
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
                        '激活' + iftype.curitem.taskName + '成功！',
                      );
                    });
                  },
                );
                return;
              }

              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
              }
              newfields.deadDate = moment(newfields.deadDate)
                .startOf('day')
                .valueOf();

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
              setNewState(dispatch, 'miss/Missave', newfields, () => {
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  message.success('修改成功');
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: false,
                    };
                  });
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
                  'miss/querySelectListByProjectId',
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
              } else {
                cf(() => {
                  fields[key].value = value;
                  return {
                    ...fields,
                  };
                });
              }
            }}
            submitting={props.loading.effects['model/Missave']}
          ></InitForm>
        )}
      </Dia>
      <Card
        title={props.route.name}
        extra={
          <div>
            <IconButton
              style={{ padding: 8, borderRadius: 4 }}
              onClick={() => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '新增任务',
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
          </div>
        }
      >
        <AutoTable
          data={miss.MisquerytaskRelease}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
          onChange={handleTableChange}
          scroll={{ y: '65vh' }}
        />
      </Card>
    </Container>
  );
};

export default connect(({ miss, model, loading }: any) => ({
  miss,
  model,
  loading,
}))(MissionStart);
