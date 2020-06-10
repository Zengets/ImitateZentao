import React, { useEffect, useState, useMemo } from 'react';
import { connect, history, Effect } from 'umi';
import moment from 'moment';
import { Table, message } from 'antd';
import setNewState from '@/utils/setNewState';
import Button from '@material-ui/core/Button';

let defaultvalue = [
  {
    id: 'fatetts',
    step: '',
    expection: '',
    children: [],
  },
];

let DemoList = (props: any) => {
  let { bug, dispatch, loading, model, dataSource, cancelFn } = props;
  let [expandedRowKeys, cexpend] = useState([]);
  let [expandedRowKey, cexpen] = useState([]);
  let [selectedRowKeys, cselect] = useState([]);
  let [selectedRows, cselectrow] = useState([]);

  let [tree, xiangzige] = useState([]);

  console.log(dataSource);

  let columns = [
    {
      title: '执行编号',
      dataIndex: 'executeNo',
      key: 'executeNo',
    },
    {
      title: '用例编号',
      dataIndex: 'caseNo',
      key: 'caseNo',
    },
    {
      title: '用例标题',
      dataIndex: 'caseName',
      key: 'caseName',
    },
    {
      title: '执行人名',
      dataIndex: 'executeUserName',
      key: 'executeUserName',
    },
    {
      title: '执行时间',
      dataIndex: 'executeTime',
      key: 'executeTime',
      render(text: any) {
        return (
          <span>
            {text && moment(parseInt(text)).format('YYYY-MM-DD HH:mm')}
          </span>
        );
      },
    },
    {
      title: '结果',
      dataIndex: 'resultName',
      key: 'resultName',
      render: (text, record) => (
        <span style={{ color: record.result == '0' ? 'red' : 'green' }}>
          {text}
        </span>
      ),
    },
  ];

  let expandedRowRender = () => {
    return tree && tree.length > 0 ? (
      <div
        style={{
          paddingBottom: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Table
          dataSource={tree}
          expandedRowKeys={expandedRowKey}
          onExpand={(expanded, record: any) => {
            if (expanded) {
              expandedRowKey.push(record.id);
              cexpen([...expandedRowKey]);
            } else {
              cexpen(
                expandedRowKey.filter((item: any) => {
                  return item != record.id;
                }),
              );
            }
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (val: any, data: any) => {
              cselect(val);
              cselectrow(data);
            },
            getCheckboxProps: record => ({
              disabled: record.children && record.children.length > 0,
            }),
            renderCell: (check, record, index, originNode) => {
              if (record.children && record.children.length > 0) {
                return null;
              } else {
                return originNode;
              }
            },
          }}
          loading={loading.effects['bug/Demotree']}
          columns={[
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
              dataIndex: 'resultName',
              key: 'resultName',
              render: (text, record) => (
                <span style={{ color: record.result == '0' ? 'red' : 'green' }}>
                  {text}
                </span>
              ),
            },
            {
              title: '实际情况',
              dataIndex: 'reality',
              key: 'reality',
            },
            {
              title: '附件',
              dataIndex: 'attachmentList',
              key: 'attachmentList',
              width: 140,
              render: (list: any, record: any) => {
                return list && list.length > 0
                  ? list.map((item: any, i: any) => {
                      return (
                        <a target="_blank" href={item.attachUrl}>
                          {item.attachmentName}
                        </a>
                      );
                    })
                  : null;
              },
            },
          ]}
          pagination={false}
          rowKey={'id'}
        ></Table>
        <Button
          style={{ marginTop: 24, opacity: 0.8 }}
          size="large"
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            if (selectedRowKeys.length == 0) {
              message.destroy();
              message.warn('请选择需要转Bug的用例');
              return;
            }
            cancelFn(selectedRows);
          }}
        >
          转Bug
        </Button>
      </div>
    ) : null;
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: expandedRowRender,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record: any) => {
            if (expanded) {
              cexpend([record.id]);
              cselect([]);
              cselectrow([]);
              setNewState(
                dispatch,
                'bug/Demotree',
                { executeId: record.id },
                (res: any) => {
                  console.log(res);
                  xiangzige(res.data.dataList);
                  let expandeded = res.data.dataList.map((item: any) => {
                    return item.id;
                  });
                  cexpen(expandeded);
                },
              );
            } else {
              cexpend([]);
            }
          },
        }}
        rowKey="id"
      ></Table>
    </div>
  );
};

export default connect(({ bug, model, loading }: any) => ({
  bug,
  model,
  loading,
}))(DemoList);
