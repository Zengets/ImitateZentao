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
import Needsdetail from '@/components/Needsdetail';
import Dia from '@/components/Dia';
import AddMission from '@/components/AddMission';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GetTaskList from './components/getTaskList';

const { TabPane } = Tabs;

//ref穿透
let ToNeeds = (props: any, ref: any) => {
  let { proj, model, dispatch, loading, addpostdata } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'proj/umRequirequeryList',
      postdata: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        requireNo: '', // 需求编号
        priorityType: '', // 优先级，1：高，2：中，3：低
        requireName: '', // 需求名称
        createUserId: '', // 创建人
        projectId: projectId, // 项目主键（在项目需求列表中必传）
        status: '', // 状态， 1：未激活、2：已激活、3：已关闭
        stage: '', // 阶段，1：未开始、2：已立项、2：研发中、3：已完成
        sortList: [
          // 更具字段名称和字段顺序排序
          {
            fieldName: 'requireName',
            sort: '',
          },
          {
            fieldName: 'priorityType',
            sort: '',
          },
        ],
      },
      posturls: 'proj/queryNoChooseList',
      postdatas: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        requireNo: '', // 需求编号
        priorityType: '', // 优先级，1：高，2：中，3：低
        requireName: '', // 需求名称
        projectId: projectId, // 项目主键（在项目需求列表中必传）
      },
    }),
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      visibles: false,
      fv: false,
      title: '',
      key: '',
    }),
    [select, changeselect] = useState({
      selectedRowKey: [],
      selectedRowKeys: [],
    });

  useEffect(() => {
    setNewState(dispatch, 'proj/queryRequireStatusSelectList', {}, () => {});
    setNewState(dispatch, 'proj/queryRequireStageSelectList', {}, () => {});
  }, []);

  let columns = [
    {
      title: '编号',
      dataIndex: 'requireNo',
      key: 'requireNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSearchProps(
        'requireNo',
        post.postdata,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdata'),
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 90,
      ...getColumnSelectProps(
        'priorityType',
        model.Bugpriority,
        post.postdata,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdata'),
      ),
      render: (text: any, record: any) => (
        <b style={{ color: rendercolor('Buglevel', record.priorityType) }}>
          {text}
        </b>
      ),
    },
    {
      title: '需求名称',
      sorter: {
        multiple: 99,
      },
      ellipsis: true,
      width: 120,
      dataIndex: 'requireName',
      key: 'requireName',
      ...getColumnSearchProps(
        'requireName',
        post.postdata,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdata'),
      ),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'proj/queryDetailInfo',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visibles: true,
                    title: `[${record.requireNo}]` + text,
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
      sorter: {
        multiple: 97,
      },
      width: 120,
      dataIndex: 'createUserName',
      key: 'createUserName',
    },
    {
      title: '状态',
      sorter: {
        multiple: 93,
      },
      dataIndex: 'statusName',
      key: 'statusName',
      width: 120,
      ...getColumnSelectProps(
        'status',
        proj.queryRequireStatusSelectList,
        post.postdata,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdata'),
      ),
      render: (text: React.ReactNode, record: { status: any }) => (
        <span style={{ color: rendercolor('Productstatus', record.status) }}>
          {text}
        </span>
      ),
    },
    {
      title: '阶段',
      sorter: {
        multiple: 93,
      },
      dataIndex: 'stageName',
      key: 'stageName',
      width: 120,
      ...getColumnSelectProps(
        'stage',
        proj.queryRequireStageSelectList,
        post.postdata,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdata'),
      ),
      render: (text: React.ReactNode, record: { status: any }) => (
        <span style={{ color: rendercolor('Productstage', record.stage) }}>
          {text}
        </span>
      ),
    },
    {
      title: '任务数',
      sorter: {
        multiple: 12,
      },
      dataIndex: 'taskNum',
      key: 'taskNum',
      width: 120,
      render: (text: any, record: any) => {
        return (
          <IconButton
            style={{ borderRadius: 0 }}
            onClick={() => {
              ciftype({
                ...iftype,
                curitem: record,
                visibles: true,
                title: '相关任务',
                key: 'mission',
                fullScreen: false,
              });
            }}
          >
            <a style={{ fontSize: 12, margin: '0px 8px' }}>{text}</a>
          </IconButton>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      render: (text: any, record: any) => renderAction(record),
    },
  ];
  let columnes = [
    {
      title: '编号',
      dataIndex: 'requireNo',
      key: 'requireNo',
      ellipsis: true,
      width: 100,
      ...getColumnSearchProps(
        'requireNo',
        post.postdatas,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdatas'),
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
      ellipsis: true,
      width: 90,
      ...getColumnSelectProps(
        'priorityType',
        model.Bugpriority,
        post.postdatas,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdatas'),
      ),
      render: (text: any, record: any) => (
        <b style={{ color: rendercolor('Buglevel', record.priorityType) }}>
          {text}
        </b>
      ),
    },
    {
      title: '需求名称',
      width: 120,
      ellipsis: true,
      dataIndex: 'requireName',
      key: 'requireName',
      ...getColumnSearchProps(
        'requireName',
        post.postdatas,
        (value: any, dataIndex: any, dataIndexs: any) =>
          handleSearch(value, dataIndex, dataIndexs, 'postdatas'),
      ),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'proj/queryDetailInfo',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visibles: true,
                    title: `[${record.requireNo}]` + text,
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
  ];

  //action
  function renderAction(record: any) {
    return (
      <IconButton
        onClick={() => {
          ciftype({
            ...iftype,
            fv: true,
            curitem: record,
            title: '分配任务',
          });
        }}
      >
        <Tooltip title="分解任务">
          <AccountTreeIcon color="primary"></AccountTreeIcon>
        </Tooltip>
      </IconButton>
    );
  }

  //search
  function handleSearch(
    value: any,
    dataIndex: any,
    dataIndexs: any,
    postdata: string,
  ) {
    if (dataIndexs) {
      cpost(() => {
        return {
          ...post,
          [postdata]: {
            ...post[postdata],
            [dataIndex]: value && value[0],
            [dataIndexs]: value && value[1],
          },
        };
      });
    } else {
      cpost(() => {
        return {
          ...post,
          [postdata]: {
            ...post[postdata],
            [dataIndex]: value,
          },
        };
      });
    }
  }

  //sort
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
  //handle propsid changes
  useMemo(() => {
    if (projectId) {
      cpost({
        ...post,
        postdata: {
          ...post.postdata,
          projectId,
        },
        postdatas: {
          ...post.postdatas,
          projectId,
        },
      });
    }
  }, [model.postdata]);

  //postdata changes callback
  useMemo(() => {
    if (post.postdata.projectId) {
      //projectId get render
      setNewState(dispatch, post.posturl, post.postdata, () => {});
    }
  }, [post.postdata]);

  //postdatas changes callback
  useMemo(() => {
    if (post.postdata.projectId) {
      //projectId get render
      setNewState(dispatch, post.posturls, post.postdatas, () => {});
    }
  }, [post.postdatas]);

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

  let col = iftype.visible
      ? { xs: 24, sm: 24, md: 7, lg: 7, xl: 7, xxl: 7 }
      : { span: 0 },
    colc = iftype.visible
      ? { xs: 24, sm: 24, md: 1, lg: 1, xl: 1, xxl: 1 }
      : { span: 0 },
    cols = iftype.visible
      ? { xs: 24, sm: 24, md: 16, lg: 16, xl: 16, xxl: 16 }
      : { span: 24 };

  const rowSelection = (ifs: any) => {
    if (ifs == 'postdata') {
      return {
        selectedRowKeys: select.selectedRowKey,
        type: 'radio',
        onChange: (keys: any) => {
          changeselect({
            ...select,
            selectedRowKey: keys,
          });
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.taskNum > 0, // Column configuration not to be checked
        }),
      };
    } else {
      return {
        selectedRowKeys: select.selectedRowKeys,
        onChange: (keys: any) => {
          changeselect({
            ...select,
            selectedRowKeys: keys,
          });
        },
      };
    }
  };

  return (
    <Container maxWidth="xl">
      <Dia
        fullScreen={iftype.fullScreen}
        show={iftype.visibles}
        cshow={(key: React.SetStateAction<boolean>) => {
          ciftype(() => {
            return {
              ...iftype,
              visibles: key,
              fullScreen: false,
            };
          });
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        {iftype.key == 'mission' ? (
          <GetTaskList requireId={iftype.curitem.id}></GetTaskList>
        ) : (
          <Needsdetail maindata={proj.queryDetailInfo.data.data}></Needsdetail>
        )}
      </Dia>
      <AddMission
        address="model/breakDown"
        dicKey={iftype.curitem.id}
        dicName={iftype.curitem.requireName}
        iftype={iftype}
        cancel={val => {
          ciftype({
            ...iftype,
            fv: false,
            visible: false,
            visibles: false,
          });
          if (val) {
            setNewState(dispatch, post.posturl, post.postdata, () => {});
            setNewState(dispatch, post.posturls, post.postdatas, () => {});
          }
        }}
      ></AddMission>
      <Card
        title={props.route.name}
        extra={
          <IconButton
            style={{ padding: 8, borderRadius: 4 }}
            onClick={() => {
              ciftype(() => {
                return {
                  ...iftype,
                  visible: !iftype.visible,
                  title: '关联需求',
                  key: 'add',
                };
              });
              if (iftype.visible) {
                changeselect({
                  selectedRowKey: [],
                  selectedRowKeys: [],
                });
              }
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
              <LinkIcon
                style={{ fontSize: 22 }}
                color={iftype.visible ? 'action' : 'primary'}
              />
              <span
                style={{
                  fontSize: 14,
                  color: iftype.visible ? '#999' : '#1183fb',
                  paddingLeft: 6,
                }}
              >
                {iftype.visible ? '返回' : '关联'}
              </span>
            </div>
          </IconButton>
        }
      >
        <Row>
          <Col
            {...cols}
            style={{ transition: iftype.visible ? 'none' : 'all 0.4s' }}
          >
            {iftype.visible && (
              <p
                style={{
                  marginBottom: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>已关联需求：</span>
                <span>选中 {select.selectedRowKey.length} 个</span>
              </p>
            )}
            <AutoTable
              data={proj.umRequirequeryList}
              columns={columns}
              loading={loading.effects[post.posturl]}
              pageChange={(page: any, pageSize: any) =>
                pageChange(page, pageSize, 'postdata')
              }
              onChange={handleTableChange}
              scroll={{ y: '65vh' }}
              rowSelection={iftype.visible ? rowSelection('postdata') : false}
            />
          </Col>
          <Col
            {...colc}
            style={{
              width: iftype.visible ? 60 : 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              transition: iftype.visible ? 'none' : 'all 0.4s',
            }}
          >
            <IconButton
              style={{ marginBottom: 24 }}
              disabled={select.selectedRowKey.length == 0}
            >
              <Tooltip title="移除">
                <Popconfirm
                  overlayStyle={{ zIndex: 9999999999 }}
                  okText="确认"
                  cancelText="取消"
                  placement="bottom"
                  title={'确认移除左侧选中项？'}
                  onConfirm={() => {
                    let postthisdata = {
                      idList: select.selectedRowKey, // 主键（必须）
                      projectId: projectId, // 项目主键（必须）
                      associateType: 2, // 关联方式：1：关联，2：解除关联（必须）
                    };
                    setNewState(
                      dispatch,
                      'proj/associate',
                      postthisdata,
                      () => {
                        setNewState(
                          dispatch,
                          post.posturls,
                          post.postdatas,
                          () => {},
                        );
                        setNewState(
                          dispatch,
                          post.posturl,
                          post.postdata,
                          () => {
                            message.success('移除成功！');
                            changeselect({
                              ...select,
                              selectedRowKey: [],
                            });
                          },
                        );
                      },
                    );
                  }}
                >
                  <ArrowForwardIcon
                    color={
                      select.selectedRowKey.length == 0 ? 'action' : 'primary'
                    }
                  ></ArrowForwardIcon>
                </Popconfirm>
              </Tooltip>
            </IconButton>

            <IconButton disabled={select.selectedRowKeys.length == 0}>
              <Tooltip title="添加">
                <Popconfirm
                  overlayStyle={{ zIndex: 9999999999 }}
                  okText="确认"
                  cancelText="取消"
                  placement="bottom"
                  title={'确认添加右侧选中项？'}
                  onConfirm={() => {
                    let postthisdata = {
                      idList: select.selectedRowKeys, // 主键（必须）
                      projectId: projectId, // 项目主键（必须）
                      associateType: 1, // 关联方式：1：关联，2：解除关联（必须）
                    };
                    setNewState(
                      dispatch,
                      'proj/associate',
                      postthisdata,
                      () => {
                        setNewState(
                          dispatch,
                          post.posturl,
                          post.postdata,
                          () => {
                            message.success('添加成功！');
                            changeselect({
                              ...select,
                              selectedRowKeys: [],
                            });
                          },
                        );
                        setNewState(
                          dispatch,
                          post.posturls,
                          post.postdatas,
                          () => {},
                        );
                      },
                    );
                  }}
                >
                  <ArrowBackIcon
                    color={
                      select.selectedRowKeys.length == 0 ? 'action' : 'primary'
                    }
                  ></ArrowBackIcon>
                </Popconfirm>
              </Tooltip>
            </IconButton>
          </Col>
          <Col
            {...col}
            style={{ transition: iftype.visible ? 'none' : 'all 0.4s' }}
          >
            {iftype.visible && (
              <p
                style={{
                  marginBottom: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>未关联需求：</span>
                <span>选中 {select.selectedRowKeys.length} 个</span>
              </p>
            )}
            <AutoTable
              data={proj.queryNoChooseList}
              columns={columnes}
              loading={loading.effects[post.posturls]}
              pageChange={(page: any, pageSize: any) =>
                pageChange(page, pageSize, 'postdatas')
              }
              onChange={handleTableChange}
              scroll={{ y: '65vh' }}
              rowSelection={rowSelection('postdatas')}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default connect(({ proj, model, loading }: any) => ({
  proj,
  model,
  loading,
}))(ToNeeds);
