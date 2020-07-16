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
import TouchAppIcon from '@material-ui/icons/TouchApp';

let FourthChildA = ({ dispatch, home, model, loading, miss }: any) => {
  let [dataList, cdata] = useState([]),
    [post, cpost] = useState({
      posturl: 'home/IndexFifth',
      postdata: {
        taskNo: '', //任务编号
        taskName: '', //任务名
        currentUserId: '', //当前负责人id
        devStageEndDateStart: '', //-----------------截止日期搜索  (到日)
        devStageEndDateEnd: '', //-----------------截止日期搜索  (到日)
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
            fieldName: 'devStageEndDate', //截止日期
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
    defaultfields: any = {},
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
                'miss/MisquerytaskDetails',
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
      ...getColumnSearchProps('currentUserName', post.postdata, handleSearch),
      render: (text: any, record: any) =>
        record.status == 7 || record.status == 8 ? (
          <span>{text}</span>
        ) : (
          <IconButton
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
                      options: res.data.dataList,
                    },
                    devStagePlanHours: {
                      value: record.devStagePlanHours, //初始化值
                      type: 'inputnumber',
                      title: '预计时长',
                      min: 1,
                      name: ['devStagePlanHours'],
                      required: true,
                      hides: !(record.status == 3 || record.status == 4),
                    },
                    remark: {
                      value: '', //初始化值
                      type: 'textarea',
                      title: '备注',
                      name: ['remark'],
                      required: false,
                      rows: 6,
                      col: { span: 24 },
                    },
                  });
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: true,
                      title: `[${record.taskNo}]${record.taskName}`,
                      curitem: record,
                      fullScreen: false,
                      key: 'changecharge',
                    };
                  });
                },
              );
            }}
            className={styles.did}
          >
            <a style={{ marginLeft: 4 }}>{text}</a>
            <div className="hides">
              <TouchAppIcon
                color="primary"
                style={{ fontSize: 20 }}
              ></TouchAppIcon>
            </div>
          </IconButton>
        ),
    },
    {
      title: '截止日期',
      dataIndex: 'devStageEndDate',
      key: 'devStageEndDate',
      width: 120,
      sorter: {
        multiple: 95,
      },
      ...getColumnRangeProps(
        'devStageEndDateStart',
        'devStageEndDateEnd',
        post.postdata,
        handleSearch,
      ),
      render(text: any, record: any) {
        return (
          <span
            style={{
              color: record.ifDelay == 1 ? '#666' : '#fff',
              backgroundColor: record.ifDelay == 1 ? 'transparent' : '#e84e0f',
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
                    let result = res.data.dataList;
                    setNewState(
                      dispatch,
                      'miss/MisquerytaskDetails',
                      { id: record.id },
                      (resr: any) => {
                        ciftype({
                          ...iftype,
                          resdata: resr.data.data,
                          curitem: result.filter((items: any) => {
                            return items.id == record.id;
                          })[0],
                        });
                      },
                    );
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
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
                cf({
                  currentUserId: {
                    value: '', //初始化值
                    type: 'select', //类型
                    title: '指派给', //placeholder
                    name: ['currentUserId'], //唯一标识
                    required: true, //必填？
                    options: res.data.dataList,
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
                });
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
              },
            );
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
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
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
                    options: res.data.dataList,
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
              },
            );
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
            setNewState(
              dispatch,
              'miss/querySelectListByProjectId',
              { projectId: record.projectId },
              (res: any) => {
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
                    options: res.data.dataList,
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
              },
            );
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
                let result = res.data.dataList;
                setNewState(
                  dispatch,
                  'miss/MisquerytaskDetails',
                  { id: record.id },
                  (resr: any) => {
                    ciftype({
                      ...iftype,
                      resdata: resr.data.data,
                      curitem: result.filter((items: any) => {
                        return items.id == record.id;
                      })[0],
                    });
                  },
                );
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
                    width: 1200,
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
            maindata={iftype.resdata}
            renderAction={() => renderAction(iftype.curitem)}
          ></Missiondetail>
        ) : (
          iftype.visible && (
            <InitForm
              fields={fields}
              submitData={(values: any) => {
                let newfields = JSON.parse(JSON.stringify(values));
                newfields.id = iftype.curitem.id;
                if (iftype.key == 'changecharge') {
                  setNewState(dispatch, 'miss/Misassign', newfields, () => {
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
                if (iftype.key == 'finishdev') {
                  let res = moment(newfields.realFinishTime)
                    .startOf('minute')
                    .valueOf();
                  newfields.realFinishTime = newfields.realFinishTime
                    ? res
                    : '';
                  setNewState(dispatch, 'miss/MisdevelopEnd', newfields, () => {
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
                }
              }}
              submitting={
                loading.effects['miss/Misassign'] ||
                loading.effects['miss/MisdevelopEnd'] ||
                loading.effects['miss/Mistest'] ||
                loading.effects['miss/Mischeck'] ||
                !iftype.visible
              }
            ></InitForm>
          )
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
