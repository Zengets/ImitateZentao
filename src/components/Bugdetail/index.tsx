import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';

let Bugdetail = (props: any) => {
  let { renderAction, maindata, showOther } = props;

  let columns = [
    {
      title: 'Bug编号',
      dataIndex: 'bugNo',
      key: 'bugNo',
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Bug名称',
      dataIndex: 'bugName',
      key: 'bugName',
    },
    {
      title: '创建人',
      dataIndex: 'openUserName',
      key: 'openUserName',
    },
    {
      title: '创建时间',
      dataIndex: 'openTime',
      key: 'openTime',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '处理人',
      dataIndex: 'solveUserName',
      key: 'solveUserName',
    },
    {
      title: '处理时间',
      dataIndex: 'solveTime',
      key: 'solveTime',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '当前负责人',
      dataIndex: 'currentUserName',
      key: 'currentUserName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '验收描述',
      dataIndex: 'acceptDescription',
      key: 'acceptDescription',
      type: 'innerhtml',
    },
    {
      title: '验收结果',
      dataIndex: 'acceptResultName',
      key: 'acceptResultName',
    },
    {
      title: '验收时间',
      dataIndex: 'acceptTime',
      key: 'acceptTime',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '验收人',
      dataIndex: 'acceptUserName',
      key: 'acceptUserName',
    },
    {
      title: '处理描述',
      dataIndex: 'solveDescription',
      key: 'solveDescription',
      type: 'innerhtml',
    },
    {
      title: '解决方案名',
      dataIndex: 'solutionName',
      key: 'solutionName',
    },
    {
      title: '激活描述',
      dataIndex: 'activateDescription',
      key: 'activateDescription',
      type: 'innerhtml',
    },
    {
      title: '激活人',
      dataIndex: 'activateUserName',
      key: 'activateUserName',
    },
    {
      title: '激活时间',
      dataIndex: 'activateTime',
      key: 'activateTime',
      format: 'YYYY-MM-DD HH:mm',
    },
    {
      title: '截止日期',
      dataIndex: 'endDate',
      key: 'endDate',
      format: 'YYYY-MM-DD',
    },
    {
      title: '重现步骤',
      dataIndex: 'steps',
      key: 'steps',
      type: 'innerhtml',
    },
    {
      title: '阶段',
      dataIndex: 'bugStageName',
      key: 'bugStageName',
    },
    {
      title: 'bug类型',
      dataIndex: 'bugTypeName',
      key: 'bugTypeName',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '附件',
      dataIndex: 'attachmentList',
      key: 'attachmentList',
    },
    {
      title: '激活附件',
      dataIndex: 'activateAttachmentList',
      key: 'activateAttachmentList',
    },
    {
      title: '处理附件',
      dataIndex: 'solveAttachmentList',
      key: 'solveAttachmentList',
    },
    {
      title: '确认附件',
      dataIndex: 'confirmAttachmentList',
      key: 'confirmAttachmentList',
    },
  ];

  let renderdetail = () => {
    let listdata: any,
      dataSource: any[] = [];

    if (maindata) {
      listdata = maindata;
    }

    if (listdata) {
      dataSource = columns.map((item: any) => {
        let date = listdata[item.dataIndex]
          ? moment(parseInt(listdata[item.dataIndex])).format(item.format)
          : '-';
        return {
          title: item.title,
          dataIndex: item.dataIndex,
          type: item.type,
          value:
            item.dataIndex == 'openTime'
              ? listdata.openUserName &&
                `${listdata.openUserName} 于 ${date}创建`
              : item.dataIndex == 'activateTime'
              ? listdata.activateUserName &&
                `${listdata.activateUserName} 于 ${date}激活`
              : item.dataIndex == 'solveTime'
              ? listdata.solveUserName &&
                `${listdata.solveUserName} 于 ${date}处理`
              : item.dataIndex == 'acceptTime'
              ? listdata.acceptUserName &&
                `${listdata.acceptUserName} 于 ${date}验收`
              : item.format
              ? date
              : listdata[item.dataIndex] == []
              ? null
              : listdata[item.dataIndex],
        };
      });
    }

    let info1 = [
      'bugNo',
      'bugName',
      'steps',
      'attachmentList',
      'activateDescription',
      'activateAttachmentList',
      'solveDescription',
      'solveAttachmentList',
      'acceptDescription',
      'confirmAttachmentList',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info2 = [
      'projectName',
      'bugTypeName',
      'severity',
      'priority',
      'solutionName',
      'acceptResultName',
      'statusName',
      'currentUserName',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info3 = [
      'openTime',
      'activateTime',
      'solveTime',
      'acceptTime',
      'endDate',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

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
      <div style={{ paddingBottom: 24 }}>
        <Row gutter={24}>
          <Col {...col}>
            <Card title="bug信息" style={{ marginBottom: 24 }}>
              <List
                style={{ marginTop: -24, marginBottom: -20 }}
                dataSource={info1}
                renderItem={(item: any) =>
                  item.value && (
                    <List.Item>
                      <DetailItem
                        key={item.dataIndex}
                        width={70}
                        title={item.title}
                        value={
                          item.dataIndex.indexOf('ttachmentList') != -1
                            ? renderList(item.value)
                            : item.value
                        }
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
                              : rendercolor('Buglevel', item.value),
                          cursor:
                            item.dataIndex == 'projectName'
                              ? 'pointer'
                              : 'default',
                        }}
                      />
                    </List.Item>
                  )
                }
              />
            </Card>
            <Card title="历史记录" style={{ marginBottom: 24 }}></Card>
          </Col>
          <Col {...cols}>
            <Card title="基本信息" style={{ marginBottom: 24 }}>
              <List
                style={{ marginTop: -24, marginBottom: -20 }}
                dataSource={info2}
                renderItem={(item: any) =>
                  item.value && (
                    <List.Item>
                      <DetailItem
                        item={item}
                        width={86}
                        key={item.dataIndex}
                        hdClick={() => {
                          if (item.dataIndex == 'projectName') {
                            showOther();
                          }
                        }}
                        title={item.title}
                        value={
                          item.dataIndex == 'attachmentList'
                            ? renderList(item.value)
                            : item.value
                        }
                        contentstyle={{
                          color:
                            item.dataIndex == 'projectName'
                              ? '#1183fb'
                              : item.dataIndex == 'statusName'
                              ? rendercolor('Bugstatus', item.value)
                              : rendercolor('Buglevel', item.value),
                          cursor:
                            item.dataIndex == 'projectName'
                              ? 'pointer'
                              : 'default',
                        }}
                      />
                    </List.Item>
                  )
                }
              />
            </Card>
            <Card title="工时信息" style={{ marginBottom: 24 }}>
              <List
                style={{ marginTop: -24, marginBottom: -20 }}
                dataSource={info3}
                renderItem={(item: any) =>
                  item.value && (
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
                  )
                }
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

export default Bugdetail;
