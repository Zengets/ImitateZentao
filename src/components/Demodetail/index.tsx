import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Table, Modal } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';
import Bugdetail from '../Bugdetail';
import setNewState from '@/utils/setNewState';
import { connect, history } from 'umi';
import Projectdetail from '../Projectdetail';
import Productdetail from '../Productdetail';

let Demodetail = (props: any) => {
  let { renderAction, maindata, showOther, dispatch, bug } = props;

  let columns = [
    {
      title: '用例编号',
      dataIndex: 'caseNo',
      key: 'caseNo',
    },
    {
      title: '用例标题',
      dataIndex: 'caseName',
      key: 'caseName',
    },
    {
      title: '前置条件',
      dataIndex: 'precondition',
      key: 'precondition',
    },
    {
      title: '用例步骤',
      dataIndex: 'stepTreeList',
      key: 'stepTreeList',
    },
    //"projectName","caseTypeName","stepCount","executeTimes","bugCount"
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '用例类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
    },
    {
      title: '步骤数',
      dataIndex: 'stepCount',
      key: 'stepCount',
    },
    {
      title: '执行次数',
      dataIndex: 'executeTimes',
      key: 'executeTimes',
    },
    {
      title: '产生bug',
      dataIndex: 'bugCount',
      key: 'bugCount',
    },

    {
      title: '相关bug列表',
      dataIndex: 'bugList',
      key: 'bugList', //bugName ，id "openTime","lastExecuteTime"
    },

    {
      title: '由谁创建',
      dataIndex: 'openTime',
      key: 'openTime',
      person: 'openUserName',
      format: 'YYYY-MM-DD HH:mm',
    },

    {
      title: '由谁执行',
      dataIndex: 'lastExecuteTime',
      key: 'lastExecuteTime',
      person: 'lastExecuteUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
  ];

  function renderList(list: any[]) {
    if (list) {
      return list.map((item, i) => (
        <Button
          color="primary"
          disableElevation
          style={{ marginRight: 12, marginBottom: 6, marginTop: 6 }}
          onClick={() => {
            window.open(item.attachUrl);
          }}
        >
          {item.attachmentName}
        </Button>
      ));
    } else {
      return '';
    }
  }

  let renderdetail = () => {
    let listdata: any,
      dataSource: any[] = [];

    if (maindata) {
      listdata = maindata; //info对象
    }

    if (listdata) {
      dataSource = columns.map((item: any) => {
        let date =
            listdata[item.dataIndex] &&
            moment(parseInt(listdata[item.dataIndex])).format(item.format),
          rangedate = item.endIndex
            ? `${
                listdata[item.dataIndex]
                  ? moment(parseInt(listdata[item.dataIndex])).format(
                      item.format,
                    )
                  : ''
              } 至 ${
                listdata[item.endIndex]
                  ? moment(parseInt(listdata[item.endIndex])).format(
                      item.format,
                    )
                  : ''
              }`
            : date;

        let rendersection = () => {
          return (
            <Table
              dataSource={listdata[item.dataIndex]}
              defaultExpandAllRows={true}
              columns={[
                {
                  title: '编号',
                  dataIndex: 'index',
                  key: 'index',
                  render: (text: any, record: any, index: React.ReactNode) => (
                    <span>{index + 1}</span>
                  ),
                },
                {
                  title: '步骤',
                  dataIndex: 'step',
                  key: 'step',
                },
                {
                  title: '预期',
                  dataIndex: 'expection',
                  key: 'expection',
                },
                {
                  title: '执行结果',
                  dataIndex: 'resultName',
                  key: 'resultName',
                  render: (text, record) => (
                    <span
                      style={{ color: record.result == '0' ? 'red' : 'green' }}
                    >
                      {text}
                    </span>
                  ),
                },
                {
                  title: '实际情况',
                  dataIndex: 'reality',
                  key: 'reality',
                },
                {
                  title: '附件',
                  dataIndex: 'attachmentList',
                  key: 'attachmentList',
                  width: 140,
                  render: (list: any, record: any) => {
                    return list && list.length > 0
                      ? list.map((item: any, i: any) => {
                          return (
                            <a target="_blank" href={item.attachUrl}>
                              {item.attachmentName}
                            </a>
                          );
                        })
                      : null;
                  },
                },
              ]}
              pagination={false}
              rowKey="id"
            ></Table>
          );
        };
        let renderbglist = () => {
          return (
            listdata[item.dataIndex] &&
            listdata[item.dataIndex].map((item: any, i: any) => (
              <a
                key={i}
                onClick={() => {
                  setNewState(
                    dispatch,
                    'bug/BugqueryById',
                    { id: item.id },
                    (rest: any) => {
                      Modal.info({
                        style: { top: 20 },
                        zIndex: 999999,
                        width: 1200,
                        maskClosable: true,
                        title: item.bugName,
                        content: (
                          <Bugdetail
                            showOther={() => {
                              setNewState(
                                dispatch,
                                'bug/ProjqueryById',
                                { id: rest.data.data.projectId },
                                (res: any) => {
                                  Modal.info({
                                    style: { top: 20 },
                                    zIndex: 999999,
                                    width: 800,
                                    maskClosable: true,
                                    title: rest.data.data.projectName,
                                    content: (
                                      <Projectdetail
                                        showProduct={() => {
                                          setNewState(
                                            dispatch,
                                            'bug/ProdqueryInfo',
                                            { id: res.data.data.productId },
                                            (result: any) => {
                                              Modal.info({
                                                style: { top: 20 },
                                                zIndex: 999999,
                                                width: 800,
                                                maskClosable: true,
                                                title:
                                                  res.data.data.productName,
                                                content: (
                                                  <Productdetail
                                                    maindata={result.data.data}
                                                  />
                                                ),
                                                okText: '晓得了',
                                              });
                                            },
                                          );
                                        }}
                                        maindata={res.data.data}
                                      />
                                    ),
                                    okText: '晓得了',
                                  });
                                },
                              );
                            }}
                            maindata={rest.data.data}
                          ></Bugdetail>
                        ),
                        okText: '晓得了',
                      });
                    },
                  );
                }}
              >
                {item.bugName}
              </a>
            ))
          );
        };

        return {
          title: item.title,
          dataIndex: item.dataIndex,
          type: item.type,
          value:
            item.dataIndex == 'stepTreeList'
              ? rendersection()
              : item.dataIndex == 'bugList'
              ? renderbglist()
              : item.person
              ? listdata[item.person]
                ? `${listdata[item.person]} 于 ${rangedate}`
                : null
              : item.endIndex
              ? rangedate
              : item.format
              ? date
              : listdata[item.dataIndex] == []
              ? null
              : listdata[item.dataIndex],
        };
      });
    }

    let info1 = ['caseNo', 'caseName', 'precondition', 'stepTreeList'].map(
      (item: any) => {
        return dataSource.filter((it: any) => {
          return it.dataIndex == item;
        })[0];
      },
    );

    let info2 = [
      'projectName',
      'caseTypeName',
      'stepCount',
      'executeTimes',
      'bugCount',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info3 = ['bugList'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info4 = ['openTime', 'lastExecuteTime'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    return (
      <div>
        <List
          dataSource={info1}
          bordered
          style={{ marginBottom: 24 }}
          renderItem={(item: any) => (
            <List.Item>
              <DetailItem
                key={item.dataIndex}
                width={70}
                title={item.title}
                value={item.value}
                item={item}
                hdClick={() => {
                  if (item.dataIndex == 'projectName') {
                    showOther();
                  }
                }}
                contentstyle={{
                  color:
                    item.dataIndex == 'projectName'
                      ? '#1183fb'
                      : rendercolor('任务level', item.value),
                  cursor:
                    item.dataIndex == 'projectName' ? 'pointer' : 'default',
                }}
              />
            </List.Item>
          )}
          footer={
            renderAction ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {renderAction()}
              </div>
            ) : (
              false
            )
          }
        />
        <Row gutter={24}>
          <Col span={8}>
            <Card title="基本信息" style={{ borderColor: '#d9d9d9' }}>
              <List
                bordered={false}
                dataSource={info2}
                renderItem={(item: any) => (
                  <List.Item>
                    <DetailItem
                      width={70}
                      item={item}
                      key={item.dataIndex}
                      hdClick={() => {
                        if (item.dataIndex == 'projectName') {
                          showOther();
                        }
                      }}
                      title={item.title}
                      value={item.value}
                      contentstyle={{
                        color:
                          item.dataIndex == 'projectName'
                            ? '#1183fb'
                            : item.dataIndex == 'statusName'
                            ? rendercolor('任务status', item.value)
                            : rendercolor('任务level', item.value),
                        cursor:
                          item.dataIndex == 'projectName'
                            ? 'pointer'
                            : 'default',
                      }}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="相关Bug" style={{ borderColor: '#d9d9d9' }}>
              <List
                bordered={false}
                dataSource={info3}
                renderItem={(item: any) => (
                  <List.Item>
                    <DetailItem
                      item={item}
                      key={item.dataIndex}
                      width={90}
                      title={item.title}
                      value={item.value}
                      contentstyle={{ color: '#666' }}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card title="工时信息" style={{ borderColor: '#d9d9d9' }}>
              <List
                bordered={false}
                dataSource={info4}
                renderItem={(item: any) => (
                  <List.Item>
                    <DetailItem
                      item={item}
                      key={item.dataIndex}
                      width={70}
                      title={item.title}
                      value={item.value}
                      contentstyle={{ color: '#666' }}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  return renderdetail();
};

export default connect(({ bug, model, loading }: any) => ({
  bug,
  model,
  loading,
}))(Demodetail);
