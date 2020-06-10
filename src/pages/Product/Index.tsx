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
import Productdetail from '@/components/Productdetail';

let Product = (props: any) => {
  let { prod, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'prod/ProdqueryList',
      postdata: {
        pageIndex: '1', //----------------页码 *
        pageSize: '10', //-----------------条数*
        productNo: '', //----------------产品编号
        productName: '', //--------------产品名称
        chargeUserId: '', //-------------产品负责人
        openUserId: '', //---------------创建人
        status: '', //-----------------状态
        openDateStart: '', //-------------------创建日期搜索
        openDateEnd: '', //-------------------创建日期搜索
        activateDateStart: '', //-------------------激活日期搜索
        activateDateEnd: '', //-------------------激活日期搜索
        closeDateStart: '', //-------------------关闭日期搜索
        closeDateEnd: '', //-------------------关闭日期搜索
        sortList: [
          //----------------------------------排序字段集合
          {
            fieldName: 'productNo', //---------编号
            sort: '',
          },
          {
            fieldName: 'productName', //------------名称
            sort: '',
          },
          {
            fieldName: 'chargeUserId', //--------------负责人
            sort: '',
          },
          {
            fieldName: 'openUserId', //----------------创建人
            sort: '',
          },
          {
            fieldName: 'openDate', //----------------创建日期
            sort: '',
          },
          {
            fieldName: 'activateDate', //----------------激活日期
            sort: '',
          },
          {
            fieldName: 'closeDate', //----------------关闭日期
            sort: '',
          },
          {
            fieldName: 'status', //---------------状态
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
      productNo: {
        value: '', //初始化值
        type: 'input', //类型
        title: '产品编号', //placeholder
        name: ['productNo'], //唯一标识
        required: true, //必填？
      },
      productName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '产品名称', //placeholder
        name: ['productName'], //唯一标识
        required: true, //必填？
      },
      chargeUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '产品负责人', //placeholder
        name: ['chargeUserId'], //唯一标识
        required: true, //必填？
        options: prod.UserqueryAll && prod.UserqueryAll,
      },
      description: {
        value: '', //初始化值
        type: 'textarea',
        title: '产品描述',
        name: ['description'],
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

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(dispatch, 'prod/UserqueryAll', {}, () => {});
    setNewState(dispatch, 'prod/ProdqueryStatus', {}, () => {});
  }, []);

  let columns = [
    {
      title: '产品编号',
      dataIndex: 'productNo',
      key: 'productNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSearchProps('productNo', post.postdata, handleSearch),
    },
    {
      title: '产品名称',
      sorter: {
        multiple: 99,
      },
      ellipsis: true,
      dataIndex: 'productName',
      key: 'productName',
      ...getColumnSearchProps('productName', post.postdata, handleSearch),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'prod/ProdqueryInfo',
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
      title: '产品负责人',
      sorter: {
        multiple: 98,
      },
      width: 120,
      dataIndex: 'chargeUserName',
      key: 'chargeUserName',
      ...getColumnSelectProps(
        'chargeUserId',
        prod.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '创建人',
      sorter: {
        multiple: 97,
      },
      width: 120,
      dataIndex: 'openUserName',
      key: 'openUserName',
      ...getColumnSelectProps(
        'openUserId',
        prod.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '创建日期',
      sorter: {
        multiple: 96,
      },
      width: 120,
      dataIndex: 'openDate',
      key: 'openDate',
      render(text: any) {
        return (
          <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
        );
      },
    },
    {
      title: '激活日期',
      sorter: {
        multiple: 95,
      },
      width: 120,
      dataIndex: 'activateDate',
      key: 'activateDate',
      render(text: any) {
        return (
          <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
        );
      },
    },
    {
      title: '关闭日期',
      sorter: {
        multiple: 94,
      },
      dataIndex: 'closeDate',
      key: 'closeDate',
      width: 120,
      render(text: any) {
        return (
          <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
        );
      },
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
        prod.ProdqueryStatus,
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
          title={'确认激活' + record.productName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'prod/Prodactivation',
              { id: record.id },
              () => {
                message.success('激活' + record.productName + '成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  hides(false);
                });
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
          title={'确认关闭' + record.productName + '？'}
          onConfirm={() => {
            setNewState(dispatch, 'prod/Prodclose', { id: record.id }, () => {
              message.success(record.productName + '关闭成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {
                hides(false);
              });
            });
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
              productNo: {
                ...fields.productNo,
                value: record.productNo, //初始化值
              },
              productName: {
                ...fields.productName,
                value: record.productName, //初始化值
              },
              chargeUserId: {
                ...fields.chargeUserId,
                value: record.chargeUserId, //初始化值
              },
              description: {
                ...fields.description,
                value: record.description, //初始化值
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
                title: '修改' + record.productName,
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
          title={'确认删除' + record.productName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'prod/ProddeleteById',
              { id: record.id },
              () => {
                message.success('删除' + record.productName + '成功！');
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
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post]);

  useMemo(() => {
    cf(defaultfields);
  }, [prod]);

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
          <Productdetail
            renderAction={() => renderAction(iftype.curitem)}
            maindata={prod.ProdqueryInfo.data.data}
          ></Productdetail>
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

              setNewState(dispatch, 'prod/Prodsave', newfields, () => {
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
            submitting={props.loading.effects['model/Prodsave']}
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
          data={prod.ProdqueryList}
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

export default connect(({ prod, loading }: any) => ({
  prod,
  loading,
}))(Product);
