import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Input,
  message,
  Table,
  Card,
  Popconfirm,
  Divider,
  Tooltip,
} from 'antd';
import TextField from '@material-ui/core/TextField';
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
import EditIcon from '@material-ui/icons/Edit';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

let SetUser = (props: any) => {
  let { set, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'set/UserqueryList',
      postdata: {
        pageIndex: '1', //--------页码 *
        pageSize: '10', //--------条数 *
        realName: '', //--------姓名
        userNo: '', //---------用户编号
        accountName: '', //--------用户名
        superId: '', //---------上级领导key
        workwechatId: '', //----------企业微信key
        jobTitle: '', //-----------职位
        departmentId: '', //----------------部门key
        telephone: '', //---------------------联系电话
        mailNo: '', //----------------邮箱
        startDate: '', //--------------开始时间
        endDate: '', //-----------------结束时间
        sortList: [
          //------------------------------------------------------排序字段
          {
            fieldName: 'userNo', //-------编号
            sort: false,
          },
          {
            fieldName: 'realName', //-----------姓名
            sort: '',
          },
          {
            fieldName: 'accountName', //----------------用户名
            sort: '',
          },
          {
            fieldName: 'departmentId', //--------------------部门id
            sort: '',
          },
          {
            fieldName: 'jobTitle', //---------------------职位
            sort: '',
          },
          {
            fieldName: 'superId', //------------------------直属领导id
            sort: '',
          },
        ],
      },
    }),
    [iftype, ciftype] = useState({
      curitem: {},
      visible: false,
      title: '',
      key: '',
    }),
    defaultfields: any = {
      userNo: {
        value: '', //初始化值
        type: 'input', //类型
        title: '编号', //placeholder
        name: ['userNo'], //唯一标识
        required: true, //必填？
      },
      realName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '姓名', //placeholder
        name: ['realName'], //唯一标识
        required: true, //必填？
      },
      accountName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '用户名', //placeholder
        name: ['accountName'], //唯一标识
        required: true, //必填？
      },
      password: {
        value: '123456', //初始化值
        type: 'input', //类型
        title: '密码', //placeholder
        name: ['password'], //唯一标识
        required: false, //必填？
        disabled: true,
      },
      departmentId: {
        value: '', //初始化值
        type: 'treeselect',
        title: '部门',
        name: ['departmentId'],
        required: true,
        options: set.UserqueryTreeList && set.UserqueryTreeList,
      },
      workwechatId: {
        value: '', //初始化值
        type: 'select',
        title: '企业微信',
        name: ['workwechatId'],
        required: true,
        options: set.UserqueryWechatList && set.UserqueryWechatList,
      },
      roleId: {
        value: '', //初始化值
        type: 'select',
        title: '角色',
        name: ['roleId'],
        required: true,
        options: set.UserqueryAllSelect && set.UserqueryAllSelect,
      },
      jobTitle: {
        value: '', //初始化值
        type: 'input',
        title: '职位',
        name: ['jobTitle'],
        required: false,
      },
      superId: {
        value: '', //初始化值
        type: 'select',
        title: '直属领导',
        name: ['superId'],
        required: false,
        options: set.UserqueryAll && set.UserqueryAll,
      },
      telephone: {
        value: '', //初始化值
        type: 'input',
        title: '电话',
        name: ['telephone'],
        required: false,
      },
      mailNo: {
        value: '', //初始化值
        type: 'input',
        title: '邮箱',
        name: ['mailNo'],
        required: false,
      },
      entryDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '入职时间',
        name: ['entryDate'],
        required: false,
      },
    },
    [fields, cf] = useState(defaultfields);

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(dispatch, 'set/UserqueryAll', {}, () => {}); //用户列表
    setNewState(dispatch, 'set/UserqueryWechatList', {}, () => {}); //微信列表
    setNewState(dispatch, 'set/UserqueryTreeList', {}, () => {}); //部门树
    setNewState(dispatch, 'set/UserqueryAllSelect', {}, () => {}); //部门树
  }, []);

  let columns = [
    {
      title: '编号',
      dataIndex: 'userNo',
      key: 'userNo',
      sorter: {
        multiple: 100,
      },
      ...getColumnSearchProps('userNo', post.postdata, handleSearch),
    },
    {
      title: '姓名',
      sorter: {
        multiple: 98,
      },
      dataIndex: 'realName',
      key: 'realName',
      ...getColumnSearchProps('realName', post.postdata, handleSearch),
    },
    {
      title: '用户名',
      sorter: {
        multiple: 98,
      },
      dataIndex: 'accountName',
      key: 'accountName',
      ...getColumnSearchProps('accountName', post.postdata, handleSearch),
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
      key: 'departmentName',
      ...getColumnTreeSelectProps(
        'departmentId',
        set.UserqueryTreeList,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '职位',
      sorter: {
        multiple: 95,
      },
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ...getColumnSearchProps('jobTitle', post.postdata, handleSearch),
    },
    {
      title: '直属领导',
      dataIndex: 'superName',
      key: 'superName',
      ...getColumnSelectProps(
        'superId',
        set.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '电话',
      sorter: {
        multiple: 93,
      },
      dataIndex: 'telephone',
      key: 'telephone',
      ...getColumnSearchProps('telephone', post.postdata, handleSearch),
    },
    {
      title: '邮箱',
      sorter: {
        multiple: 92,
      },
      dataIndex: 'mailNo',
      key: 'mailNo',
      ...getColumnSearchProps('mailNo', post.postdata, handleSearch),
    },
    {
      title: '企业微信',
      sorter: {
        multiple: 90,
      },
      dataIndex: 'workwechatName',
      key: 'workwechatName',
      ...getColumnSelectProps(
        'workwechatId',
        set.UserqueryWechatList,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '入职日期',
      sorter: {
        multiple: 89,
      },
      dataIndex: 'entryDate',
      key: 'entryDate',
      ...getColumnRangeProps(
        'startDate',
        'endDate',
        post.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <span>{text ? moment(parseInt(text)).format('YYYY/MM/DD') : ''}</span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          onClick={() => {
            cf({
              userNo: {
                ...fields.userNo,
                value: record.userNo, //初始化值
              },
              realName: {
                ...fields.realName,
                value: record.realName, //初始化值
              },
              accountName: {
                ...fields.accountName,
                value: record.accountName, //初始化值
                disabled: true,
              },
              password: {
                ...fields.password,
                value: '123456', //初始化值
              },
              departmentId: {
                ...fields.departmentId,
                value: record.departmentId, //初始化值
              },
              workwechatId: {
                ...fields.workwechatId,
                value: record.workwechatId, //初始化值
              },
              roleId: {
                ...fields.roleId,
                value: record.roleId, //初始化值
              },
              jobTitle: {
                ...fields.jobTitle,
                value: record.jobTitle, //初始化值
              },
              superId: {
                ...fields.superId,
                value: record.superId, //初始化值
              },
              telephone: {
                ...fields.telephone,
                value: record.telephone, //初始化值
              },
              mailNo: {
                ...fields.mailNo,
                value: record.mailNo, //初始化值
              },
              entryDate: {
                ...fields.entryDate,
                value: record.entryDate
                  ? moment(parseInt(record.entryDate))
                  : undefined, //初始化值
              },
            });
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '修改' + record.realName + '信息',
                key: 'edit',
                curitem: record,
              };
            });
          }}
        >
          <Tooltip title="修改">
            <EditIcon color="primary" />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>

        <Popconfirm
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认删除该人员？'}
          onConfirm={() => {
            setNewState(dispatch, 'set/Userdelete', { id: record.id }, () => {
              message.success('删除成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
            });
          }}
        >
          <Tooltip title="删除">
            <IconButton aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <Popconfirm
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认重置该人员密码？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'set/Userreset',
              { accountId: record.accountId },
              () => {
                message.success('重置成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {});
              },
            );
          }}
        >
          <Tooltip title="重置密码">
            <IconButton aria-label="delete">
              <RotateLeftIcon color="default" />
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
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
          ciftype(() => {
            return {
              ...iftype,
              visible: key,
            };
          });
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        <InitForm
          fields={fields}
          submitData={() => {
            let isthen = false;
            let newfields = JSON.parse(JSON.stringify(fields));

            for (let i in newfields) {
              newfields[i] = newfields[i].value;
            }
            if (isthen) {
              return;
            }

            newfields.entryDate = newfields.entryDate
              ? moment(newfields.entryDate)
                  .startOf('day')
                  .valueOf()
              : '';
            if (iftype.key == 'edit') {
              newfields.id = iftype.curitem.id;
            }
            console.log(newfields);
            delete newfields.password;
            setNewState(dispatch, 'set/Usersave', newfields, () => {
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
          submitting={props.loading.effects['model/Usersave']}
        ></InitForm>
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
                    title: '新增用户',
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
          data={set.UserqueryList}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
          onChange={handleTableChange}
        />
      </Card>
    </Container>
  );
};

export default connect(({ set, loading }: any) => ({
  set,
  loading,
}))(SetUser);
