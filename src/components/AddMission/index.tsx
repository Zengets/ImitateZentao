import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import { Input, message, List, Card, Tooltip, Row, Col, Modal } from 'antd';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import Dia from '@/components/Dia/index';
import Button from '@material-ui/core/Button';
import { ExclamationCircleOutlined } from '@ant-design/icons';

let AddMission = (props: any) => {
  let {
      miss,
      dispatch,
      loading,
      address,
      model,
      dicKey,
      dicName,
      iftype,
      cancel,
    } = props,
    projectId = model.postdata.projectId, //props projectid
    defaultfields: any = {
      projectId: {
        value: model.postdata.projectId, //初始化值
        type: 'select', //类型
        title: '所属项目', //placeholder
        name: ['projectId'], //唯一标识
        required: true, //必填？
        disabled: true,
        options: model.ProjquerySelectList && model.ProjquerySelectList,
      },
      requireId: {
        value: dicKey, //初始化值
        type: 'select', //类型
        title: '相关需求', //placeholder
        name: ['requireId'], //唯一标识
        required: true, //必填？
        // disabled: true,
        // hides: !dicKey,
        options: miss.querySelectByProjectId && miss.querySelectByProjectId,
      },
      taskName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '任务名称', //placeholder
        name: ['taskName'], //唯一标识
        required: true, //必填？
      },
      taskType: {
        value: '', //初始化值
        type: 'select', //类型
        title: '任务类型', //placeholder
        name: ['taskType'], //唯一标识
        required: true, //必填？
        options: model.queryTaskTypeSelectList && model.queryTaskTypeSelectList,
      },
      taskDescription: {
        value: '<p></p>', //初始化值
        type: 'editor',
        title: '任务描述',
        name: ['taskDescription'],
        required: false,
        rows: 6,
        col: { span: 24 },
      },
      priorityType: {
        value: undefined, //初始化值
        type: 'select', //类型
        title: '优先级', //placeholder
        name: ['priorityType'], //唯一标识
        required: true, //必填？
        options: model.Bugpriority && model.Bugpriority, //buglist
      },
      currentUserId: {
        value: '', //初始化值
        type: 'select', //类型
        title: '指派给', //placeholder
        name: ['currentUserId'], //唯一标识
        required: true, //必填？
        options:
          model.querySelectListByProjectId && model.querySelectListByProjectId,
      },
      devStageEndDate: {
        value: '', //初始化值
        type: 'datepicker',
        title: '截止日期',
        name: ['devStageEndDate'],
        required: true,
        disabledDate: (current: any) => {
          return (
            current &&
            current <
              moment()
                .add('day', -1)
                .endOf('day')
          );
        },
      },
      devStagePlanHours: {
        value: '', //初始化值
        type: 'inputnumber',
        title: '预计时长',
        min: 1,
        name: ['devStagePlanHours'],
        required: true,
      },
      attachmentList: {
        value: [], //初始化值
        type: 'upload',
        title: '附件',
        name: ['attachmentList'],
        required: false,
        col: { span: 24 },
      },
    },
    [fields, cf] = useState(defaultfields),
    [isover, cis] = useState(false);
  //父级组件项目变化调用
  useMemo(() => {
    if (model.postdata.projectId) {
      let projectId = model.postdata.projectId;
      setNewState(
        dispatch,
        'model/querySelectListByProjectId',
        { projectId: projectId },
        () => {},
      );
      setNewState(
        dispatch,
        'miss/querySelectByProjectId',
        { projectId: projectId },
        (res: any) => {},
      );
    }
  }, [model.postdata.projectId]);

  useEffect(() => {
    cf(defaultfields);
  }, [iftype]);

  let actions = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          onClick={() => {
            cf({
              ...defaultfields,
              taskDescription: {
                ...defaultfields.taskDescription,
                rerender: true,
              },
            });
            cis(false);
          }}
        >
          继续添加任务
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          size="large"
          disableElevation
          style={{ margin: '0 24px' }}
          onClick={() => {
            history.push('/index/mission');
            cis(false);
          }}
        >
          跳转任务列表
        </Button>
        <Button
          fullWidth
          size="large"
          disableElevation
          onClick={() => {
            Modal.destroyAll();
            cancel(true);
          }}
        >
          返回需求列表
        </Button>
      </div>
    );
  };

  return (
    <Dia
      show={iftype.fv}
      cshow={(key: React.SetStateAction<boolean>) => {
        cancel();
        cis(false);
      }}
      maxWidth="lg"
      title={iftype.title}
      footer={<div style={{ height: 24 }}></div>}
    >
      {iftype.fv && (
        <InitForm
          fields={fields}
          submitData={(values: any) => {
            let newfields = JSON.parse(JSON.stringify(values));
            if (iftype.key == 'edit') {
              newfields.id = iftype.curitem.id;
            }
            let newlist = newfields.attachmentList.fileList
              ? newfields.attachmentList.fileList.map(
                  (items: any, i: number) => {
                    return {
                      attachmentName: items.response
                        ? items.response.data.dataList[0].name
                        : items.name,
                      attachUrl: items.response
                        ? items.response.data.dataList[0].url
                        : items.url,
                    };
                  },
                )
              : [];
            newfields.attachmentList = newlist;
            newfields.devStageStartDate = newfields.devStageStartDate
              ? moment(newfields.devStageStartDate)
                  .startOf('day')
                  .valueOf()
              : '';
            newfields.devStageEndDate = newfields.devStageEndDate
              ? moment(newfields.devStageEndDate)
                  .startOf('day')
                  .valueOf()
              : '';
            setNewState(dispatch, address, newfields, () => {
              message.success('操作成功');
              cis(true);
              if (!dicKey) {
                cancel(true);
              }
            });
          }}
          onChange={(newFields: any) => {}}
          submitting={loading.effects[address] || !iftype.fv}
          actions={isover && dicKey ? actions : null}
        ></InitForm>
      )}
    </Dia>
  );
};

export default connect(({ miss, model, loading }: any) => ({
  miss,
  model,
  loading,
}))(AddMission);
