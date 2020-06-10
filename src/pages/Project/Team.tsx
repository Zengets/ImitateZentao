import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Input,
  message,
  InputNumber,
  Card,
  Popconfirm,
  Divider,
  Tooltip,
  Row,
  Col,
  Select,
  Empty,
} from 'antd';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutoTable from '@/components/AutoTable';
import {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnRangeProps,
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import { EditOutlined } from '@ant-design/icons';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import proj from './models/proj';

let n = 0; //mockid
let Project = (props: any) => {
  let { proj, model, dispatch, loading } = props;
  let posturl = 'model/ProjqueryByProjectId';
  let cpostdata = (val: any) => {
      setNewState(props.dispatch, 'model/postdata', val, () => {});
    },
    [iftype, ciftype] = useState({
      edit: false,
    }),
    [editarr, cedit] = useState(
      JSON.parse(JSON.stringify(model.ProjqueryByProjectId.data.dataList)),
    );

  useEffect(() => {
    setNewState(dispatch, 'proj/TeamqueryAllUser', {}, () => {});
    setNewState(dispatch, 'prod/ProdqueryStatus', {}, () => {});
  }, []);

  useMemo(() => {
    cedit(JSON.parse(JSON.stringify(model.ProjqueryByProjectId.data.dataList)));
  }, [model.ProjqueryByProjectId.data.dataList]);

  useMemo(() => {
    if (props.model.postdata.projectId) {
      setNewState(
        props.dispatch,
        'model/ProjqueryByProjectId',
        props.model.postdata,
        () => {},
      ); //全局改变数据
    }
  }, [props.model.postdata]);

  let columns = [
    {
      title: '用户名称',
      dataIndex: 'realName',
      key: 'realName',
      sorter: {
        multiple: 100,
      },
      ...getColumnSearchProps('realName', model.postdata, handleSearch),
    },
    {
      title: '团队角色',
      sorter: {
        multiple: 99,
      },
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      ...getColumnSearchProps('jobTitle', model.postdata, handleSearch),
    },
    {
      title: '入团日',
      sorter: {
        multiple: 93,
      },
      dataIndex: 'joinDate',
      key: 'joinDate',
      ...getColumnRangeProps(
        'joinMinDate',
        'joinMaxDate',
        model.postdata,
        handleSearch,
      ),
      render: (text: any) => (
        <span>{text && moment(parseInt(text)).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: '可用工日',
      dataIndex: 'workDays',
      key: 'workDays',
    },
    {
      title: '可用工时/日',
      dataIndex: 'workDayHours',
      key: 'workDayHours',
    },
    {
      title: '总计工时',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 60,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认移除' + record.realName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'proj/TeamdeleteById',
              { id: record.id },
              () => {
                message.success('移除' + record.realName + '成功！');
                setNewState(dispatch, posturl, model.postdata, () => {});
              },
            );
          }}
        >
          <Tooltip title="删除">
            <IconButton aria-label="delete">
              <DeleteIcon color={'error'} />
            </IconButton>
          </Tooltip>
        </Popconfirm>
      </div>
    );
  }

  function handleSearch(value: any, dataIndex: any, dataIndexs: any) {
    if (dataIndexs) {
      cpostdata({
        ...model.postdata,
        [dataIndex]: value && value[0],
        [dataIndexs]: value && value[1],
      });
    } else {
      cpostdata({
        ...model.postdata,
        [dataIndex]: value,
      });
    }
  }

  let handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let newsorter = [];
    if (!Array.isArray(sorter)) {
      newsorter.push(sorter);
    } else {
      newsorter = sorter;
    }
    let sortList = newsorter.map((item: any, i: number) => {
      return {
        fieldName: item.columnKey,
        sort:
          item.order == 'descend' ? false : item.order == 'ascend' ? true : '',
      };
    });
    cpostdata({
      ...model.postdata,
      sortList,
    });
  };

  const col = {
      xs: 7,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 9,
      xxl: 9,
    },
    cols = {
      xs: 5,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 3,
      xxl: 3,
    };

  let addonLine = (data: any) => {
    let onchange = (val: any, key: string) => {
        let newarr = editarr.map((item: any, i: any) => {
          if (item.id == data.id) {
            item[key] = val;
            if (key == 'userId') {
              item.jobTitle =
                proj.TeamqueryAllUser.filter((it: any) => {
                  return it.id == val;
                }).length > 0
                  ? proj.TeamqueryAllUser.filter((it: any) => {
                      return it.id == val;
                    })[0].jobTitle
                  : item.jobTitle;
            }
          }
          return item;
        });
        cedit(newarr);
      },
      haveselected = editarr.map((item: any) => {
        return item.userId;
      });

    return (
      <div style={{ display: 'flex' }}>
        <Row gutter={12} style={{ flex: 1 }}>
          <Col {...col}>
            <Select
              style={{ width: '100%', marginTop: 4 }}
              showSearch
              filterOption={(input, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              value={data.userId}
              onChange={val => onchange(val, 'userId')}
            >
              {proj.TeamqueryAllUser &&
                proj.TeamqueryAllUser.map((item: any, i: any) => (
                  <Select.Option
                    value={item.id}
                    disabled={haveselected.indexOf(item.id) != -1}
                  >
                    {item.realName}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col {...col}>
            <Input
              style={{ width: '100%', marginTop: 4 }}
              value={data.jobTitle}
              onChange={e => onchange(e.target.value, 'jobTitle')}
            ></Input>
          </Col>
          <Col {...cols}>
            <InputNumber
              style={{ width: '100%', marginTop: 4 }}
              value={data.workDays}
              onChange={value => onchange(value, 'workDays')}
              min={1}
            ></InputNumber>
          </Col>
          <Col {...cols}>
            <InputNumber
              style={{ width: '100%', marginTop: 4 }}
              value={data.workDayHours}
              onChange={value => onchange(value, 'workDayHours')}
              min={1}
              max={10}
            ></InputNumber>
          </Col>
        </Row>
        <div style={{ width: 80, marginLeft: 12 }}>
          <div>
            <IconButton
              style={{ padding: 8 }}
              onClick={() => {
                let neweditarr = editarr.filter((item: any) => {
                  return item.id != data.id;
                });
                cedit(neweditarr);
              }}
            >
              <Tooltip title="删除人员">
                <HighlightOffIcon
                  style={{ fontSize: 24, margin: 6 }}
                  color="error"
                />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container maxWidth="xl">
      <Card
        title={iftype.edit ? `编辑${props.route.name}` : props.route.name}
        extra={
          <div>
            {iftype.edit ? (
              <div>
                <IconButton
                  disabled={proj.TeamqueryAllUser.length == editarr.length}
                  style={{ padding: 8 }}
                  onClick={() => {
                    n++;
                    console.log(model.ProjqueryByProjectId);
                    let neweditarr = [
                      ...editarr,
                      {
                        userId: '', //用户id，必填
                        jobTitle: '', //团队角色，必填
                        workDays:
                          model.ProjqueryByProjectId.data.data.availableDays, //可用工日，必填
                        workDayHours:
                          model.ProjqueryByProjectId.data.workDayHours, //可用工时，必填
                        id: 'tts' + n,
                      },
                    ];
                    cedit(neweditarr);
                  }}
                >
                  <Tooltip title="新增人员">
                    <AddCircleOutlineIcon
                      style={{ fontSize: 24 }}
                      color={
                        proj.TeamqueryAllUser.length == editarr.length
                          ? 'action'
                          : 'primary'
                      }
                    />
                  </Tooltip>
                </IconButton>
                <Divider type="vertical"></Divider>
                <IconButton
                  style={{ padding: 8 }}
                  onClick={() => {
                    let ifs = false;
                    let memberList = editarr.map((item: any, i: any) => {
                      if (
                        !item.userId ||
                        !item.jobTitle ||
                        !item.workDays ||
                        !item.workDayHours
                      ) {
                        ifs = true;
                      }
                      return {
                        id: item.id.indexOf('tts') == -1 ? item.id : '',
                        userId: item.userId, //用户id，必填
                        jobTitle: item.jobTitle, //团队角色，必填
                        workDays: item.workDays, //可用工日，必填
                        workDayHours: item.workDayHours, //可用工时，必填
                      };
                    });
                    if (ifs) {
                      message.warn('请完善信息后提交...');
                      return;
                    }
                    console.log(memberList);
                    let postdatas = {
                      projectId: model.postdata.projectId,
                      memberList,
                    };
                    setNewState(dispatch, 'proj/Teamsave', postdatas, () => {
                      message.success('编辑团队成功！');
                      setNewState(dispatch, posturl, model.postdata, () => {});
                      ciftype({
                        ...iftype,
                        edit: !iftype.edit,
                      });
                    });
                  }}
                >
                  <Tooltip title="保存">
                    <SaveIcon style={{ fontSize: 25, color: 'red' }} />
                  </Tooltip>
                </IconButton>
                <Divider type="vertical"></Divider>
                <Popconfirm
                  overlayStyle={{ zIndex: 9999999999 }}
                  okText="保留"
                  cancelText="不保留"
                  placement="bottom"
                  title={'当前页是否保留数据后退出编辑？'}
                  onConfirm={() => {
                    ciftype({
                      ...iftype,
                      edit: !iftype.edit,
                    });
                  }}
                  onCancel={() => {
                    cedit(
                      JSON.parse(
                        JSON.stringify(
                          model.ProjqueryByProjectId.data.dataList,
                        ),
                      ),
                    );
                    ciftype({
                      ...iftype,
                      edit: !iftype.edit,
                    });
                  }}
                >
                  <Tooltip title="取消编辑">
                    <IconButton style={{ padding: 8 }}>
                      <RefreshIcon style={{ fontSize: 24, color: '#000' }} />
                    </IconButton>
                  </Tooltip>
                </Popconfirm>
              </div>
            ) : (
              <IconButton
                style={{ padding: 8 }}
                onClick={() => {
                  ciftype({
                    ...iftype,
                    edit: !iftype.edit,
                  });
                }}
              >
                <Tooltip title="编辑团队">
                  <EditOutlined style={{ fontSize: 22, color: '#1183fb' }} />
                </Tooltip>
              </IconButton>
            )}
          </div>
        }
      >
        {iftype.edit ? (
          <div>
            <div style={{ display: 'flex' }}>
              <Row gutter={12} style={{ flex: 1 }}>
                <Col {...col}>
                  <p>
                    <i style={{ color: 'red', marginRight: 12 }}>*</i>用户
                  </p>
                </Col>
                <Col {...col}>
                  <p>
                    <i style={{ color: 'red', marginRight: 12 }}>*</i>团队角色
                  </p>
                </Col>
                <Col {...cols}>
                  <p>
                    <i style={{ color: 'red', marginRight: 12 }}>*</i>可用工日
                  </p>
                </Col>
                <Col {...cols}>
                  <p>
                    <i style={{ color: 'red', marginRight: 12 }}>*</i>
                    可用工时/日
                  </p>
                </Col>
              </Row>
              <div style={{ width: 80, marginLeft: 12 }}>
                <p>操作</p>
              </div>
            </div>
            {editarr && editarr.length > 0 ? (
              editarr.map((item: any, i: any) => {
                return addonLine(item);
              })
            ) : (
              <Empty
                description="暂无可编辑数据"
                style={{ margin: 64 }}
              ></Empty>
            )}
          </div>
        ) : (
          <AutoTable
            data={{ list: model.ProjqueryByProjectId.data.dataList }}
            columns={columns}
            loading={loading.effects[posturl]}
            pageChange={null}
            onChange={handleTableChange}
            scroll={{ y: '65vh' }}
          />
        )}
      </Card>
    </Container>
  );
};

export default connect(({ proj, model, loading }: any) => ({
  proj,
  model,
  loading,
}))(Project);
