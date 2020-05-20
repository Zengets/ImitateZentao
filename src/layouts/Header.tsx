import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './layout.less';
import Container from '@material-ui/core/Container';
import { Avatar, Menu, Dropdown, Divider } from 'antd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    style: { height: 64, minWidth: 80 },
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

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.topHeader}>
      <AppBar position="static">
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
            <Tab label="首页" {...a11yProps(0)} />
            <Tab label="产品" {...a11yProps(1)} />
            <Tab label="项目" {...a11yProps(2)} />
            <Tab label="任务" {...a11yProps(2)} />
            <Tab label="测试" {...a11yProps(2)} />
            <Divider
              type="vertical"
              style={{ height: 24, margin: 0, marginTop: 20, padding: 0 }}
            ></Divider>
            <Tab label="设置" {...a11yProps(2)} />
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
    </div>
  );
}
