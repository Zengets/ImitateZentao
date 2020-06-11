import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect } from 'umi';
import Button from '@material-ui/core/Button';
import TreeDom from '@/components/TreeDom';
import { message, Row, Col, Modal, Card, Empty } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ExclamationCircleOutlined } from '@ant-design/icons';

let n = 1;

let Department = (props: any) => {
  let { set, dispatch } = props,
    col = { xs: 24, sm: 24, md: 10, lg: 9, xl: 8, xxl: 7 },
    cols = { xs: 24, sm: 24, md: 14, lg: 15, xl: 16, xxl: 17 };
  let [node, cnode] = useState({});

  useEffect(() => {
    setNewState(dispatch, 'set/DepqueryTreeList', {}, () => {});
    //node改变执行
  }, []);

  const onSelect = (select: any, info: any) => {
    setNewState(
      dispatch,
      'set/DepqueryByParentId',
      { parentId: select[0] },
      (res: any) => {
        cnode(() => {
          return res.data.data;
        });
      },
    );
  };

  return (
    <Container maxWidth={'xl'}>
      <Row gutter={12}>
        <Col {...col}>
          <Card title={props.route.name}>
            <TreeDom
              defaultexpandedKeys={['0']}
              deleteItem={(e: { stopPropagation: () => void }, key: any) => {
                e.stopPropagation();
                Modal.warn({
                  maskClosable: true,
                  title: '是否删除该部门?',
                  okText: '删除',
                  onOk() {
                    setNewState(
                      dispatch,
                      'set/DepdeleteById',
                      { id: key },
                      () => {
                        message.success('删除成功');
                        setNewState(
                          dispatch,
                          'set/DepqueryTreeList',
                          {},
                          () => {},
                        );
                      },
                    );
                  },
                });
              }}
              onSelect={onSelect}
              data={
                props.set.DepqueryTreeList.data.dataList
                  ? props.set.DepqueryTreeList.data.dataList
                  : []
              }
            ></TreeDom>
          </Card>
        </Col>
        <Col {...cols}>
          <Card
            title={'编辑选中的部门'}
            actions={
              node.key && [
                <div style={{ padding: '0 12px' }}>
                  <Button
                    onClick={() => {
                      let ismore = false,
                        postdata = {
                          id: node.key,
                          departmentName: node.title,
                          departmentList: node.children
                            ? node.children.map((it: any, i: any) => {
                                if (!it.title) {
                                  ismore = true;
                                }
                                return {
                                  id: it.key.indexOf('tts') == -1 ? it.key : '',
                                  departmentName: it.title,
                                };
                              })
                            : [],
                        };
                      if (ismore) {
                        message.warn('请完善部门名称后提交');
                        return;
                      }
                      Modal.confirm({
                        title: '是否修改该部门?',
                        icon: <ExclamationCircleOutlined />,
                        content: '修改后将改变当前部门树，点击确定修改',
                        okText: '确定',
                        cancelText: '取消',
                        onOk() {
                          setNewState(dispatch, 'set/Depsave', postdata, () => {
                            message.success('修改成功');
                            setNewState(
                              dispatch,
                              'set/DepqueryTreeList',
                              {},
                              () => {
                                setNewState(
                                  dispatch,
                                  'set/DepqueryByParentId',
                                  { parentId: node.key },
                                  (res: any) => {
                                    cnode(() => {
                                      return res.data.data;
                                    });
                                  },
                                );
                              },
                            );
                          });
                        },
                        onCancel() {},
                      });
                    }}
                    disableElevation
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    保存
                  </Button>
                </div>,
              ]
            }
          >
            {node.key ? (
              <div>
                <div>
                  <div style={{ backgroundColor: '#F9F9F9', padding: 12 }}>
                    <h3
                      style={{
                        color: '#1183fb',
                        textAlign: 'center',
                        margin: 0,
                      }}
                    >
                      {' '}
                      当前选择{' '}
                    </h3>
                  </div>
                  <div style={{ flex: 1, marginTop: 20 }}>
                    <TextField
                      disabled={node.key == 0}
                      fullWidth
                      label="部门名称"
                      value={node.title}
                      onChange={e => {
                        let val = e.target.value;
                        cnode(() => {
                          return {
                            ...node,
                            title: val,
                          };
                        });
                      }}
                    ></TextField>
                  </div>
                </div>
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      backgroundColor: '#F9F9F9',
                      padding: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: 48 }}></div>
                    <h4
                      style={{
                        color: '#1183fb',
                        textAlign: 'center',
                        margin: 0,
                      }}
                    >
                      {node.title}的下级部门
                    </h4>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        n++;
                        let newnode = JSON.parse(JSON.stringify(node));
                        if (!newnode.children) {
                          newnode.children = [];
                        }
                        newnode.children.unshift({
                          key: newnode.key + n + 'tts',
                          title: '',
                        });
                        cnode(() => {
                          return {
                            ...newnode,
                            children: JSON.parse(
                              JSON.stringify(newnode.children),
                            ),
                          };
                        });
                      }}
                    >
                      <AddCircleOutlineIcon
                        color="primary"
                        fontSize="default"
                      />
                    </IconButton>
                  </div>
                  <div style={{ flex: 1, marginTop: 20 }}>
                    {node.children ? (
                      node.children.map((item: any, i: any) => {
                        return (
                          <div style={{ display: 'flex' }} key={i}>
                            <TextField
                              fullWidth
                              value={item.title}
                              style={{ marginBottom: 24, flex: 1 }}
                              label="下级部门名称"
                              onChange={e => {
                                let val = e.target.value;
                                let newnode = JSON.parse(
                                  JSON.stringify(node.children),
                                );
                                newnode = newnode.map(
                                  (it: { key: any; title: string }, k: any) => {
                                    if (it.key == item.key) {
                                      it.title = val;
                                    }
                                    return it;
                                  },
                                );
                                console.log(newnode);
                                cnode(() => {
                                  return {
                                    ...node,
                                    children: newnode,
                                  };
                                });
                              }}
                            ></TextField>
                            <div>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  let newchild = node.children.filter(
                                    (items: any, i: any) => {
                                      return items.key != item.key;
                                    },
                                  );
                                  cnode(() => {
                                    return {
                                      ...node,
                                      children: newchild,
                                    };
                                  });
                                }}
                              >
                                <HighlightOffIcon fontSize="default" />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <Empty description="没有下级部门"></Empty>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Empty description="请选择需要编辑的部门"></Empty>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(({ set, loading }: any) => ({
  set,
  loading: loading.effects['set/User'],
}))(Department);
