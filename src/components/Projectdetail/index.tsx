import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Divider } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';
import { type } from './../../.umi/plugin-model/Provider';

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
          title: '项目描述',
          dataIndex: 'description',
          key: 'description',
          type: 'innerhtml',
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
          title: '由谁创建',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '由谁开始',
          dataIndex: 'realStartTime',
          key: 'realStartTime',
        },
        {
          title: '由谁完成',
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
        let date = listdata[item.dataIndex]
          ? moment(parseInt(listdata[item.dataIndex])).format('YYYY-MM-DD')
          : '-';
        return {
          ...item,
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
      <Row gutter={24} style={{ width: '100%' }}>
        <Col {...col} style={{ marginBottom: 24 }}>
          <Card title={'项目信息'}>
            <List
              split={false}
              size="small"
              style={{ marginTop: -12 }}
              dataSource={info1}
              renderItem={(item: any) =>
                item.value && (
                  <List.Item>
                    <DetailItem
                      key={item.dataIndex}
                      item={item}
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
                          item.dataIndex == 'productName'
                            ? 'pointer'
                            : 'default',
                      }}
                    />
                  </List.Item>
                )
              }
            />
            <List
              style={{ marginTop: 24 }}
              dataSource={info3}
              renderItem={(item: any) =>
                item.value && (
                  <List.Item>
                    <DetailItem
                      item={item}
                      key={item.dataIndex}
                      title={item.title}
                      value={item.value}
                      contentstyle={{ color: '#666' }}
                    />
                  </List.Item>
                )
              }
            />
            <Divider></Divider>
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
        </Col>
        <Col {...cols} style={{ marginBottom: 24 }}>
          <Card title="历史记录"></Card>
        </Col>

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
      </Row>
    );
  };
  return renderdetail();
};

export default Projectdetail;
