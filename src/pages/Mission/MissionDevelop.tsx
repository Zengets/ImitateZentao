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
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import mockfile from '@/utils/mockfile';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';
import { ClusterOutlined } from '@ant-design/icons';
import rendercolor from '@/utils/rendercor';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Missiondetail from '@/components/Missiondetail';

let MissionDevelop = (props: any) => {
  let { miss, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'miss/MisquerytaskDevelop',
      postdata: {
        pageIndex: '1', //--------------页码 *
        pageSize: '10', //-------------------条数 *
        taskNo: '', //-------------------任务编号
        taskName: '', //--------------------任务名称
        assignUserId: '', //---------------分配人id
        currentUserId: '', //------------------当前负责人id
        projectId: projectId, //---------------项目id
        devStageStartDateStart: '', //-----------------计划开始日期(开发)搜索  (到日)
        devStageStartDateEnd: '', //-----------------计划开始日期(开发)搜索搜索  (到日)
        devStageEndDateStart: '', //-----------------计划开始日期(截止)搜索搜索  (到日)
        devStageEndDateEnd: '', //-----------------计划开始日期(截止)搜索搜索  (到日)
        status: '', //------------------状态  (待开发状态 3  开发中 4)
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
            fieldName: 'assignUserName', //---------------分配人id
            sort: '',
          },
          {
            fieldName: 'currentUserName', //------------------当前负责人id
            sort: '',
          },
          {
            fieldName: 'devStageStartDate', //---------------------创建时间
            sort: '',
          },
          {
            fieldName: 'devStageEndDate', //--------------------------计划开始日期(开发)
            sort: '',
          },
          {
            fieldName: 'devStageExpendHours', //----------------------------计划截止日期(开发)
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
        title: '消耗时长(开发)',
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
    },
    [fields, cf] = useState(defaultfields);

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
      title: '分配人',
      dataIndex: 'assignUserName',
      key: 'assignUserName',
      sorter: {
        multiple: 101,
      },
      width: 120,
      ...getColumnSelectProps(
        'assignUserId',
        miss.querySelectListByProjectId && miss.querySelectListByProjectId,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '当前负责人',
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
      title: '预计开始日期',
      dataIndex: 'devStageStartDate',
      key: 'devStageStartDate',
      sorter: {
        multiple: 98,
      },
      width: 140,
      ...getColumnRangeProps(
        'devStageStartDateStart',
        'devStageStartDateEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any) {
        return (
          <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
        );
      },
    },
    {
      title: '预计',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
      sorter: {
        multiple: 97,
      },
      width: 120,
    },
    {
      title: '截止日期(开发)',
      dataIndex: 'devStageEndDate',
      key: 'devStageEndDate',
      sorter: {
        multiple: 96,
      },
      width: 140,
      ...getColumnRangeProps(
        'devStageEndDateStart',
        'devStageEndDateEnd',
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
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
      sorter: {
        multiple: 94,
      },
      width: 120,
      ...getColumnSelectProps(
        'status',
        [
          {
            dicName: '待开发',
            dicKey: 3,
          },
          {
            dicName: '开发中',
            dicKey: 4,
          },
        ],
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
      width: 100,
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
          title={'确认开始开发:' + record.taskName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'miss/MisdevelopStart',
              { id: record.id },
              () => {
                message.success('开始开发:' + record.taskName + '成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  hides(false);
                });
              },
            );
          }}
        >
          <Tooltip title="开始开发">
            <IconButton disabled={record.status != 3} aria-label="delete">
              <PlayCircleOutlineIcon
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
                key: 'edit',
                fullScreen: false,
              };
            });
            cf(defaultfields);
          }}
        >
          <Tooltip title="完成开发">
            <PowerSettingsNewIcon
              color={record.status != 4 ? 'action' : 'error'}
            />
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
              let res = moment(newfields.realFinishTime)
                .startOf('minute')
                .valueOf();
              newfields.realFinishTime = newfields.realFinishTime ? res : '';
              setNewState(dispatch, 'miss/MisdevelopEnd', newfields, () => {
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  message.success('已经完成开发');
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
            submitting={props.loading.effects['miss/MisdevelopEnd']}
          ></InitForm>
        )}
      </Dia>
      <Card title={props.route.name}>
        <AutoTable
          data={miss.MisquerytaskDevelop}
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
}))(MissionDevelop);
