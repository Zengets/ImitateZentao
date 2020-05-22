import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, Table } from 'antd';
import TextField from '@material-ui/core/TextField';

let AutoTable = ({ data, columns, loading, rowKey, pageChange }: any) => {
  let dataSource = data.data ? data.data.page : { list: [] };

  return (
    <Table
      bordered
      dataSource={dataSource.list}
      scroll={{ x: 1100, y: '60vh' }}
      loading={loading}
      columns={columns}
      pagination={{
        showTotal: total => `共${total}条`, // 分页
        size: 'small',
        pageSize: 10,
        showQuickJumper: true,
        current: dataSource.pageNum ? dataSource.pageNum : 1,
        total: dataSource.total ? parseInt(dataSource.total) : 0,
        onChange: pageChange,
      }}
      rowKey={rowKey ? rowKey : 'id'}
    ></Table>
  );
};

export default AutoTable;
