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
import rendercolor from '@/utils/rendercor';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Missiondetail from '@/components/Missiondetail';

let MissionCheck = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid MisquerytaskOverview,Mischeck
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskOverview',
      postdata: {
        pageIndex: '1', //-------------页码*
        pageSize: '10', //--------------条数*
        taskNo: '', //----------------任务编号
        taskName: '', //-------------------任务名称
        currentUserId: '', //----------------------当前负责人
        devStagePlanHours: '', //--------------------------------预计时长(开发)
        devStageExpendHours: '', //------------------------消耗时长(开发)
        deadDateStart: '', //-------------------------------截止日期搜索(到日)
        deadDateEnd: '', //-------------------------------截止日期搜索(到日)
        activateDateStart: '', //-------------------------------激活日期搜索(到日)
        activateDateEnd: '', //-------------------------------激活日期搜索(到日)
        acceptStageTimeStart: '', //-------------------------------验收时间搜索(到分钟)
        acceptStageTimeEnd: '', //-------------------------------验收时间搜索(到分钟)
        projectId: projectId, //-----------------------------项目id*
        status: '', //-------------------------状态
        sortList: [
          //------------------排序字段
          {
            fieldName: 'taskNo', //------------编号
            sort: '',
          },
          {
            fieldName: 'taskName', //-----------------任务名称
            sort: '',
          },
          {
            fieldName: 'currentUserName', //-------------------当前负责人
            sort: '',
          },
          {
            fieldName: 'devStagePlanHours', //---------------------预计时长(开发)
            sort: '',
          },
          {
            fieldName: 'devStageExpendHours', //----------------消耗时长(开发)
            sort: '',
          },
          {
            fieldName: 'deadDate', //-----------------------截止日期
            sort: '',
          },
          {
            fieldName: 'activateDate', //----------------------激活日期
            sort: '',
          },
          {
            fieldName: 'acceptStageTime', //--------------------------验收时间
            sort: '',
          },
          {
            fieldName: 'status', //--------------------------------状态
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
      acceptStageResult: {
        value: '', //初始化值
        type: 'radio',
        title: '验证结果',
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
          miss.querySelectListByProjectId && miss.querySelectListByProjectId,
      },
      acceptStageDescription: {
        value: '', //初始化值
        type: 'textarea',
        title: '验证描述',
        name: ['acceptStageDescription'],
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
      title: '负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
      sorter: {
        multiple: 102,
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
      title: '激活时间',
      width: 120,
      dataIndex: 'activateDate',
      key: 'activateDate',
      sorter: {
        multiple: 96,
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
      title: '预计时长(开发)',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
      width: 120,
      sorter: {
        multiple: 98,
      },
    },
    {
      title: '消耗时长(开发)',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
      width: 120,
      sorter: {
        multiple: 97,
      },
    },
    {
      title: '截止日期',
      dataIndex: 'deadDate',
      key: 'deadDate',
      width: 120,
      sorter: {
        multiple: 95,
      },
      ...getColumnRangeProps(
        'deadDateStart',
        'deadDateEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any, record: any) {
        return (
          <span
            style={{
              color:
                record.status == 8
                  ? '#666'
                  : record.status == 7
                  ? moment(parseInt(record.acceptStageTime))
                      .startOf('day')
                      .valueOf() > moment(parseInt(text)).valueOf()
                    ? 'red'
                    : 'green'
                  : moment()
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
      title: '验收时间',
      dataIndex: 'acceptStageTime',
      key: 'acceptStageTime',
      sorter: {
        multiple: 96,
      },
      width: 120,
      ...getColumnRangeminProps(
        'acceptStageTimeStart',
        'acceptStageTimeEnd',
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
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
      sorter: {
        multiple: 94,
      },
      width: 120,
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
      width: 60,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认关闭任务：' + record.taskName + '？'}
          onConfirm={() => {
            setNewState(dispatch, 'miss/Misclose', { id: record.id }, () => {
              message.success('关闭任务：' + record.taskName + '成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {
                hides(false);
              });
            });
          }}
        >
          <Tooltip title="关闭">
            <IconButton
              disabled={record.status == 7 || record.status == 8}
              aria-label="delete"
            >
              <HighlightOffIcon
                color={
                  record.status == 7 || record.status == 8 ? 'action' : 'error'
                }
              />
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
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post]);

  useMemo(() => {
    cf(defaultfields);
  }, [miss]);

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
              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
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

              setNewState(dispatch, 'miss/Mischeck', newfields, () => {
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
                cf(() => {
                  fields[key].value = value;
                  return {
                    ...fields,
                  };
                });
              }
            }}
            submitting={props.loading.effects['model/Mischeck']}
          ></InitForm>
        )}
      </Dia>
      <Card title={props.route.name}>
        <AutoTable
          data={miss.MisquerytaskOverview}
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
}))(MissionCheck);
