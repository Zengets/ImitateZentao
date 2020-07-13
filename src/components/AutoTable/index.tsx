import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';

let AutoTable = ({
  data,
  bordered,
  columns,
  loading,
  rowKey,
  pageChange,
  onChange,
  scroll,
  expandedRowRender,
  pagination,
  rowSelection,
}: any) => {
  let dataSource = pageChange
    ? data.data
      ? data.data.page
      : { list: [] }
    : data;

  return (
    <Table
      showSorterTooltip={false}
      dataSource={dataSource.list}
      scroll={
        scroll ? (scroll == 'false' ? '' : scroll) : { x: 1660, y: '60vh' }
      }
      bordered={bordered}
      loading={loading}
      columns={columns}
      pagination={
        pagination == 'false'
          ? false
          : {
              showTotal: total => `共${total}条`, // 分页
              size: 'small',
              pageSize: dataSource.pageSize ? dataSource.pageSize : 10,
              showQuickJumper: true,
              current: dataSource.pageNum ? dataSource.pageNum : 1,
              total: dataSource.total ? parseInt(dataSource.total) : 0,
              onChange: pageChange,
              showSizeChanger: true,
              onShowSizeChange: pageChange,
            }
      }
      rowKey={rowKey ? rowKey : 'id'}
      onChange={onChange}
      expandedRowRender={expandedRowRender}
      rowSelection={rowSelection}
      size="small"
    ></Table>
  );
};

export default AutoTable;
