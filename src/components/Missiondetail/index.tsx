import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Tabs, Divider } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';
import styles from './style.less';
const { TabPane } = Tabs;
let Missiondetail = (props: any) => {
  let { renderAction, maindata, showOther } = props;

  let columns = [
    {
      title: '任务描述',
      dataIndex: 'taskDesctription',
      key: 'taskDesctription',
      section: true,
      type: 'start',
    },
    {
      title: '开发描述',
      dataIndex: 'devDesctription',
      key: 'devDesctription',
      section: true,
      type: 'start',
    },
    {
      title: '测试描述',
      dataIndex: 'testDesctription',
      key: 'testDesctription',
      section: true,
      type: 'start',
    },
    {
      title: '验收描述',
      dataIndex: 'acceptDesctription',
      key: 'acceptDesctription',
      section: true,
      type: 'start',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      key: 'taskNo',
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '测试结果',
      dataIndex: 'testStageResultName',
      key: 'testStageResultName',
    },
    {
      title: '验收结果',
      dataIndex: 'acceptStageResultName',
      key: 'acceptStageResultName',
    },
    {
      title: '关闭原因',
      dataIndex: 'closeDescription',
      key: 'closeDescription',
    },
    {
      title: '当前负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
    },

    {
      title: '由谁创建',
      dataIndex: 'openDate',
      key: 'openDate',
      person: 'openUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁激活',
      dataIndex: 'activateDate',
      key: 'activateDate',
      person: 'activateUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁分配',
      dataIndex: 'assignTime',
      key: 'assignTime',
      person: 'assignUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁开发',
      dataIndex: 'devStageRealStartTime',
      key: 'devStageRealStartTime',
      person: 'devUserName',
      endIndex: 'realFinishTime',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁测试',
      dataIndex: 'testStageTime',
      key: 'testStageTime',
      person: 'testUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁验收',
      dataIndex: 'acceptStageTime',
      key: 'acceptStageTime',
      person: 'acceptUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '由谁关闭',
      dataIndex: 'closeDate',
      key: 'closeDate',
      person: 'closeUserName',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '截止日期',
      dataIndex: 'deadDate',
      key: 'deadDate',
      format: 'YYYY-MM-DD',
    },
    {
      title: '预计起止日期',
      dataIndex: 'devStageStartDate',
      key: 'devStageStartDate',
      endIndex: 'devStageEndDate',
      format: 'YYYY-MM-DD',
    },
    {
      title: '预计时长',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
    },
    {
      title: '消耗时长',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
    },
    {
      title: '累计消耗时长',
      dataIndex: 'totalDevStageExpendHours',
      key: 'totalDevStageExpendHours',
    },
    {
      title: '相关需求',
      dataIndex: 'requireName',
      key: 'requireName',
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
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
      listdata = {
        ...maindata.info,
        taskDesctription: maindata.taskDesctription,
        acceptDesctription: maindata.acceptDesctription,
        devDesctription: maindata.devDesctription,
        testDesctription: maindata.testDesctription,
      }; //info对象
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
          if (
            !maindata[item.dataIndex].description &&
            !renderList(maindata[item.dataIndex].annex)
          ) {
            return null;
          } else {
            return (
              <div className={styles.boxes}>
                <p
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: maindata[item.dataIndex].description,
                  }}
                ></p>
                <div>{renderList(maindata[item.dataIndex].annex)}</div>
              </div>
            );
          }
        };

        return {
          title: item.title,
          dataIndex: item.dataIndex,
          type: item.type,
          tooltip:
            item.dataIndex == 'requireName' && maindata.require ? (
              <div
                className={styles.boxes}
                style={{
                  backgroundColor: '#fff',
                  border: '#ddd solid 1px',
                  padding: 12,
                  borderRadius: 2,
                  minWidth: 400,
                }}
              >
                <div>
                  <p style={{ color: '#333', marginBottom: 12 }}>验收标准</p>
                  <p
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      wordBreak: 'break-all',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: maindata.require.standard,
                    }}
                  ></p>
                </div>
                <Divider style={{ margin: '10px 0px' }}></Divider>
                <div>
                  <p style={{ color: '#333', marginBottom: 12 }}>验收标准</p>
                  <p
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      wordBreak: 'break-all',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: maindata.require.description,
                    }}
                  ></p>
                </div>
              </div>
            ) : null,
          value: item.section ? (
            rendersection()
          ) : item.dataIndex == 'statusName' ? (
            <div>
              {listdata[item.dataIndex]}{' '}
              {listdata.ifDelay == '1' ? (
                <span style={{ color: 'green' }}> (正常)</span>
              ) : listdata.ifDelay == '2' ? (
                <span style={{ color: 'red' }}> (延期)</span>
              ) : (
                ''
              )}
            </div>
          ) : item.person ? (
            listdata[item.person] ? (
              `${listdata[item.person]} 于 ${rangedate}`
            ) : null
          ) : item.endIndex ? (
            rangedate
          ) : item.format ? (
            date
          ) : listdata[item.dataIndex] == [] ? null : (
            listdata[item.dataIndex]
          ),
        };
      });
    }

    let info11 = ['taskDesctription'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info12 = ['devDesctription'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info13 = ['testDesctription'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info14 = ['acceptDesctription'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info2 = [
      'projectName',
      'taskNo',
      'taskName',
      'requireName',
      'priorityName',
      'statusName',
      'testStageResultName',
      'acceptStageResultName',
      'closeDescription',
      'currentUserName',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info3 = [
      'openDate',
      'devStageRealStartTime',
      'testStageTime',
      'acceptStageTime',
      'closeDate',
      'deadDate',
      'devStageStartDate',
      'devStagePlanHours',
      'devStageExpendHours',
      'totalDevStageExpendHours',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let col = {
        xs: 24,
        sm: 24,
        md: 16,
        lg: 16,
        xl: 16,
        xxl: 16,
      },
      cols = {
        xs: 24,
        sm: 24,
        md: 8,
        lg: 8,
        xl: 8,
        xxl: 8,
      };

    return (
      <div>
        <Row gutter={24}>
          <Col {...col}>
            <Card title="任务信息" style={{ marginBottom: 24 }}>
              <Tabs defaultActiveKey="1" style={{ marginTop: -12 }}>
                <TabPane tab="任务描述" key="1">
                  <List
                    dataSource={info11}
                    split={false}
                    size="small"
                    style={{ marginTop: -12, marginBottom: -12 }}
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
                              item.dataIndex == 'projectName'
                                ? 'pointer'
                                : 'default',
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="开发描述" key="2">
                  <List
                    dataSource={info12}
                    split={false}
                    size="small"
                    style={{ marginTop: -12, marginBottom: -12 }}
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
                              item.dataIndex == 'projectName'
                                ? 'pointer'
                                : 'default',
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="测试描述" key="3">
                  <List
                    dataSource={info13}
                    split={false}
                    size="small"
                    style={{ marginTop: -12, marginBottom: -12 }}
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
                              item.dataIndex == 'projectName'
                                ? 'pointer'
                                : 'default',
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="验收描述" key="4">
                  <List
                    dataSource={info14}
                    split={false}
                    size="small"
                    style={{ marginTop: -12, marginBottom: -12 }}
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
                              item.dataIndex == 'projectName'
                                ? 'pointer'
                                : 'default',
                          }}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Card>
            <Card title="历史记录" style={{ marginBottom: 24 }}></Card>
          </Col>
          <Col {...cols}>
            <Card title="基本信息" style={{ marginBottom: 24 }}>
              <List
                bordered={false}
                dataSource={info2}
                split={false}
                size="small"
                style={{ marginTop: -12, marginBottom: -12 }}
                renderItem={(item: any) => (
                  <List.Item>
                    <DetailItem
                      width={80}
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

            <Card title="工时信息" style={{ marginBottom: 24 }}>
              <List
                bordered={false}
                split={false}
                size="small"
                style={{ marginTop: -12, marginBottom: -12 }}
                dataSource={info3}
                renderItem={(item: any) => (
                  <List.Item>
                    <DetailItem
                      item={item}
                      key={item.dataIndex}
                      width={130}
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
        {renderAction && (
          <div
            style={{
              position: 'fixed',
              bottom: 36,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {renderAction()}
          </div>
        )}
      </div>
    );
  };
  return renderdetail();
};

export default Missiondetail;
