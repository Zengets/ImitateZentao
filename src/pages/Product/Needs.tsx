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
import Needsdetail from '@/components/Needsdetail';
import { models } from './../../.umi/plugin-model/Provider';

let Needs = (props: any) => {
  let { prod, model, dispatch, loading } = props,
    productId = model.prod,
    [post, cpost] = useState({
      posturl: 'prod/umRequirequeryList',
      postdata: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        requireNo: '', // 需求编号
        priorityType: '', // 优先级，1：高，2：中，3：低
        requireName: '', // 需求名称
        createUserId: '', // 创建人
        projectId: '', // 项目主键（在项目需求列表中必传）
        status: '', // 状态， 1：未激活、2：已激活、3：已关闭
        stage: '', // 阶段，1：未开始、2：已立项、2：研发中、3：已完成
        productId: productId, // 产品主键（在产品需求列表中必传）
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
        value: productId, //初始化值
        type: 'select', //类型
        title: '所属产品', //placeholder
        name: ['productId'], //唯一标识
        required: true, //必填？
        disabled: true,
        options: model.ProdqueryAllSelectAll && model.ProdqueryAllSelectAll,
      },
      priorityType: {
        value: '', //初始化值
        type: 'select', //类型
        title: '优先级', //placeholder
        name: ['priorityType'], //唯一标识
        required: true, //必填？
        options: prod.Bugpriority && prod.Bugpriority,
      },
      requireName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '需求名称', //placeholder
        name: ['requireName'], //唯一标识
        required: true, //必填？
      },
      requireDescription: {
        value: '<p></p>', //初始化值
        type: 'editor',
        title: '需求描述',
        name: ['requireDescription'],
        required: true,
        height: 240,
        col: { span: 24 },
      },
      acceptStandard: {
        value: '<p></p>', //初始化值
        type: 'editor',
        title: '验收标准',
        name: ['acceptStandard'],
        required: false,
        height: 240,
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

  useEffect(() => {
    setNewState(dispatch, 'prod/Bugpriority', {}, () => {});
    setNewState(dispatch, 'prod/UserqueryAll', {}, () => {});
    setNewState(dispatch, 'prod/queryRequireStatusSelectList', {}, () => {});
    setNewState(dispatch, 'prod/queryRequireStageSelectList', {}, () => {});
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
      ...getColumnSearchProps('requireNo', post.postdata, handleSearch),
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
        prod.Bugpriority,
        post.postdata,
        handleSearch,
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
      dataIndex: 'requireName',
      key: 'requireName',
      ...getColumnSearchProps('requireName', post.postdata, handleSearch),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'prod/queryDetailInfo',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
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
      ...getColumnSelectProps(
        'createUserId',
        prod.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSelectProps(
        'projectId',
        prod.umRequiretoproj,
        post.postdata,
        handleSearch,
      ),
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
        prod.queryRequireStatusSelectList,
        post.postdata,
        handleSearch,
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
        prod.queryRequireStageSelectList,
        post.postdata,
        handleSearch,
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
          title={'确认激活' + record.requireName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'prod/Requireactivate',
              { id: record.id },
              () => {
                message.success('激活' + record.requireName + '成功！');
                setNewState(
                  dispatch,
                  post.posturl,
                  post.postdata,
                  (res: any) => {
                    let result = res.data.page.list;
                    ciftype({
                      ...iftype,
                      curitem: result.filter((items: any) => {
                        return items.id == record.id;
                      })[0],
                    });
                  },
                );
              },
            );
          }}
        >
          <Tooltip title="激活">
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
          title={'确认关闭' + record.requireName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'prod/Requireclose',
              { id: record.id },
              () => {
                message.success(record.requireName + '关闭成功！');
                setNewState(
                  dispatch,
                  post.posturl,
                  post.postdata,
                  (res: any) => {
                    let result = res.data.page.list;
                    ciftype({
                      ...iftype,
                      curitem: result.filter((items: any) => {
                        return items.id == record.id;
                      })[0],
                    });
                  },
                );
              },
            );
          }}
        >
          <Tooltip title="关闭">
            <IconButton disabled={record.status != 2}>
              <PowerSettingsNewIcon
                color={record.status != 2 ? 'action' : 'primary'}
              />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <IconButton
          disabled={record.status == 3}
          onClick={() => {
            cf({
              productId: {
                ...fields.productId,
                value: record.productId, //初始化值
                options:
                  model.ProdqueryAllSelectAll && model.ProdqueryAllSelectAll,
              },
              priorityType: {
                ...fields.priorityType,
                value: record.priorityType, //初始化值
                options: prod.Bugpriority && prod.Bugpriority,
              },
              requireName: {
                ...fields.requireName,
                value: record.requireName, //初始化值
              },
              requireDescription: {
                ...fields.requireDescription,
                value: record.requireDescription, //初始化值
              },
              acceptStandard: {
                ...fields.acceptStandard,
                value: record.acceptStandard, //初始化值
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
                title: '修改' + record.requireName,
                key: 'edit',
                curitem: record,
                fullScreen: false,
              };
            });
          }}
        >
          <Tooltip title="修改">
            <EditIcon color={record.status == 3 ? 'action' : 'primary'} />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>

        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认删除' + record.requireName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'prod/RequiredeleteById',
              { id: record.id },
              () => {
                message.success('删除' + record.requireName + '成功！');
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

  function handleSearch(value: any, dataIndex: any) {
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
    if (productId) {
      cpost({
        ...post,
        postdata: {
          ...post.postdata,
          productId,
        },
      });
      setNewState(dispatch, 'prod/umRequiretoproj', { productId }, () => {});
    }
  }, [model.prod]);

  useMemo(() => {
    if (!productId) {
      return;
    }
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
          <Needsdetail
            renderAction={() => renderAction(iftype.curitem)}
            maindata={prod.queryDetailInfo.data.data}
          ></Needsdetail>
        ) : (
          iftype.visible && (
            <InitForm
              fields={fields}
              submitData={(value: any) => {
                let newfields = value;
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

                setNewState(dispatch, 'prod/Requiresave', newfields, () => {
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
              onChange={(newFields: any) => {}}
              submitting={props.loading.effects['prod/Requiresave']}
            ></InitForm>
          )
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
                    title: '新增产品',
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
          data={prod.umRequirequeryList}
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

export default connect(({ prod, model, loading }: any) => ({
  prod,
  model,
  loading,
}))(Needs);
