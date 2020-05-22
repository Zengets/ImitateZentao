import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, TreeSelect, Row, Col, Modal } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import { Tree, Card, Empty } from 'antd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useStyles from '@/utils/makestyle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const { TreeNode } = Tree;

let n = 1,
  dataList: { key: any; title: any }[] = [];
const getParentKey = (key: any, tree: string | any[]) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title: title });
    if (node.children) {
      generateList(node.children);
    }
  }
};

let TreeDom = (props: any) => {
  let [state, setState] = useState({
    expandedKeys: [props.defaultexpandedKeys],
    searchValue: '',
    autoExpandParent: true,
  });

  //展开逻辑
  let onExpand = (expandedKeys: any) => {
    setState(() => {
      return {
        ...state,
        expandedKeys,
        autoExpandParent: false,
      };
    });
  };

  //搜索逻辑
  let onChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    generateList(props.data);
    const expandedKeys = dataList
      .map((item: { title: string | any[]; key: any }) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, props.data);
        }
        return null;
      })
      .filter(
        (item: any, i: any, self: string | any[]) =>
          item && self.indexOf(item) === i,
      );
    setState(() => {
      return {
        ...state,
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      };
    });
  };

  const loop = (data: any[]) => {
    let { searchValue } = state;
    return data.map(
      (item: { title: {} | null | undefined; children: any; key: any }) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
              {item.children ? null : (
                <DeleteForeverIcon
                  style={{ fontSize: 20, marginLeft: 12 }}
                  onClick={e => props.deleteItem(e, item.key)}
                  color="error"
                ></DeleteForeverIcon>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {item.title}{' '}
              {item.children ? null : (
                <DeleteForeverIcon
                  onClick={e => props.deleteItem(e, item.key)}
                  style={{ fontSize: 20, marginLeft: 12 }}
                  color="error"
                ></DeleteForeverIcon>
              )}
            </div>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      },
    );
  };

  return (
    <Card title={'部门结构'}>
      <TextField
        label="搜索部门"
        fullWidth
        className={useStyles().root}
        variant="outlined"
        value={state.searchValue}
        onChange={onChange}
        style={{ marginBottom: 12 }}
      ></TextField>
      <Tree
        defaultExpandAll={true}
        onExpand={onExpand}
        expandedKeys={state.expandedKeys}
        autoExpandParent={state.autoExpandParent}
        onSelect={props.onSelect}
        treeData={loop(props.data)}
      />
    </Card>
  );
};

export default TreeDom;
