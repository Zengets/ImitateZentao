import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import moment from 'moment';
import { Table, Select, Input, Upload, Dropdown, Menu, message } from 'antd';
import setNewState from '@/utils/setNewState';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

let defaultvalue = [
    {
      id: 'fatetts',
      step: '',
      expection: '',
      children: [],
    },
  ],
  { TextArea } = Input;

let DemoAction = (props: any) => {
  let {
      bug,
      dispatch,
      loading,
      model,
      dataSource,
      onChange,
      id,
      cancelFn,
    } = props,
    [expandedRowKeys, cexpend] = useState([]);

  const menu = (record: any, list: any) => (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Menu>
        {list &&
          list.map((item: any, i: any) => {
            return (
              <Menu.Item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 12px',
                }}
              >
                <a target="_blank" href={item.attachUrl}>
                  {item.attachmentName}
                </a>
                <IconButton
                  onClick={() => {
                    let newlist = list.filter((it: any) => {
                      return item.attachUrl != it.attachUrl;
                    });
                    changeProps(record, 'attachmentList', newlist);
                  }}
                >
                  <HighlightOffIcon color="error"></HighlightOffIcon>
                </IconButton>
              </Menu.Item>
            );
          })}
      </Menu>
    </div>
  );

  function changeProps(record: any, key: any, val: any) {
    let newdata: any = [];
    if (record.children) {
      //父级修改逻辑
      newdata = dataSource.map((item: any) => {
        if (item.id == record.id) {
          item[key] = val;
        }
        return item;
      });
    } else {
      //子集修改逻辑
      newdata = dataSource.map((item: any) => {
        if (record.parentId == item.id) {
          item.children = item.children.map((it: any) => {
            if (it.id == record.id) {
              it[key] = val;
            }
            return it;
          });
        }
        return item;
      });
    }
    onChange(newdata);
  }

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
    },
    {
      title: '预期',
      dataIndex: 'expection',
      key: 'expection',
    },
    {
      title: '执行结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
      render: (text: any, record: any) => {
        if (record.children && record.children.length > 0) {
        } else {
          return (
            <Select
              style={{ width: 84 }}
              value={text ? text : '1'}
              onChange={val => {
                changeProps(record, 'result', val);
              }}
            >
              <Select.Option value="1">通过</Select.Option>
              <Select.Option value="0">不通过</Select.Option>
            </Select>
          );
        }
      },
    },
    {
      title: '实际情况',
      dataIndex: 'reality',
      key: 'reality',
      width: 400,
      render: (text: any, record: any) => {
        if (record.children && record.children.length > 0) {
        } else {
          return (
            <TextArea
              value={text ? text : ''}
              rows={1}
              onChange={e => {
                let val = e.target.value;
                changeProps(record, 'reality', val);
              }}
            />
          );
        }
      },
    },
    {
      title: '附件',
      dataIndex: 'attachmentList',
      key: 'attachmentList',
      width: 140,
      render: (list: any, record: any) => {
        if (record.children && record.children.length > 0) {
        } else {
          list = list ? list : [];
          return (
            <Upload
              showUploadList={false}
              action="/zentao/common/uploadFile"
              onChange={(info: {
                file: { name?: any; status?: any; response?: any };
                fileList: any;
              }) => {
                const { status, response } = info.file;
                if (status == 'done') {
                  console.log(response.data.dataList);
                  let reslist = response.data.dataList.map((item: any) => {
                    return {
                      attachUrl: item.url,
                      attachmentName: item.name,
                    };
                  });
                  let newattachmentList = [...list, ...reslist];
                  changeProps(record, 'attachmentList', newattachmentList);
                } else if (status == 'error') {
                  message.error(`${info.file.name} 上传失败`);
                }
              }}
            >
              <Dropdown
                overlay={list && list.length > 0 ? menu(record, list) : <></>}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color={list && list.length > 0 ? 'primary' : 'default'}
                  disableElevation
                >
                  上传附件
                </Button>
              </Dropdown>
            </Upload>
          );
        }
      },
    },
  ];

  useEffect(() => {
    cexpend(
      dataSource.map((it: any) => {
        return it.id;
      }),
    );
  }, []);

  return (
    <div>
      <Table
        dataSource={dataSource}
        pagination={false}
        columns={columns}
        rowKey="id"
        expandable={{
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
      <Button
        fullWidth
        style={{ margin: '24px 0px 12px 0px' }}
        variant="contained"
        color="primary"
        disabled={loading.effects['bug/Demoexecute']}
        disableElevation
        onClick={() => {
          let postarr: any[] = [];
          let loop = (data: any) =>
            data.map((item: any) => {
              postarr.push({
                stepId: item.id, //步骤id，必填
                result: item.result ? item.result : '1', //执行结果，1通过，0不通过，必填
                reality: item.reality, //实际情况，非必填
                attachmentList: item.attachmentList,
              });
              if (item.children) {
                loop(item.children);
              }
            });
          loop(dataSource);

          setNewState(
            dispatch,
            'bug/Demoexecute',
            {
              id,
              executeList: postarr,
            },
            () => {
              cancelFn();
            },
          );
        }}
      >
        提交
      </Button>
    </div>
  );
};

export default connect(({ bug, model, loading }: any) => ({
  bug,
  model,
  loading,
}))(DemoAction);
