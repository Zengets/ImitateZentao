import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';

let Projectdetail = (props: any) => {
  let { renderAction, maindata, showProduct } = props;
  let columns = [
    {
      title: '项目编号',
      dataIndex: 'projectNo',
      key: 'projectNo',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '所属产品',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '预计开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '截止日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '预计工时(h)',
      dataIndex: 'planHours',
    },
    {
      title: '消耗工时(h)',
      dataIndex: 'expendHours',
    },
    {
      title: '剩余工时(h)',
      dataIndex: 'leftHours',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
  ];

  let renderdetail = () => {
    let listdata: any,
      dataSource: any[] = [],
      newcolumns = JSON.parse(JSON.stringify(columns)).filter((it: any) => {
        return it.dataIndex != 'action' && it.dataIndex != 'openUserName';
      }), //过滤不需要的
      addarr = [
        {
          title: '产品描述',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '附件',
          dataIndex: 'attachmentList',
          key: 'attachmentList',
        },
        {
          title: '可用工作日(天)',
          dataIndex: 'availableDays',
          key: 'availableDays',
        },
        {
          title: '可用工时(h)',
          dataIndex: 'totalHours',
          key: 'totalHours',
        },
        {
          title: '创建日期(h)',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '开始日期(h)',
          dataIndex: 'realStartTime',
          key: 'realStartTime',
        },
        {
          title: '完成日期(h)',
          dataIndex: 'realFinishTime',
          key: 'realFinishTime',
        },
      ]; //初始化

    if (maindata) {
      listdata = maindata;
    }

    newcolumns = [...newcolumns, ...addarr];

    if (listdata) {
      dataSource = newcolumns.map((item: any) => {
        let date =
          listdata[item.dataIndex] &&
          moment(parseInt(listdata[item.dataIndex])).format('YYYY-MM-DD');
        return {
          title: item.title,
          dataIndex: item.dataIndex,
          value:
            item.dataIndex == 'createTime'
              ? listdata.createUserName &&
                `${listdata.createUserName} 于 ${date}创建`
              : item.dataIndex == 'realStartTime'
              ? listdata.startUserName &&
                `${listdata.startUserName} 于 ${date}开始`
              : item.dataIndex == 'realFinishTime'
              ? listdata.finishUserName &&
                `${listdata.finishUserName} 于 ${date}完成`
              : item.dataIndex == 'startDate'
              ? date
              : item.dataIndex == 'endDate'
              ? date
              : listdata[item.dataIndex],
        };
      });
    }

    let info1 = [
      'statusName',
      'projectNo',
      'projectName',
      'productName',
      'description',
      'attachmentList',
      'startDate',
      'endDate',
      'availableDays',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info2 = ['totalHours', 'planHours', 'expendHours', 'leftHours'].map(
      (item: any) => {
        return dataSource.filter((it: any) => {
          return it.dataIndex == item;
        })[0];
      },
    );
    let info3 = ['createTime', 'realStartTime', 'realFinishTime'].map(
      (item: any) => {
        return dataSource.filter((it: any) => {
          return it.dataIndex == item;
        })[0];
      },
    );

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
    return (
      <div>
        <Card bordered={false}>
          <Row gutter={24}>
            {info2 &&
              info2.map((item, i) => (
                <Col key={i} span={6}>
                  <h4>{item.title}</h4>
                  <span style={{ fontSize: 20, color: 'green' }}>
                    {item.value}
                  </span>
                </Col>
              ))}
          </Row>
        </Card>
        <List
          dataSource={info1}
          bordered
          renderItem={(item: any) =>
            item.value && (
              <List.Item>
                <DetailItem
                  key={item.dataIndex}
                  hdClick={() => {
                    if (item.dataIndex == 'productName') {
                      showProduct();
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
                      item.dataIndex == 'productName'
                        ? '#1183fb'
                        : rendercolor('Projuctstatus', item.value),
                    cursor:
                      item.dataIndex == 'productName' ? 'pointer' : 'default',
                  }}
                />
              </List.Item>
            )
          }
        />
        <List
          style={{ marginTop: 24 }}
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
          bordered
          dataSource={info3}
          renderItem={(item: any) =>
            item.value && (
              <List.Item>
                <DetailItem
                  key={item.dataIndex}
                  title={item.title}
                  value={item.value}
                  contentstyle={{ color: '#666' }}
                />
              </List.Item>
            )
          }
        />
      </div>
    );
  };
  return renderdetail();
};

export default Projectdetail;
