import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Tooltip,
  Tree,
  Input,
  message,
  Table,
  Card,
  Popconfirm,
  Divider,
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
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';

let Charactor = (props: any) => {
  let { set, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'set/ChaqueryList',
      postdata: {
        pageIndex: '1',
        pageSize: '10',
        sortList: [
          //--------------------------排序
          {
            fieldName: 'roleNo', //---------编号
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
      roleName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '角色名称', //placeholder
        name: ['roleName'], //唯一标识
        required: true, //必填？
      },
      roleNo: {
        value: '', //初始化值
        type: 'input', //类型
        title: '角色编号', //placeholder
        name: ['roleNo'], //唯一标识
        required: true, //必填？
      },
      description: {
        value: '', //初始化值
        type: 'textarea', //类型
        title: '描述', //placeholder
        name: ['description'], //唯一标识
        required: true, //必填？
        col: { span: 24 },
        rows: 6,
      },
    },
    [fields, cf] = useState(defaultfields),
    [permissionIdList, cp] = useState([]);

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(dispatch, 'set/UserqueryAll', {}, () => {}); //用户列表
    setNewState(dispatch, 'set/UserqueryWechatList', {}, () => {}); //微信列表
    setNewState(dispatch, 'set/UserqueryTreeList', {}, () => {}); //部门树
    setNewState(dispatch, 'set/UserqueryAllSelect', {}, () => {}); //部门树
  }, []);

  let columns = [
    {
      title: '角色编号',
      sorter: {
        multiple: 98,
      },
      dataIndex: 'roleNo',
      key: 'roleNo',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      sorter: {
        multiple: 100,
      },
    },
    {
      title: '描述',
      sorter: {
        multiple: 98,
      },
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          onClick={() => {
            cf({
              roleName: {
                ...fields.roleName,
                value: record.roleName, //初始化值
              },
              roleNo: {
                ...fields.roleNo,
                value: record.roleNo, //初始化值
              },
              description: {
                ...fields.description,
                value: record.description, //初始化值
              },
            });
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '修改角色信息',
                key: 'edit',
                curitem: record,
              };
            });
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
        <Divider type="vertical"></Divider>

        <Popconfirm
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认删除该角色？'}
          onConfirm={() => {
            setNewState(dispatch, 'set/Chadelete', { id: record.id }, () => {
              message.success('删除成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
            });
          }}
        >
          <IconButton aria-label="delete">
            <DeleteIcon color="error" />
          </IconButton>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setNewState(
              dispatch,
              'set/ChaqueryAllByRoleId',
              { roleId: record.id },
              () => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '角色关联权限',
                    key: 'link',
                    curitem: record,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="关联权限">
            <LinkIcon color="default" />
          </Tooltip>
        </IconButton>
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
    cp(set.ChaqueryAllByRoleId.data.data.haveIdList);
  }, [iftype]);

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
        footer={
          iftype.key == 'link' ? false : <div style={{ height: 24 }}></div>
        }
        onOk={() => {
          let postData = {
            roleId: iftype.curitem.id,
            permissionIdList: permissionIdList.checked,
          };
          setNewState(dispatch, 'set/Chamissave', postData, () => {
            setNewState(dispatch, post.posturl, post.postdata, () => {
              ciftype(() => {
                return {
                  ...iftype,
                  visible: false,
                };
              });
            });
            message.success('授权成功');
          });
        }}
      >
        {iftype.key == 'link' ? (
          <div>
            <Tree
              checkStrictly={true}
              checkable
              defaultExpandAll={true}
              onCheck={(checkedKeys: any, info: any) => {
                cp(checkedKeys);
              }}
              checkedKeys={permissionIdList}
              treeData={set.ChaqueryAllByRoleId.data.data.premList}
            />
          </div>
        ) : (
          <InitForm
            fields={fields}
            submitData={() => {
              let isthen = false;
              console.log(fields);
              let newfields = JSON.parse(JSON.stringify(fields));
              for (let i in newfields) {
                newfields[i] = newfields[i].value;
              }
              if (isthen) {
                return;
              }
              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
              }
              setNewState(dispatch, 'set/Chasave', newfields, () => {
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
            submitting={props.loading.effects['model/Chasave']}
          ></InitForm>
        )}
      </Dia>
      <Card
        title={props.route.name}
        extra={
          <div>
            <IconButton
              style={{ padding: 8 }}
              onClick={() => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '新增角色',
                    key: 'add',
                  };
                });
                cf(defaultfields);
              }}
            >
              <AddCircleOutlineIcon style={{ fontSize: 22, color: '#000' }} />
            </IconButton>
          </div>
        }
      >
        <AutoTable
          scroll={'false'}
          data={set.ChaqueryList}
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
}))(Charactor);
