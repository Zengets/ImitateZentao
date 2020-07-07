import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Divider } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';
import { type } from './../../.umi/plugin-model/useModel';

let Needsdetail = (props: any) => {
  let { renderAction, maindata } = props;
  let columns = [
    {
      title: '编号',
      dataIndex: 'requireNo',
      key: 'requireNo',
    },
    {
      title: '优先级',
      dataIndex: 'priorityName',
      key: 'priorityName',
    },
    {
      title: '需求名称',
      dataIndex: 'requireName',
      key: 'requireName',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      key: 'createUserName',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '阶段',
      dataIndex: 'stageName',
      key: 'stageName',
    },
    {
      title: '任务数',
      dataIndex: 'taskNum',
      key: 'taskNum',
    },
  ];

  let renderdetail = () => {
    let listdata: any,
      dataSource: any[] = [],
      newcolumns = JSON.parse(JSON.stringify(columns)), //过滤不需要的
      addarr = [
        {
          title: '所属产品',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: '由谁创建',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '由谁激活',
          dataIndex: 'activateDate',
          key: 'activateDate',
        },
        {
          title: '由谁关闭',
          dataIndex: 'closeTime',
          key: 'closeTime',
        },
        {
          title: '需求描述',
          dataIndex: 'requireDescription',
          key: 'requireDescription',
          type: 'innerhtml',
        },
        {
          title: '验收标准',
          dataIndex: 'acceptStandard',
          key: 'acceptStandard',
          type: 'innerhtml',
        },
        {
          title: '附件',
          dataIndex: 'attachmentList',
          key: 'attachmentList',
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
          title: item.title,
          dataIndex: item.dataIndex,
          type: item.type,
          value:
            item.dataIndex == 'createTime'
              ? listdata.createUserName &&
                `${listdata.createUserName} 于 ${date}创建`
              : item.dataIndex == 'closeTime'
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
      'requireNo',
      'productName',
      'projectName',
      'priorityName',
      'statusName',
      'stageName',
      'requireName',
      'requireDescription',
      'acceptStandard',
      'attachmentList',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info2 = ['createTime', 'activateDate', 'closeTime'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });

    let info3 = ['taskNum'].map((item: any) => {
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
          <Card title={'需求信息'}>
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
            <List
              split={false}
              size="small"
              dataSource={info2}
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
            <List
              split={false}
              size="small"
              dataSource={info3}
              renderItem={(item: any) =>
                item.value && (
                  <List.Item>
                    <DetailItem
                      key={item.dataIndex}
                      title={item.title}
                      item={item}
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

export default Needsdetail;
