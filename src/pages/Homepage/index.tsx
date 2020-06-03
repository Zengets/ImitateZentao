import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, TreeSelect, Card } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
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

let Mission = (props: any) => {
  //dispatch

  return (
    <Container maxWidth="xl">
      <Card title={props.route.name}></Card>
    </Container>
  );
};

export default connect(({ miss, loading }: any) => ({
  miss,
  loading: loading.effects['miss/User'],
}))(Mission);
