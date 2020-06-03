import { Input, Tooltip, Select, DatePicker, TreeSelect } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import React from 'react';
import {
  EditOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';

let { Option } = Select;

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
          onSearch={val => handleSearch(val, dataIndex)}
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
          handleSearch(val, dataIndex);
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
          handleSearch(val, dataIndex);
        }}
        treeData={option}
      ></TreeSelect>
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
            val ? moment(val).format('YYYY-MM-DD') : undefined,
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
        title={
          postData[dataIndex]
            ? `查询条件:${moment(postData[dataIndex]).format('YYYY/MM/DD')}`
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
        onChange={(val: any) => {
          handleSearch(
            val ? moment(val).format('YYYY-MM-DD') : undefined,
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
        title={
          postData[dataIndex]
            ? `查询条件:${moment(postData[dataIndex]).format('YYYY/MM')}`
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
        placeholder={['开始日期', '结束日期']}
        value={
          postData[start]
            ? [moment(postData[start]), moment(postData[end])]
            : []
        }
        onChange={(val: any) => {
          handleSearch(
            [
              val
                ? moment(val[0])
                    .startOf('day')
                    .valueOf()
                : undefined,
              val
                ? moment(val[1])
                    .startOf('day')
                    .valueOf()
                : undefined,
            ],
            start,
            end,
          );
        }}
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
            ? `查询条件:从${moment(postData[start]).format(
                'YYYY/MM/DD',
              )} - ${moment(postData[end]).format('YYYY/MM/DD')}`
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

let getColumnRangeminProps = (
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
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        placeholder={['开始日期', '结束日期']}
        value={
          postData[start]
            ? [moment(postData[start]), moment(postData[end])]
            : []
        }
        onChange={(val: any) => {
          handleSearch(
            [
              val
                ? moment(val[0])
                    .startOf('minute')
                    .valueOf()
                : undefined,
              val
                ? moment(val[1])
                    .startOf('minute')
                    .valueOf()
                : undefined,
            ],
            start,
            end,
          );
        }}
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
            ? `查询条件:从${moment(postData[start]).format(
                'YYYY/MM/DD',
              )} - ${moment(postData[end]).format('YYYY/MM/DD')}`
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
  getColumnRangeminProps,
};
