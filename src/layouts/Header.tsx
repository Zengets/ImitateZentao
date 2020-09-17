import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './layout.less';
import Container from '@material-ui/core/Container';
import { Breadcrumb, Menu, Dropdown, Divider, Input, Select } from 'antd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Paper } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { connect, history } from 'umi';
import Link from '@material-ui/core/Link';
import { useEffect } from 'react';
import setNewState from '@/utils/setNewState';
import { useState } from 'react';

function a11yProps(index: any, style: object) {
  return {
    style: { ...style, height: 60, minWidth: 80 },
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

function Header(props: any) {
  let { model, routes } = props,
    Menudata = localStorage.getItem('Menu');
  Menudata = JSON.parse(Menudata ? Menudata : '[]');
  let userInfo = JSON.parse(localStorage.getItem('userInfo')), //获取权限菜单
    [name, cname] = useState('');
  //二级导航逻辑, Menudata
  let curindex = 0,
    curindexs = 0,
    mainroutes = Menudata.filter((item: any) => {
      return item.name;
    }),
    childroute: any[] = [];

  mainroutes.map((item: any, i: any) => {
    if (history.location.pathname.indexOf(item.path) != -1) {
      curindex = i;
      childroute =
        item.routes &&
        item.routes.filter((item: any) => {
          return item.name;
        });
    }
  });
  //二级导航逻辑
  const [value, setValue] = useState(curindex);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  childroute &&
    childroute.map((item: any, i: any) => {
      if (history.location.pathname == item.path) {
        curindexs = i;
      }
    });
  const [values, setValues] = useState(curindexs);
  const handleChanges = (event: any, newValue: any) => {
    setValues(newValue);
  };

  let [dataList, cdata] = useState([]);

  //修改postdata
  let cpostdata = (val: any) => {
    setNewState(props.dispatch, 'model/postdata', val, () => {});
  };

  let cprod = (val: any) => {
    setNewState(props.dispatch, 'model/prod', val, () => {});
  };

  useMemo(() => {
    setValues(curindexs);
    setValue(curindex);
    //下拉框逻辑
    if (
      history.location.pathname == '/index/project/team' ||
      history.location.pathname == '/index/project/toneeds' ||
      history.location.pathname.indexOf('mission') != -1 ||
      history.location.pathname.indexOf('test') != -1
    ) {
      setNewState(
        props.dispatch,
        'model/ProjquerySelectList',
        {},
        (res: any) => {
          cname('项目'); //rename
          cdata(res.data.dataList);
          //初始化下拉框数据
          let fval: any;
          if (localStorage.getItem('val')) {
            fval = localStorage.getItem('val');
          } else if (res.data.dataList.length > 0) {
            fval = res.data.dataList[0].dicKey;
          }
          cpostdata({
            ...props.model.postdata,
            projectId: fval,
          });
        },
      );
    } else if (history.location.pathname == '/index/product/needs') {
      setNewState(
        props.dispatch,
        'model/ProdqueryAllSelectAll',
        {},
        (res: any) => {
          cname('产品'); //rename
          cdata(res.data.data);
          //初始化下拉框数据
          let fval: any;
          if (localStorage.getItem('vals')) {
            fval = localStorage.getItem('vals');
          } else if (res.data.data.length > 0) {
            fval = res.data.data[0].dicKey;
          }
          cprod(fval);
        },
      );
    } else {
      cdata([]);
    }
  }, [props.location]);

  let renderSearch = () => {
    if (dataList.length > 0) {
      return (
        <div>
          <Divider type="vertical"></Divider>
          <span style={{ color: '#1183fb', opacity: 0.6, paddingRight: 6 }}>
            {name + ' '}
          </span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 266, color: '#1183fb' }}
            value={
              name == '产品' ? props.model.prod : props.model.postdata.projectId
            }
            onChange={(val: any) => {
              if (name == '产品') {
                localStorage.setItem('vals', val);
                cprod(val);
              } else {
                localStorage.setItem('val', val);
                cpostdata({
                  ...props.model.postdata,
                  projectId: val,
                });
              }
            }}
          >
            {dataList &&
              dataList.map((item: any, i) => {
                return (
                  <Select.Option key={i} value={item.dicKey}>
                    {item.dicName}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      );
    } else {
      return <div style={{ width: 1, height: 32 }}></div>;
    }
  };

  return (
    <div className={styles.topHeader}>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Container
          maxWidth={'xl'}
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
                      key={i}
                      label={item.name}
                      {...a11yProps(i, {
                        borderLeft: 'rgba(255,255,255,0.4) solid 1px',
                      })}
                      onClick={() => {
                        if (item.routes && item.routes.length > 0) {
                          history.push(item.routes[0].path);
                        } else {
                          history.push(item.path);
                        }
                      }}
                    />
                  );
                } else {
                  return (
                    <Tab
                      label={item.name}
                      {...a11yProps(i, {})}
                      onClick={() => {
                        if (item.routes && item.routes.length > 0) {
                          history.push(item.routes[0].path);
                        } else {
                          history.push(item.path);
                        }
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
                    {userInfo.realName}
                  </span>
                </div>
              </IconButton>
            </div>
          </Dropdown>
        </Container>
      </AppBar>
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <Container
          maxWidth={'xl'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 46,
          }}
        >
          <div
            style={{
              width: 600,
              minWidth: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>{mainroutes[value].name}</Breadcrumb.Item>
              {childroute && (
                <Breadcrumb.Item>
                  {childroute[values] && childroute[values].name}
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
            {renderSearch()}
          </div>
          <div style={{ flex: 1 }}>
            {childroute ? (
              <Tabs
                centered
                value={values}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChanges}
                aria-label="disabled tabs example"
              >
                {childroute.map((item, i) => {
                  return (
                    <Tab
                      key={i}
                      label={item.name}
                      style={{ minWidth: 80 }}
                      onClick={() => {
                        history.push(item.path);
                      }}
                    />
                  );
                })}
              </Tabs>
            ) : null}
          </div>

          <div style={{ width: 600, minWidth: 600 }}>
            {/* {!childroute && (
              <Input.Search
                style={{ borderRadius: 4, maxWidth: 600 }}
                placeholder={`搜索${mainroutes[value].name}`}
              />
            )} */}
          </div>
        </Container>
      </div>
    </div>
  );
}
export default connect(({ model, loading }: any) => ({
  model,
  loading,
}))(Header);
