import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { message, Modal, Card, Row, Col, List, Divider, Empty } from 'antd';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import ReactEcharts from 'echarts-for-react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import any from '../../layouts/BasicLayout';
import Dia from '@/components/Dia';
import Projectdetail from '@/components/Projectdetail';
import Productdetail from '@/components/Productdetail';

let First = ({ dispatch, home, model, proj }: any) => {
  let col = { xs: 24, sm: 24, md: 6, lg: 6, xl: 5, xxl: 4 },
    cols = { xs: 24, sm: 24, md: 18, lg: 18, xl: 19, xxl: 20 },
    projectId = localStorage.getItem('val')
      ? localStorage.getItem('val')
      : null,
    [curpro, setpro] = useState(),
    [dataList, cdata] = useState([]),
    [iftype, ciftype] = useState({
      fullScreen: false,
      visible: false,
      title: '',
      key: '',
    });

  useEffect(() => {
    //初始化下拉框
    setNewState(dispatch, 'model/ProjquerySelectList', {}, (res: any) => {
      cdata(res.data.dataList);
      if (!projectId) {
        setpro(
          res.data.dataList && res.data.dataList.length > 0
            ? res.data.dataList[0].dicKey
            : '',
        );
      } else {
        setpro(projectId);
      }
    });
  }, []);

  useMemo(() => {
    if (curpro) {
      setNewState(dispatch, 'home/IndexFirst', { id: curpro }, () => {});
    }
  }, [curpro]);

  let getOption = (title: string, rate: string | undefined) => {
    return {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: title,
          type: 'gauge',
          data: [{ value: rate ? parseInt(rate) : 0, name: '' }],
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              width: 5,
            },
          },
          axisTick: {
            // 坐标轴小标记
            length: 0, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto',
            },
          },
          splitLine: {
            // 分隔线
            length: 0, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto',
            },
          },
          title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontSize: 16,
            color: '#999',
          },
          axisLabel: {
            color: '#fff',
          },
          detail: {
            formatter: '{value}%',
            fontSize: 18,
            borderRadius: 3,
            width: 100,
            marginTop: 10,
            rich: {},
          },
        },
      ],
    };
  };

  return (
    <Card title={'选择项目'}>
      <Dia
        fullScreen={iftype.fullScreen}
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
          ciftype(() => {
            return {
              ...iftype,
              visible: key,
              fullScreen: false,
            };
          });
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        <Projectdetail
          showProduct={() => {
            setNewState(
              dispatch,
              'proj/ProdqueryInfo',
              { id: proj.ProjqueryById.data.data.productId },
              (res: any) => {
                Modal.info({
                  style: { top: 20 },
                  zIndex: 999999,
                  width: 800,
                  maskClosable: true,
                  title: proj.ProjqueryById.data.data.productName,
                  content: <Productdetail maindata={res.data.data} />,
                  okText: '晓得了',
                });
              },
            );
          }}
          maindata={proj.ProjqueryById.data.data}
        ></Projectdetail>
      </Dia>

      <Row>
        <Col {...col}>
          <div
            style={{
              height: 300,
              overflow: 'auto',
              borderRight: '#f0f0f0 solid 1px',
            }}
          >
            {dataList && dataList.length > 0 ? (
              dataList.map((item: any, i: number) => {
                return (
                  <div
                    className={
                      curpro == item.dicKey ? styles.curitem : styles.item
                    }
                    key={i}
                    onClick={() => {
                      setpro(item.dicKey);
                      localStorage.setItem('val', item.dicKey);
                    }}
                  >
                    {item.dicName}
                    <div className={styles.action}>
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          setNewState(
                            dispatch,
                            'proj/ProjqueryById',
                            { id: item.dicKey },
                            () => {
                              ciftype({
                                ...iftype,
                                visible: true,
                                title: item.dicName + '详情',
                                key: 'detail',
                                fullScreen: true,
                              });
                            },
                          );
                        }}
                      >
                        <ArrowForwardIcon
                          color="primary"
                          style={{ fontSize: 12, margin: 10 }}
                        ></ArrowForwardIcon>
                      </IconButton>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 60,
                }}
                description="暂无数据"
                style={{ margin: '36px auto', marginTop: 66 }}
              ></Empty>
            )}
          </div>
        </Col>
        {dataList && dataList.length > 0 ? (
          <Col {...cols} style={{ display: 'flex' }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  alignSelf: 'flex-start',
                  paddingLeft: 20,
                  fontSize: 14,
                  color: '#000',
                }}
              >
                项目完成率
              </p>
              <ReactEcharts
                style={{
                  width: '100%',
                  height: 200,
                  marginTop: 12,
                  marginBottom: 24,
                }}
                option={getOption('项目完成率', home.IndexFirst.data.data.rate)}
              ></ReactEcharts>
              <Row style={{ width: '100%' }}>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>预计</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.planHours}小时
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>消耗</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.expendHours}小时
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#f50' }}>剩余</p>
                  <p style={{ color: 'orange' }}>
                    {home.IndexFirst.data.data.leftHours}小时
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderLeft: '#f0f0f0 solid 1px',
                borderRight: '#f0f0f0 solid 1px',
              }}
            >
              <p
                style={{
                  alignSelf: 'flex-start',
                  paddingLeft: 20,
                  fontSize: 14,
                  color: '#000',
                }}
              >
                任务完成率
              </p>
              <ReactEcharts
                style={{
                  width: '100%',
                  height: 200,
                  marginTop: 12,
                  marginBottom: 24,
                }}
                option={getOption(
                  '任务完成率',
                  home.IndexFirst.data.data.taskRate,
                )}
              ></ReactEcharts>
              <Row style={{ width: '100%' }}>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>所有任务</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.totalTaskNum}个
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>未完成任务</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.notFinishTask}个
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: 'green' }}>昨天完成任务</p>
                  <p style={{ color: '#4caf50' }}>
                    {home.IndexFirst.data.data.lastDayTask}个
                  </p>
                </Col>
              </Row>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  alignSelf: 'flex-start',
                  paddingLeft: 20,
                  fontSize: 14,
                  color: '#000',
                }}
              >
                Bug修复率
              </p>
              <ReactEcharts
                style={{
                  width: '100%',
                  height: 200,
                  marginTop: 12,
                  marginBottom: 24,
                }}
                option={getOption(
                  'Bug修复率',
                  home.IndexFirst.data.data.bugRate,
                )}
              ></ReactEcharts>
              <Row style={{ width: '100%' }}>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>所有Bug</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.totalBugNum}个
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#999' }}>未解决Bug</p>
                  <p style={{ color: '#000' }}>
                    {home.IndexFirst.data.data.notSolvedBug}个
                  </p>
                </Col>
                <Col span={8} className={styles.center}>
                  <p style={{ color: '#dc004e' }}>昨天解决Bug数</p>
                  <p style={{ color: 'red' }}>
                    {home.IndexFirst.data.data.lastDayBug}个
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        ) : (
          <Empty
            description="暂无数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            style={{ margin: '36px auto', marginTop: 66 }}
          ></Empty>
        )}
      </Row>
    </Card>
  );
};

export default connect(({ home, model, loading, proj }: any) => ({
  home,
  model,
  proj,
  loading: loading.effects['home/User'],
}))(First);
