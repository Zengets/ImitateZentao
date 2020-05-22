import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { Input, message, Table, Card } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutoTable from '@/components/AutoTable';
import { getColumnSearchProps } from '@/components/TbSearch';

let SetUser = (props: any) => {
  let { set, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'set/UserqueryList',
      postdata: {
        pageIndex: '1', //--------页码 *
        pageSize: '10', //--------条数 *
        realName: '', //--------姓名
        userNo: '', //---------用户编号
        accountName: '', //--------用户名
        superId: '', //---------上级领导key
        workwechatId: '', //----------企业微信key
        jobTitle: '', //-----------职位
        departmentId: '', //----------------部门key
        telephone: '', //---------------------联系电话
        mailNo: '', //----------------邮箱
        startDate: '', //--------------开始时间
        endDate: '', //-----------------结束时间
        sortList: [
          //------------------------------------------------------排序字段
          {
            fieldName: 'userNo', //-------编号
            sort: false,
          },
          {
            fieldName: 'realName', //-----------姓名
            sort: '',
          },
          {
            fieldName: 'accountName', //----------------用户名
            sort: '',
          },
          {
            fieldName: 'departmentId', //--------------------部门id
            sort: '',
          },
          {
            fieldName: 'jobTitle', //---------------------职位
            sort: '',
          },
          {
            fieldName: 'superId', //------------------------直属领导id
            sort: '',
          },
        ],
      },
    });

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, []);

  let handleSearch = (value: any, dataIndex: any) => {
    alert(value);
  };

  let columns = [
    //                     "accountName": "A888",         //-------------------------------------用户名
    //                     "realName": "李国才",                 //----------------------------------姓名
    //                     "superId": null,
    //                     "departmentId": "2020051930335572972",
    //                     "telephone": "18361355818",  //------------------------------电话
    //                     "mailNo": "123@qq.com",    //---------------------------------------邮箱
    //                     "jobTitle": "Java开发",             //----------------------------------职位
    //                     "entryDate": "2020-05-19",   //---------------------------入职日期
    //                     "workwechatId": "liguocai",
    //                     "workwechatName": "李国才",       //----------------------------企业微信名
    //                     "departmentName": "二级部门2",  //---------------------------------部门
    //                      "roleId": "2020051928661373931",
    //                     "roleName": "JAVA开发工程师" ,   //---------------------------------------角色
    //                     "superName": null     //-------------------------------------------直属领导

    {
      title: '编号',
      dataIndex: 'userNo',
      key: 'userNo',
      ...getColumnSearchProps('userNo', post.postdata, handleSearch),
    },
    {
      title: '用户名',
      dataIndex: 'accountName',
      key: 'accountName',
    },
  ];

  useMemo(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post]);

  let pageChange = (page: any) => {
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          pageIndex: page,
        },
      };
    });
  };

  return (
    <Container maxWidth="xl">
      <Card
        title={props.route.name}
        extra={
          <div>
            <IconButton style={{ padding: 8 }}>
              <AddCircleOutlineIcon style={{ fontSize: 22 }} />
            </IconButton>
          </div>
        }
      >
        <AutoTable
          data={set.UserqueryList}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
        />
      </Card>
    </Container>
  );
};

export default connect(({ set, loading }: any) => ({
  set,
  loading,
}))(SetUser);
