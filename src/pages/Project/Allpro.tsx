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
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import mockfile from '@/utils/mockfile';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';
import Productdetail from '@/components/Productdetail';
import Projectdetail from '@/components/Projectdetail';

let Allpro = (props: any) => {
  let { proj, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'proj/ProjqueryList',
      postdata: {
        projectNo: '', //项目编号，筛选条件
        projectName: '', //项目名，筛选条件
        productId: '', //产品id，筛选条件
        startMinDate: '', //起止日期，筛选条件
        startMaxDate: '', //起止日期，筛选条件
        endMinDate: '', //起止日期，筛选条件
        endMaxDate: '', //起止日期，筛选条件
        status: '', //状态，筛选条件
        sortList: [
          //排序字段
          {
            fieldName: 'projectNo',
            sort: '',
          },
          {
            fieldName: 'projectName',
            sort: '',
          },
          {
            fieldName: 'productId',
            sort: '',
          },
          {
            fieldName: 'startDate',
            sort: '',
          },
          {
            fieldName: 'endDate',
            sort: '',
          },
          {
            fieldName: 'status',
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
      productId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '产品', //placeholder
        name: ['productId'], //唯一标识
        required: false, //必填？
        options: proj.ProdqueryAllSelect && proj.ProdqueryAllSelect,
      },
      projectNo: {
        value: '', //初始化值
        type: 'input', //类型
        title: '项目编号', //placeholder
        name: ['projectNo'], //唯一标识
        required: true, //必填？
      },
      projectName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '项目名称', //placeholder
        name: ['projectName'], //唯一标识
        required: true, //必填？
      },
      availableDays: {
        value: '', //初始化值
        type: 'inputnumber',
        title: '可用工日',
        name: ['availableDays'],
        required: true,
      },
      description: {
        value: '', //初始化值
        type: 'textarea',
        title: '项目描述',
        name: ['description'],
        required: false,
        rows: 6,
        col: { span: 24 },
      },
      startDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '预计开始日期',
        name: ['startDate'],
        required: true,
      },
      endDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '截止日期',
        name: ['endDate'],
        required: true,
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
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(
      dispatch,
      'proj/ProjqueryProjectStatusSelectList',
      {},
      () => {},
    );
    setNewState(dispatch, 'proj/ProdqueryAllSelect', {}, () => {});
  }, []);

  let columns = [
    {
      title: '项目编号',
      dataIndex: 'projectNo',
      key: 'projectNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSearchProps('projectNo', post.postdata, handleSearch),
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: {
        multiple: 99,
      },
      ellipsis: true,
      ...getColumnSearchProps('projectName', post.postdata, handleSearch),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'proj/ProjqueryById',
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
      title: '所属产品',
      dataIndex: 'productName',
      key: 'productName',
      sorter: {
        multiple: 98,
      },
      ellipsis: true,
      ...getColumnSelectProps(
        'productId',
        proj.ProdqueryAllSelect,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '预计开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: {
        multiple: 97,
      },
      width: 160,
      ...getColumnRangeProps(
        'startMinDate',
        'startMaxDate',
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
      title: '截止日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      sorter: {
        multiple: 98,
      },
      ...getColumnRangeProps(
        'endMinDate',
        'endMaxDate',
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
      title: '预计工时(h)',
      dataIndex: 'planHours',
      width: 120,
    },
    {
      title: '消耗工时(h)',
      dataIndex: 'expendHours',
      width: 120,
    },
    {
      title: '剩余工时(h)',
      dataIndex: 'leftHours',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
      sorter: {
        multiple: 98,
      },
      width: 120,

      ...getColumnSelectProps(
        'status',
        proj.ProjqueryProjectStatusSelectList,
        post.postdata,
        handleSearch,
      ),
      render: (text: React.ReactNode, record: { status: any }) => (
        <span style={{ color: rendercolor('Projuctstatus', record.status) }}>
          {text}
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 170,
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
          title={'确认开始' + record.projectName + '？'}
          onConfirm={() => {
            setNewState(dispatch, 'proj/Projstart', { id: record.id }, () => {
              message.success('开始' + record.projectName + '成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
            });
          }}
        >
          <Tooltip title="开始">
            <IconButton disabled={record.status != 1}>
              <PlayCircleOutlineIcon
                color={record.status != 1 ? 'action' : 'primary'}
              />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认完成' + record.projectName + '？'}
          onConfirm={() => {
            setNewState(dispatch, 'proj/Projfinish', { id: record.id }, () => {
              message.success(record.projectName + '完成成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
            });
          }}
        >
          <Tooltip title="完成">
            <IconButton disabled={record.status != 2 && record.status != 3}>
              <PowerSettingsNewIcon
                color={
                  record.status != 2 && record.status != 3
                    ? 'action'
                    : 'primary'
                }
              />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status == 4 || record.status == 5}
          onClick={() => {
            cf({
              productId: {
                ...fields.productId,
                value: record.productId, //初始化值
                options: proj.ProdqueryAllSelect && proj.ProdqueryAllSelect,
              },
              projectNo: {
                ...fields.projectNo,
                value: record.projectNo, //初始化值
              },
              projectName: {
                ...fields.projectName,
                value: record.projectName, //初始化值
              },
              availableDays: {
                ...fields.availableDays,
                value: record.availableDays, //初始化值
              },
              description: {
                ...fields.description,
                value: record.description, //初始化值
              },
              startDate: {
                ...fields.startDate,
                value: record.startDate
                  ? moment(parseInt(record.startDate))
                  : undefined, //初始化值
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
                title: '修改' + record.projectName,
                key: 'edit',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <Tooltip title="修改">
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
          title={'确认删除' + record.projectName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'proj/ProjdeleteById',
              { id: record.id },
              () => {
                message.success('删除' + record.projectName + '成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  localStorage.removeItem('val');
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
                'proj/ProdqueryInfo',
                { id: proj.ProjqueryById.data.data.productId },
                (res: any) => {
                  Modal.info({
                    style: { top: 20 },
                    zIndex: 999999,
                    width: 800,
                    maskClosable: true,
                    title: proj.ProjqueryById.data.data.productName,
                    content: <Productdetail maindata={res.data.data} />,
                    okText: '晓得了',
                  });
                },
              );
            }}
            renderAction={() => renderAction(iftype.curitem)}
            maindata={proj.ProjqueryById.data.data}
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
              newfields.startDate = newfields.startDate
                ? moment(newfields.startDate)
                    .startOf('day')
                    .valueOf()
                : '';
              newfields.endDate = newfields.endDate
                ? moment(newfields.endDate)
                    .startOf('day')
                    .valueOf()
                : '';

              setNewState(dispatch, 'proj/Projsave', newfields, () => {
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
            submitting={props.loading.effects['proj/Projsave']}
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
                    title: '新增项目',
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
          data={proj.ProjqueryList}
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

export default connect(({ proj, loading }: any) => ({
  proj,
  loading,
}))(Allpro);
