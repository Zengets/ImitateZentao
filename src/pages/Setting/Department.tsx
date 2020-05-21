import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, TreeSelect, Row, Col } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import { Tree, Card, Empty } from 'antd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const { TreeNode } = Tree;

let n = 1;

let Department = (props: any) => {
  let { set, dispatch } = props,
    col = { xs: 24, sm: 24, md: 9, lg: 8, xl: 7, xxl: 6 },
    cols = { xs: 24, sm: 24, md: 15, lg: 16, xl: 17, xxl: 18 };
  let [node, cnode] = useState({});

  useEffect(() => {
    setNewState(dispatch, 'set/DepqueryTreeList', {}, () => {});
  }, []);
  const onSelect = (select: any, info: any) => {
    cnode(() => {
      return info.node;
    });
  };

  console.log(node);
  return (
    <Container maxWidth={'lg'}>
      <Row gutter={12}>
        <Col {...col}>
          <Card title={'部门结构'}>
            <Tree
              defaultExpandAll={true}
              onSelect={onSelect}
              treeData={props.set.DepqueryTreeList.data.dataList}
            />
          </Card>
        </Col>
        <Col {...cols}>
          <Card title={'编辑选中的部门'}>
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
                      - 当前选择 -{' '}
                    </h3>
                  </div>
                  <div style={{ flex: 1, marginTop: 20 }}>
                    <TextField
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
                      {' '}
                      - {node.title}的下级部门 -{' '}
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
                                      return items.key !== item.key;
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
