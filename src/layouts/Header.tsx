import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './layout.less';
import Container from '@material-ui/core/Container';
import { Breadcrumb, Menu, Dropdown, Divider } from 'antd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Paper } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { connect, history } from 'umi';
import Link from '@material-ui/core/Link';

function a11yProps(index: any) {
  return {
    style: { height: 60, minWidth: 80 },
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props: any) {
  let curindex = 0,
    curindexs = 0,
    mainroutes = props.routes.filter((item: any) => {
      return item.name;
    }),
    childroute;
  mainroutes.map((item: any, i: any) => {
    if (history.location.pathname.indexOf(item.path) !== -1) {
      curindex = i;
      childroute = item.routes.filter((item: any) => {
        return item.name;
      });
    }
  });
  const [value, setValue] = React.useState(curindex);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  childroute &&
    childroute.map((item: any, i: any) => {
      if (history.location.pathname == item.path) {
        curindexs = i;
      }
    });

  const [values, setValues] = React.useState(curindexs);
  const handleChanges = (event: any, newValue: any) => {
    setValues(newValue);
  };

  console.log(childroute);

  return (
    <div className={styles.topHeader}>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Container
          maxWidth={'lg'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className={styles.mtitle}>南高项目管理云平台</div>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            scrollButtons="auto"
          >
            {mainroutes &&
              mainroutes.map((item: any, i: any) => {
                if (i == mainroutes.length - 1) {
                  return (
                    <Tab
                      label={item.name}
                      style={{ borderLeft: '#fff solid 1px' }}
                      {...a11yProps(i)}
                      onClick={() => {
                        history.push(item.path);
                      }}
                    />
                  );
                } else {
                  return (
                    <Tab
                      label={item.name}
                      {...a11yProps(i)}
                      onClick={() => {
                        history.push(item.path);
                      }}
                    />
                  );
                }
              })}
          </Tabs>
          <Dropdown overlay={props.menu} trigger="click">
            <div className={styles.userbox}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 36 }} />
              </IconButton>
            </div>
          </Dropdown>
        </Container>
      </AppBar>
      {childroute && (
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          <Container
            maxWidth={'lg'}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ width: 250 }}>
              <Breadcrumb>
                <Breadcrumb.Item>{mainroutes[value].name}</Breadcrumb.Item>
                <Dropdown overlay={<div></div>} trigger="click">
                  <Breadcrumb.Item>{childroute[values].name}</Breadcrumb.Item>
                </Dropdown>
              </Breadcrumb>
            </div>
            <Tabs
              centered
              value={values}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChanges}
              aria-label="disabled tabs example"
            >
              {childroute &&
                childroute.map((item, i) => {
                  return (
                    <Tab
                      label={item.name}
                      style={{ minWidth: 80 }}
                      onClick={() => {
                        history.push(item.path);
                      }}
                    />
                  );
                })}
            </Tabs>
            <div style={{ width: 250 }}></div>
          </Container>
        </div>
      )}
    </div>
  );
}
