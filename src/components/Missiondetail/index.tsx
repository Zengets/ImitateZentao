import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';

let Missiondetail = (props: any) => {
  let { renderAction, maindata, showOther } = props;

  let columns = [
    {
      title: '需求描述',
      dataIndex: 'requireDesctription',
      key: 'requireDesctription',
      section: true,
    },
    {
      title: '任务描述',
      dataIndex: 'taskDesctription',
      key: 'taskDesctription',
      section: true,
    },
    {
      title: '技术描述',
      dataIndex: 'techDesctription',
      key: 'techDesctription',
      section: true,
    },
    {
      title: '开发描述',
      dataIndex: 'devDesctription',
      key: 'devDesctription',
      section: true,
    },
    {
      title: '测试描述',
      dataIndex: 'testDesctription',
      key: 'testDesctription',
      section: true,
    },
    {
      title: '验收描述',
      dataIndex: 'acceptDesctription',
      key: 'acceptDesctription',
      section: true,
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
      title: '预计起止日期(开发)',
      dataIndex: 'devStageStartDate',
      key: 'devStageStartDate',
      endIndex: 'devStageEndDate',
      format: 'YYYY-MM-DD',
    },
    {
      title: '预计时长(开发)',
      dataIndex: 'devStagePlanHours',
      key: 'devStagePlanHours',
    },
    {
      title: '消耗时长(开发)',
      dataIndex: 'devStageExpendHours',
      key: 'devStageExpendHours',
    },
    {
      title: '累计消耗时长(开发)',
      dataIndex: 'totalDevStageExpendHours',
      key: 'totalDevStageExpendHours',
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
      listdata = maindata.info; //info对象
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
              <div>
                <p>{maindata[item.dataIndex].description}</p>
                <div>{renderList(maindata[item.dataIndex].annex)}</div>
              </div>
            );
          }
        };

        return {
          title: item.title,
          dataIndex: item.dataIndex,
          type: item.type,
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

    let info1 = [
      'requireDesctription',
      'taskDesctription',
      'techDesctription',
      'devDesctription',
      'testDesctription',
      'acceptDesctription',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info2 = [
      'projectName',
      'taskNo',
      'taskName',
      'statusName',
      'testStageResultName',
      'acceptStageResultName',
      'currentUserName',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info3 = [
      'openDate',
      'activateDate',
      'assignTime',
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
          <Col span={12}>
            <Card title="基本信息" style={{ borderColor: '#d9d9d9' }}>
              <List
                bordered={false}
                dataSource={info2}
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
          </Col>
          <Col span={12}>
            <Card title="工时信息" style={{ borderColor: '#d9d9d9' }}>
              <List
                bordered={false}
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
      </div>
    );
  };
  return renderdetail();
};

export default Missiondetail;
