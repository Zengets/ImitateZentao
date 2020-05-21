import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, TreeSelect } from 'antd';
import TextField from '@material-ui/core/TextField';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#1890ff' }}>sss</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

let defaultfields: any = {
  sensorName: {
    value: '', //初始化值
    type: 'input', //类型
    title: '传感器名称', //placeholder
    keys: 'sensorName', //唯一标识
    required: true, //必填？
  },
  sensorNames: {
    value: 45465,
    type: 'number',
    title: '传感器名称s',
    keys: 'sensorNames',
    required: true,
  },
  sensorNamee: {
    value: '',
    type: 'select',
    title: '传感器名称e',
    keys: 'sensorNamee',
    required: true,
    options: [
      { dicName: '请选择', dicKey: '' },
      { dicName: 'dapao', dicKey: '0' },
      { dicName: 'dapaos', dicKey: '1' },
    ],
  },
  date: {
    value: moment(),
    type: 'datepicker',
    title: '日期选择',
    keys: 'date',
    required: true,
  },
  test: {
    value: [],
    type: 'select',
    title: '传感器名称oip',
    keys: 'test',
    required: true,
    multiple: true,
    options: [
      { dicName: 'dapao', dicKey: '0' },
      { dicName: 'dapaos', dicKey: '1' },
    ],
  },
  tree: {
    value: [],
    type: 'treeselect',
    title: '树结构',
    keys: 'tree',
    required: true,
    multiple: false,
    options: treeData,
  },
  sensorNamec: {
    value: 45465,
    type: 'multiline', //textarea
    rowsMax: 4,
    title: '传感器名称c',
    keys: 'sensorNamec',
    required: true,
    col: { span: 24 },
  },
  upload: {
    value: [],
    type: 'upload',
    title: '设备图片',
    keys: 'upload',
    required: true,
  },
};

let SetUser = ({ model, dispatch }: any) => {
  //dispatch
  let [fields, cf] = useState(defaultfields);

  return (
    <div>
      <div style={{ width: 800, margin: '0 auto' }}>来了</div>
    </div>
  );
};

export default connect(({ model, loading }: any) => ({
  model,
  loading: loading.effects['model/User'],
}))(SetUser);
