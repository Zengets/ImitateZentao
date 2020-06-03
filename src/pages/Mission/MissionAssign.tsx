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
import { ClusterOutlined } from '@ant-design/icons';

let MissionAssign = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskAssign',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        taskName: '', //--------------------任务名称
        openUserId: '', //---------------创建人id
        currentUserId: '', //------------------指派人id
        projectId: projectId, //---------------项目id
        openDateStart: '', //-----------------创建时间搜索  (到分钟)
        openDateEnd: '', //-----------------创建时间搜索  (到分钟)
        deadDateStart: '', //-----------------截止日期搜索  (到日)
        deadDateEnd: '', //-----------------截止日期搜索  (到日)
        activateDateStart: '', //------------------激活时间搜索  (到分钟)
        activateDateEnd: '', //------------------激活时间搜索  (到分钟)
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
            fieldName: 'deadDate', //--------------------------截止时间
            sort: '',
          },
          {
            fieldName: 'activateDate', //----------------------------激活时间
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
      currentUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '指派给', //placeholder
        name: ['currentUserId'], //唯一标识
        required: true, //必填？
        options:
          miss.querySelectListByProjectId && miss.querySelectListByProjectId,
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
        required: true,
        rows: 6,
        col: { span: 24 },
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
    //setNewState(dispatch, post.posturl, post.postdata, () => { });
    setNewState(dispatch, 'miss/ProjquerySelectList', {}, () => {});
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
      ...getColumnSearchProps('taskNo', post.postdata, handleSearch),
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
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
                'miss/ProjqueryById',
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
        multiple: 101,
      },
      ...getColumnSelectProps(
        'openUserId',
        model.UserqueryAll,
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
      title: '激活时间',
      dataIndex: 'activateDate',
      key: 'activateDate',
      sorter: {
        multiple: 97,
      },
      ...getColumnRangeminProps(
        'activateDateStart',
        'activateDateEnd',
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
        multiple: 96,
      },
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          disabled={record.status === 4 || record.status === 5}
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
                    value: record.devStagePlanHours, //初始化值
                  },
                  devStageStartDate: {
                    ...fields.devStageStartDate,
                    value: record.devStageStartDate
                      ? moment(parseInt(record.devStageStartDate))
                      : undefined, //初始化值
                  },
                  devStageEndDate: {
                    ...fields.devStageEndDate,
                    value: record.devStageEndDate
                      ? moment(parseInt(record.devStageEndDate))
                      : undefined, //初始化值
                  },
                  techDesctription: {
                    ...fields.techDesctription,
                    value: record.techDesctription, //初始化值
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
                    title: '分配任务:' + record.taskName,
                    key: 'edit',
                    curitem: record,
                    fullScreen: false,
                  };
                });
              },
            );
          }}
        >
          <ClusterOutlined style={{ color: '#1183fb' }} />
        </IconButton>
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
  }, [miss]);

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
                'miss/ProdqueryInfo',
                { id: miss.ProjqueryById.data.data.projectId },
                (res: any) => {
                  Modal.info({
                    zIndex: 999999,
                    width: 800,
                    maskClosable: true,
                    title: miss.ProjqueryById.data.data.productName,
                    content: <Productdetail maindata={res.data.data} />,
                    okText: '晓得了',
                  });
                },
              );
            }}
            renderAction={() => renderAction(iftype.curitem)}
            maindata={miss.ProjqueryById.data.data}
          ></Projectdetail>
        ) : (
          <InitForm
            fields={fields}
            submitData={() => {
              let newfields = JSON.parse(JSON.stringify(fields));
              for (let i in newfields) {
                newfields[i] = newfields[i].value;
              }
              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
              }
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

              setNewState(dispatch, 'miss/Misassign', newfields, () => {
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
              cf(() => {
                fields[key].value = value;
                return {
                  ...fields,
                };
              });
            }}
            submitting={props.loading.effects['model/Misassign']}
          ></InitForm>
        )}
      </Dia>
      <Card title={props.route.name}>
        <AutoTable
          data={miss.MisquerytaskAssign}
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

export default connect(({ miss, model, loading }: any) => ({
  miss,
  model,
  loading,
}))(MissionAssign);