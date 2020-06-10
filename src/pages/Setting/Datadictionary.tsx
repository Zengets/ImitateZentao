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
      posturl: 'set/DataqueryTreeList',
      postdata: {
        pageIndex: '1',
        pageSize: '10',
        dicKey: '', //数据编号，筛选条件
        dicName: '', //数据名称，筛选条件
        sourceType: '', //类型，筛选条件（下拉框）
        sortList: [
          //排序字段
          {
            fieldName: 'dicKey', //数据编号
            sort: '',
          },
          {
            fieldName: 'dicName', //数据名称
            sort: '',
          },
          {
            fieldName: 'sourceTypeName', //数据类型名
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
      dicName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '数据字典名称', //placeholder
        name: ['dicName'], //唯一标识
        required: true, //必填？
        col: { span: 24 },
      },
    },
    [fields, cf] = useState(defaultfields),
    [permissionIdList, cp] = useState([]);

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(dispatch, 'set/DataqueryDicTypeSelectList', {}, () => {}); //用户列表
  }, []);

  let columns = [
    {
      title: '数据名称',
      sorter: {
        multiple: 98,
      },
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('dicName', post.postdata, handleSearch),
    },
    {
      title: '数据编号',
      dataIndex: 'no',
      key: 'no',
      sorter: {
        multiple: 97,
      },
      ...getColumnSearchProps('dicKey', post.postdata, handleSearch),
    },
    {
      title: '数据类型名',
      sorter: {
        multiple: 96,
      },
      dataIndex: 'typeName',
      key: 'typeName',
      ...getColumnSelectProps(
        'sourceType',
        set.DataqueryDicTypeSelectList,
        post.postdata,
        handleSearch,
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
        fieldName:
          item.columnKey == 'title'
            ? 'dicName'
            : item.columnKey == 'no'
            ? 'dicKey'
            : 'sourceTypeName',
        sort:
          item.order == 'descend' ? false : item.order == 'ascend' ? true : '',
      };
    });
    console.log(sortList);

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

  //操作...
  function renderAction(record: any) {
    return (
      <div>
        {record.parentKey == '0' && (
          <IconButton
            onClick={() => {
              ciftype(() => {
                return {
                  ...iftype,
                  visible: true,
                  title: '新增数据字典',
                  key: 'add',
                  curitem: record,
                };
              });
              cf(defaultfields);
            }}
          >
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        )}

        {record.parentKey != '0' && record.type == 2 ? (
          <>
            <Divider type="vertical"></Divider>
            <IconButton
              onClick={() => {
                cf({
                  dicName: {
                    value: record.title, //初始化值
                    type: 'input', //类型
                    title: '数据字典名称', //placeholder
                    name: ['dicName'], //唯一标识
                    required: true, //必填？
                    col: { span: 24 },
                  },
                });
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '修改数据字典信息',
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
              title={'确认删除该数据字典？'}
              onConfirm={() => {
                setNewState(
                  dispatch,
                  'set/DatadeleteById',
                  { id: record.key },
                  () => {
                    message.success('删除成功！');
                    setNewState(
                      dispatch,
                      post.posturl,
                      post.postdata,
                      () => {},
                    );
                  },
                );
              }}
            >
              <IconButton aria-label="delete">
                <DeleteIcon color="error" />
              </IconButton>
            </Popconfirm>
          </>
        ) : null}
      </div>
    );
  }
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
            console.log(fields);
            let newfields = JSON.parse(JSON.stringify(fields));
            for (let i in newfields) {
              newfields[i] = newfields[i].value;
            }
            if (isthen) {
              return;
            }
            if (iftype.key == 'edit') {
              newfields = {
                ...newfields,
                id: iftype.curitem.key,
                parentId: iftype.curitem.parentKey,
              };
            } else {
              newfields = {
                ...newfields,
                parentId: iftype.curitem.key,
              };
            }

            setNewState(dispatch, 'set/Datasave', { ...newfields }, () => {
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
          submitting={props.loading.effects['model/Datasave']}
        ></InitForm>
      </Dia>
      <Card title={props.route.name}>
        <AutoTable
          rowKey="key"
          scroll={{ y: '65vh' }}
          data={set.DataqueryTreeList}
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
