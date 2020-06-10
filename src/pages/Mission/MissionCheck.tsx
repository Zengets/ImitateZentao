import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { Input, message, List, Card, Tooltip, Row, Col, Modal } from 'antd';
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
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Missiondetail from '@/components/Missiondetail';

let MissionCheck = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid MisquerytaskCheck,Mischeck
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskCheck',
      postdata: {
        pageIndex: '1', //-------------页码 *
        pageSize: '10', //--------------条数*
        taskNo: '', //---------------任务编号
        taskName: '', //----------------任务名称
        testUserId: '', //---------------验收人id
        currentUserId: '', //--------------当前负责人
        testStageTimeStart: '', //----------验收时间搜索条件(到分钟)
        testStageTimeEnd: '', //----------验收时间搜索条件(到分钟)
        deadDateStart: '', //----------截止日期搜索(到日)
        deadDateEnd: '', //-----------截止日期搜索(到日)
        projectId: projectId, //-----------------项目id
        sortList: [
          //------------------------------------------排序字段
          {
            fieldName: 'taskNo', //------------任务编号
            sort: '',
          },
          {
            fieldName: 'taskName', //-------------------任务名称
            sort: '',
          },
          {
            fieldName: 'testUserName', //-------------------验收人
            sort: '',
          },
          {
            fieldName: 'currentUserName', //--------------------当前负责人
            sort: '',
          },
          {
            fieldName: 'testStageTime', //------------------验收时间
            sort: '',
          },
          {
            fieldName: 'deadDate', //--------------------截止日期
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
          miss.querySelectListByProjectId && miss.querySelectListByProjectId,
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
    },
    [fields, cf] = useState(defaultfields);

  useEffect(() => {}, []);

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
      width: 300,
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
      title: '测试人',
      dataIndex: 'testUserName',
      key: 'testUserName',
      sorter: {
        multiple: 101,
      },
      width: 120,
      ...getColumnSelectProps(
        'testUserId',
        miss.querySelectListByProjectId && miss.querySelectListByProjectId,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '测试时间',
      dataIndex: 'testStageTime',
      key: 'testStageTime',
      sorter: {
        multiple: 96,
      },
      width: 120,
      ...getColumnRangeminProps(
        'testStageTimeStart',
        'testStageTimeEnd',
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
        multiple: 109,
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
        <IconButton
          aria-label="delete"
          onClick={() => {
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '验收信息',
                curitem: record,
                key: 'edit',
                fullScreen: false,
              };
            });
            cf(defaultfields);
          }}
        >
          <Tooltip title="验收">
            <DoneAllIcon color={'primary'} style={{ fontSize: 24 }} />
          </Tooltip>
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
          data={miss.MisquerytaskCheck}
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
