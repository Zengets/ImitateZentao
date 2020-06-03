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
import rendercolor from '@/utils/rendercor';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

let MissionTest = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid MisquerytaskTest,Mistest
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskTest',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        taskName: '', //--------------------任务名称
        devUserId: '', //---------------开发人id
        currentUserId: '', //------------------当前负责人id
        projectId: projectId, //---------------项目id
        realFinishTimeStart: '', //-----------------完成时间(开发)搜索  (到分钟)
        realFinishTimeEnd: '', //-----------------完成时间(开发)搜索  (到分钟)
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
            fieldName: 'devUserName', //---------------开发人id
            sort: '',
          },
          {
            fieldName: 'currentUserName', //------------------当前负责人id
            sort: '',
          },
          {
            fieldName: 'devStagePlanHours', //---------------------预计小时(开发)
            sort: '',
          },
          {
            fieldName: 'devStageExpendHours', //--------------------------消耗小时(开发)
            sort: '',
          },
          {
            fieldName: 'realFinishTime', //----------------------------完成时间(开发)
            sort: '',
          },
          {
            fieldName: 'deadDate', //----------------------------截止日期
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
          miss.querySelectListByProjectId && miss.querySelectListByProjectId,
      },
      testStageDescription: {
        value: '', //初始化值
        type: 'textarea',
        title: '测试描述',
        name: ['testStageDescription'],
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
      title: '开发者',
      dataIndex: 'devUserName',
      key: 'devUserName',
      sorter: {
        multiple: 101,
      },
      ...getColumnSelectProps(
        'devUserId',
        miss.querySelectListByProjectId && miss.querySelectListByProjectId,
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
      title: '预计时长(h开发)',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
      sorter: {
        multiple: 98,
      },
    },
    {
      title: '消耗时长(h开发)',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
      sorter: {
        multiple: 97,
      },
    },
    {
      title: '完成时间(开发)',
      dataIndex: 'realFinishTime',
      key: 'realFinishTime',
      sorter: {
        multiple: 96,
      },
      ...getColumnRangeminProps(
        'realFinishTimeStart',
        'realFinishTimeEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any) {
        return (
          <span>
            {text && moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        );
      },
    },
    {
      title: '截止日期',
      dataIndex: 'deadDate',
      key: 'deadDate',
      sorter: {
        multiple: 95,
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
      width: 140,
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
                title: '测试信息',
                curitem: record,
                key: 'edit',
              };
            });
            cf(defaultfields);
          }}
        >
          <PlayCircleFilledIcon color={'primary'} style={{ fontSize: 24 }} />
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

              setNewState(dispatch, 'miss/Mistest', newfields, () => {
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
              } else {
                cf(() => {
                  fields[key].value = value;
                  return {
                    ...fields,
                  };
                });
              }
            }}
            submitting={props.loading.effects['model/Mistest']}
          ></InitForm>
        )}
      </Dia>
      <Card title={props.route.name}>
        <AutoTable
          data={miss.MisquerytaskTest}
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
}))(MissionTest);
