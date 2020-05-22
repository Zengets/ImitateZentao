import { Input, Tooltip, Select, DatePicker, TreeSelect } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import React from 'react';
import {
  EditOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';

const { TreeNode } = TreeSelect;
let { Option } = Select;

let loop = (data: any[]) =>
  data.map(item => {
    const title = <span>{item.title}</span>;
    if (item.children) {
      return (
        <TreeNode
          value={item.key}
          key={item.key}
          title={title}
          icon={<EditOutlined />}
        >
          {loop(item.children)}
        </TreeNode>
      );
    } else {
      return (
        <TreeNode
          value={item.key}
          key={item.key}
          title={title}
          icon={<EditOutlined />}
        />
      );
    }
  });

let loopname = (data: any, key: any) => {
  let name = '';
  let loop = (datas: any[]) =>
    datas.map(item => {
      if (item.key == key) {
        name = item.title;
        return;
      } else if (item.children) {
        loop(item.children);
        return;
      } else {
        return;
      }
    });
  loop(data ? data : []);

  return name;
};

let getname = (option: any[], id: any) => {
  return option && option.length > 0
    ? option.filter(item => {
        return item.dicKey == id;
      })[0].dicName
    : '';
};

let getColumnSearchProps = (
  dataIndex: any,
  postData: any,
  handleSearch: any,
) => {
  let searchInput: any = null;
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          allowClear
          ref={node => {
            searchInput = node;
          }}
          placeholder={`请输入查询内容...`}
          onSearch={val => handleSearch([val], dataIndex)}
          style={{ width: 188 }}
        />
      </div>
    ),
    filterIcon: (filtered: any) => (
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Tooltip
          title={postData[dataIndex] ? `查询条件:${postData[dataIndex]}` : null}
        >
          <SearchOutlined
            style={{ color: postData[dataIndex] ? '#68b356' : '#ff2100' }}
          />
        </Tooltip>
      </span>
    ),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.focus());
      }
    },
    render: (text: { toString: () => string }) => (
      <Highlighter
        title={text ? text.toString() : ''}
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[postData[dataIndex]]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  };
};

let getColumnSelectProps = (
  dataIndex: React.Key,
  option: any[],
  postData: any,
  handleSearch: any,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => (
    <div style={{ padding: 8 }}>
      <Select
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        allowClear
        placeholder={`请选择...`}
        value={postData[dataIndex]}
        onChange={val => {
          handleSearch([val], dataIndex);
        }}
        style={{ width: 288, display: 'block' }}
      >
        {option &&
          option.map((item, i) => {
            return (
              <Option title={item.dicName} value={item.dicKey} key={i}>
                {item.dicName}
              </Option>
            );
          })}
      </Select>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        title={
          postData[dataIndex]
            ? `查询条件:${getname(option, postData[dataIndex])}`
            : null
        }
      >
        <CaretDownOutlined
          style={{ color: postData[dataIndex] ? '#68b356' : '#ff2100' }}
        />
      </Tooltip>
    </span>
  ),
});

let getColumnTreeSelectProps = (
  dataIndex: React.Key,
  option: any,
  postData: any,
  handleSearch: any,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => (
    <div style={{ padding: 8 }}>
      <TreeSelect
        style={{ width: 300 }}
        value={postData[dataIndex]}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        placeholder={`请选择...`}
        onChange={val => {
          handleSearch([val], dataIndex);
        }}
      >
        {option && loop(option)}
      </TreeSelect>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        title={
          postData[dataIndex]
            ? `查询条件:${loopname(option, postData[dataIndex])}`
            : null
        }
      >
        <CaretDownOutlined
          style={{ color: postData[dataIndex] ? '#68b356' : '#ff2100' }}
        />
      </Tooltip>
    </span>
  ),
});

let getColumnDateProps = (
  dataIndex: any,
  disableddate: any,
  postData: any,
  handleSearch: any,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => (
    <div style={{ padding: 8 }}>
      <DatePicker
        allowClear
        disabledDate={disableddate}
        placeholder={`请选择...`}
        value={postData[dataIndex] ? moment(postData[dataIndex]) : undefined}
        onChange={val => {
          handleSearch(
            [val ? moment(val).format('YYYY-MM-DD') : undefined],
            dataIndex,
          );
        }}
        style={{ width: 188, display: 'block' }}
      ></DatePicker>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        title={postData[dataIndex] ? `查询条件:${postData[dataIndex]}` : null}
      >
        <CaretDownOutlined
          style={{ color: postData[dataIndex] ? '#68b356' : '#ff2100' }}
        />
      </Tooltip>
    </span>
  ),
});

let getColumnMonthProps = (
  dataIndex: any,
  disableddate: any,
  postData: any,
  handleSearch: any,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => (
    <div style={{ padding: 8 }}>
      <DatePicker.MonthPicker
        allowClear
        disabledDate={disableddate}
        placeholder={`请选择...`}
        value={postData[dataIndex] ? moment(postData[dataIndex]) : undefined}
        onChange={val => {
          handleSearch(
            [val ? moment(val).format('YYYY-MM-DD') : undefined],
            dataIndex,
          );
        }}
        style={{ width: 188, display: 'block' }}
      ></DatePicker.MonthPicker>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        title={postData[dataIndex] ? `查询条件:${postData[dataIndex]}` : null}
      >
        <CaretDownOutlined
          style={{ color: postData[dataIndex] ? '#68b356' : '#ff2100' }}
        />
      </Tooltip>
    </span>
  ),
});

let getColumnRangeProps = (
  start: React.Key,
  end: React.Key,
  postData: any,
  handleSearch: any,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => (
    <div style={{ padding: 8 }}>
      <DatePicker.RangePicker
        allowClear
        value={
          postData[start]
            ? [moment(postData[start]), moment(postData[end])]
            : undefined
        }
        onChange={(val: any) => {
          handleSearch(
            [
              val[0] ? moment(val[0]).format('YYYY-MM-DD') : undefined,
              val[1] ? moment(val[1]).format('YYYY-MM-DD') : undefined,
            ],
            start,
            end,
          );
        }}
        style={{ display: 'block' }}
      ></DatePicker.RangePicker>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        title={
          postData[start]
            ? `查询条件:从${postData[start]} - ${postData[end]}`
            : null
        }
      >
        <CaretDownOutlined
          style={{ color: postData[start] ? '#68b356' : '#ff2100' }}
        />
      </Tooltip>
    </span>
  ),
});

export {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnDateProps,
  getColumnMonthProps,
  getColumnRangeProps,
};
