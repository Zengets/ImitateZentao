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
import rendercolor from '@/utils/rendercor';

let defaulttext =
  '<p style="text-align:start;" size="0" _root="undefined" __ownerID="undefined" __hash="undefined" __altered="false">[步骤]</p><p></p><p>[结果]</p><p></p><p>[期望]</p>';

let Bugs = (props: any) => {
  let { bug, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'bug/BugqueryList',
      postdata: {
        projectId: projectId, //项目id，筛选条件
        bugNo: '', //bug编号，筛选条件
        severity: '', //严重程度key，筛选条件
        priority: '', //优先级key，筛选条件
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
            fieldName: 'severity', //严重程度
            sort: '',
          },
          {
            fieldName: 'priority', //优先级
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
        options: bug.ProjquerySelectList && bug.ProjquerySelectList,
      },
      solveUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '指派给', //placeholder
        name: ['solveUserId'], //唯一标识
        required: true, //必填？
        options:
          bug.querySelectListByProjectId && bug.querySelectListByProjectId,
      },
      bugType: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug类型', //placeholder
        name: ['bugType'], //唯一标识
        required: true, //必填？
        options: bug.Bugtype && bug.Bugtype,
      },
      severity: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug严重程度', //placeholder
        name: ['severity'], //唯一标识
        required: true, //必填？
        options: bug.Bugseverity && bug.Bugseverity,
      },
      priority: {
        value: '', //初始化值
        type: 'select', //类型
        title: 'Bug优先级', //placeholder
        name: ['priority'], //唯一标识
        required: true, //必填？
        options: bug.Bugpriority && bug.Bugpriority,
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
        required: true,
        col: { span: 24 },
      },
    },
    [fields, cf] = useState(defaultfields);

  useEffect(() => {
    if (bug.done) {
      setNewState(dispatch, 'bug/ProjquerySelectList', {}, () => {});
      let arr = [
        'Bugstatus',
        'Bugtype',
        'Bugstage',
        'Bugseverity',
        'Bugpriority',
        'Bugsolution',
      ]; //下拉框汇总
      arr.map((item: any) => {
        setNewState(dispatch, `bug/${item}`, {}, () => {});
      });
    }
  }, []);

  //父级组件项目变化调用
  useMemo(() => {
    if (projectId) {
      setNewState(
        dispatch,
        'bug/querySelectListByProjectId',
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
      ...getColumnSearchProps('bugNo', post.postdata, handleSearch),
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      sorter: {
        multiple: 111,
      },
      ...getColumnSelectProps(
        'severity',
        bug.Bugseverity,
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <b style={{ color: rendercolor('Buglevel', text) }}>{text}</b>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      sorter: {
        multiple: 111,
      },
      ...getColumnSelectProps(
        'priority',
        bug.Bugpriority,
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <b style={{ color: rendercolor('Buglevel', text) }}>{text}</b>
      ),
    },
    {
      title: 'Bug名称',
      dataIndex: 'bugName',
      key: 'bugName',
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
                'bug/ProjqueryById',
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
      ...getColumnSelectProps(
        'solveUserId',
        bug.querySelectListByProjectId && bug.querySelectListByProjectId,
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
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 100,
      },
      ...getColumnSelectProps(
        'currentUserId',
        bug.querySelectListByProjectId && bug.querySelectListByProjectId,
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
      width: 200,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          disabled={record.status !== 1}
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
                  bug.querySelectListByProjectId &&
                  bug.querySelectListByProjectId,
              },
            });
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '激活Bug:' + record.bugName + ',并选择指派人',
                key: 'jihuo',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <PlayCircleOutlineIcon
            color={record.status !== 1 ? 'action' : 'primary'}
          />
        </IconButton>

        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status === 4 || record.status === 5}
          onClick={() => {
            setNewState(
              dispatch,
              'bug/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  bugName: {
                    ...fields.bugName,
                    value: record.bugName, //初始化值
                  },
                  projectId: {
                    ...fields.projectId,
                    value: record.projectId, //初始化值
                    hides: true,
                  },
                  solveUserId: {
                    ...fields.solveUserId,
                    value: record.solveUserId, //初始化值
                    options: res.data.dataList,
                  },
                  bugType: {
                    ...fields.bugType,
                    value: record.bugType, //初始化值
                  },
                  severity: {
                    ...fields.severity,
                    value: record.severity, //初始化值
                  },
                  priority: {
                    ...fields.priority,
                    value: record.priority, //初始化值
                  },
                  steps: {
                    ...fields.steps,
                    value: record.steps, //初始化值
                  },
                  endDate: {
                    ...fields.endDate,
                    value: record.endDate
                      ? moment(parseInt(record.endDate))
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
          <EditIcon
            color={
              record.status === 4 || record.status === 5 ? 'action' : 'primary'
            }
          />
        </IconButton>
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
              'bug/MisdeleteById',
              { id: record.id },
              () => {
                message.success('删除' + record.bugName + '成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {});
              },
            );
          }}
        >
          <IconButton disabled={record.status !== 1} aria-label="delete">
            <DeleteIcon color={record.status !== 1 ? 'action' : 'error'} />
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
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post]);

  useMemo(() => {
    cf(defaultfields);
  }, [bug]);

  let pageChange = (page: any) => {
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          pageIndex: page,
        },
      };
    });
  };

  return (
    <Container maxWidth="xl">
      <Dia
        fullScreen={iftype.fullScreen}
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
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
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        {iftype.key == 'detail' ? (
          <Projectdetail
            showProduct={() => {
              setNewState(
                dispatch,
                'bug/ProdqueryInfo',
                { id: bug.ProjqueryById.data.data.projectId },
                (res: any) => {
                  Modal.info({
                    zIndex: 999999,
                    width: 800,
                    maskClosable: true,
                    title: bug.ProjqueryById.data.data.productName,
                    content: <Productdetail maindata={res.data.data} />,
                    okText: '晓得了',
                  });
                },
              );
            }}
            renderAction={() => renderAction(iftype.curitem)}
            maindata={bug.ProjqueryById.data.data}
          ></Projectdetail>
        ) : (
          iftype.visible && (
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
                    'bug/Misactivation',
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
                          '激活' + iftype.curitem.bugName + '成功！',
                        );
                      });
                    },
                  );
                  return;
                }
                if (iftype.key == 'edit') {
                  newfields.id = iftype.curitem.id;
                }
                newfields.endDate = moment(newfields.endDate).valueOf();

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
                setNewState(dispatch, 'bug/Bugsave', newfields, () => {
                  setNewState(dispatch, post.posturl, post.postdata, () => {
                    message.success('操作成功');
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
                    'bug/querySelectListByProjectId',
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
              submitting={props.loading.effects['model/Bugsave']}
            ></InitForm>
          )
        )}
      </Dia>
      <Card
        title={props.route.name}
        extra={
          <div>
            <IconButton
              style={{ padding: 8 }}
              onClick={() => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '新增Bug',
                    key: 'add',
                  };
                });
                cf(defaultfields);
              }}
            >
              <AddCircleOutlineIcon style={{ fontSize: 22, color: '#000' }} />
            </IconButton>
          </div>
        }
      >
        <AutoTable
          data={bug.BugqueryList}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
          onChange={handleTableChange}
          scroll={'false'}
        />
      </Card>
    </Container>
  );
};

export default connect(({ bug, model, loading }: any) => ({
  bug,
  model,
  loading,
}))(Bugs);
