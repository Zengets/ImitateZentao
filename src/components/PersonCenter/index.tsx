import { Breadcrumb, Menu, Dropdown, Divider, Input, Select } from 'antd';
import React, { useMemo } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { IconButton, Paper } from '@material-ui/core';
import styles from './index.less';

export default function PersonCenter(props: any) {
  return (
    <Dropdown overlay={props.menu} trigger="click">
      <div className={styles.userbox}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          style={{ borderRadius: 8 }}
        >
          <div
            style={{
              margin: '4px 6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AccountCircle style={{ fontSize: 36 }} />
            <span style={{ fontSize: 16, paddingLeft: 6 }}>
              {props.realName}
            </span>
          </div>
        </IconButton>
      </div>
    </Dropdown>
  );
}
