import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Divider } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';

let Productdetail = (props: any) => {
  let { renderAction, maindata } = props;
  let columns = [
    {
      title: '产品编号',
      dataIndex: 'productNo',
      key: 'productNo',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '产品负责人',
      dataIndex: 'chargeUserName',
      key: 'chargeUserName',
    },
    {
      title: '创建人',
      dataIndex: 'openUserName',
      key: 'openUserName',
    },
    {
      title: '由谁创建',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: '由谁激活',
      dataIndex: 'activateDate',
      key: 'activateDate',
    },
    {
      title: '由谁关闭',
      dataIndex: 'closeDate',
      key: 'closeDate',
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
          type: 'innerhtml',
        },
        {
          title: '附件',
          dataIndex: 'attachmentList',
          key: 'attachmentList',
        },
      ]; //初始化
    if (maindata) {
      listdata = maindata.product;
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
            item.dataIndex == 'openDate'
              ? listdata.openUserName &&
                `${listdata.openUserName} 于 ${date}创建`
              : item.dataIndex == 'closeDate'
              ? listdata.closeUserName &&
                `${listdata.closeUserName} 于 ${date}关闭`
              : item.dataIndex == 'activateDate'
              ? listdata.activateUserName &&
                `${listdata.activateUserName} 于 ${date}激活`
              : listdata[item.dataIndex],
        };
      });
    }

    let info1 = [
      'statusName',
      'productNo',
      'productName',
      'description',
      'attachmentList',
      'chargeUserName',
      'openDate',
      'activateDate',
      'closeDate',
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
      <Row gutter={24} style={{ width: '100%' }}>
        <Col {...col} style={{ marginBottom: 24 }}>
          <Card title={'产品信息'}>
            <List
              split={false}
              size="small"
              style={{ marginTop: -12 }}
              dataSource={info1}
              renderItem={(item: any) =>
                item.value && (
                  <List.Item>
                    <DetailItem
                      item={item}
                      key={item.dataIndex}
                      title={item.title}
                      value={
                        item.dataIndex == 'attachmentList'
                          ? renderList(item.value)
                          : item.value
                      }
                      contentstyle={{
                        color: rendercolor('Productstatus', item.value),
                      }}
                    />
                  </List.Item>
                )
              }
            />
            <Divider></Divider>
            <Row gutter={24}>
              <Col span={6}>
                <h4>项目数</h4>
                <span style={{ fontSize: 20, color: 'green' }}>
                  {maindata.productSum}
                </span>
              </Col>
              <Col span={6}>
                <h4>任务数</h4>
                <span style={{ fontSize: 20, color: 'green' }}>
                  {maindata.taskSum}
                </span>
              </Col>
              <Col span={6}>
                <h4>用例数</h4>
                <span style={{ fontSize: 20, color: 'green' }}>
                  {maindata.exampleSum}
                </span>
              </Col>
              <Col span={6}>
                <h4>相关bug</h4>
                <span style={{ fontSize: 20, color: 'green' }}>
                  {maindata.bugSum}
                </span>
              </Col>
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

export default Productdetail;
