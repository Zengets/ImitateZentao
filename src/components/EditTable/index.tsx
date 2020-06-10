import { Table, Input, Divider, Tooltip } from 'antd';
import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
let n = 1;
export default function EditTable({ value, onChange }: any) {
  let [defaultvalue, cd] = useState(true),
    [expandedRowKeys, cexpend] = useState([]);

  let columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: React.ReactNode) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: '步骤',
      dataIndex: 'step',
      key: 'step',
      render: (text: string | number | string[] | undefined, record: any) => {
        return (
          <Input
            value={text}
            onChange={(e: any) => {
              e.stopPropagation();
              let newdata: any = [];
              if (record.children) {
                //父级修改逻辑
                newdata = value.map((item: any) => {
                  if (item.id == record.id) {
                    item.step = e.target.value;
                  }
                  return item;
                });
              } else {
                //子集修改逻辑
                newdata = value.map((item: any) => {
                  if (record.parentId == item.id) {
                    item.children = item.children.map((it: any) => {
                      if (it.id == record.id) {
                        it.step = e.target.value;
                      }
                      return it;
                    });
                  }
                  return item;
                });
              }

              onChange(newdata);
            }}
          />
        );
      },
    },
    {
      title: '预期',
      dataIndex: 'expection',
      key: 'expection',
      render: (text: string | number | string[] | undefined, record: any) => {
        if (record.children && record.children.length > 0) {
          return <span style={{ color: '#999' }}>父级无预期行为</span>;
        } else {
          return (
            <Input
              value={text}
              onChange={(e: any) => {
                e.stopPropagation();
                let newdata: any = [];
                if (record.children) {
                  //父级修改逻辑
                  newdata = value.map((item: any) => {
                    if (item.id == record.id) {
                      item.expection = e.target.value;
                    }
                    return item;
                  });
                } else {
                  //子集修改逻辑
                  newdata = value.map((item: any) => {
                    if (record.parentId == item.id) {
                      item.children = item.children.map((it: any) => {
                        if (it.id == record.id) {
                          it.expection = e.target.value;
                        }
                        return it;
                      });
                    }
                    return item;
                  });
                }
                onChange(newdata);
              }}
            />
          );
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: any) => {
        if (record.children) {
          return (
            <div>
              <IconButton
                onClick={() => {
                  n++;
                  let addobj = {
                    id: record.id + n + 'tts',
                    step: '',
                    expection: '',
                    children: [],
                  };
                  value.push(addobj);
                  onChange(JSON.parse(JSON.stringify(value)));
                }}
              >
                <Tooltip title="新增父级">
                  <AddCircleOutlineIcon color="primary"></AddCircleOutlineIcon>
                </Tooltip>
              </IconButton>
              <Divider type="vertical"></Divider>
              <IconButton
                onClick={() => {
                  n++;
                  let addobj = {
                    id: record.id + n + 'ttschild',
                    parentId: record.id,
                    step: '',
                    expection: '',
                  };
                  let newdata = value.map((item: any, i: any) => {
                    if (item.id == record.id) {
                      item.children.unshift(addobj);
                    }
                    return item;
                  });
                  onChange(newdata);
                  if (expandedRowKeys.indexOf(record.id) == -1) {
                    expandedRowKeys.push(record.id);
                    cexpend([...expandedRowKeys]);
                  }
                }}
              >
                <Tooltip title="新增子级">
                  <AddCircleIcon></AddCircleIcon>
                </Tooltip>
              </IconButton>
              <Divider type="vertical"></Divider>

              {value.length == 1 ? null : (
                <IconButton
                  onClick={() => {
                    let newdata = value.filter((it: { id: any }) => {
                      return it.id != record.id;
                    });
                    onChange(newdata);
                  }}
                >
                  <Tooltip title="删除">
                    <HighlightOffIcon color="error"></HighlightOffIcon>
                  </Tooltip>
                </IconButton>
              )}
            </div>
          );
        } else {
          return (
            <div>
              <IconButton
                onClick={() => {
                  let newdata = value.map((item: any, i: any) => {
                    if (record.parentId == item.id) {
                      item.children = item.children.filter(
                        (it: { id: any }) => {
                          return it.id != record.id;
                        },
                      );
                    }
                    return item;
                  });
                  onChange(newdata);
                }}
              >
                <Tooltip title="删除">
                  <HighlightOffIcon color="error"></HighlightOffIcon>
                </Tooltip>
              </IconButton>
            </div>
          );
        }
      },
    },
  ];

  useEffect(() => {
    if (value && defaultvalue) {
      cd(false);
    }
  }, [value]);

  return (
    <div style={{ border: '#ddd solid 1px' }}>
      <Table
        dataSource={value}
        columns={columns}
        rowKey={'id'}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record: any) => {
            if (expanded) {
              expandedRowKeys.push(record.id);
              cexpend([...expandedRowKeys]);
            } else {
              cexpend(
                expandedRowKeys.filter((item: any) => {
                  return item != record.id;
                }),
              );
            }
          },
        }}
      ></Table>
    </div>
  );
}
