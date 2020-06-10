import {
  querySelectListByProjectId,
  BugqueryList,
  Bugsave,
  Demosave,
  BugqueryById,
  Bugdelete,
  Bugsolve,
  Bugconfirm,
  Bugactivate,
  Bugstatus,
  Bugtype,
  Bugstage,
  Bugseverity,
  Bugpriority,
  Bugsolution,
  ProjquerySelectList,
  ProjqueryById,
  ProdqueryInfo,
  DemoqueryList,
  Demotype,
  DemoqueryListByCaseId,
  DemoqueryFailListByCaseId,
  Demotree,
  Demoexecute,
  DemoqueryById,
} from '@/services/api.ts';

import { message } from 'antd';

export default {
  state: {
    ProjqueryById: {
      data: {
        data: {},
      },
    },
    DemoqueryById: {
      data: {
        data: {},
      },
    },
    ProdqueryInfo: {
      data: {
        data: {},
      },
    },
    BugqueryList: {
      data: {
        page: {},
      },
    },
    DemoqueryList: {
      data: {
        page: {},
      },
    },
    DemoqueryListByCaseId: {
      data: {
        dataList: [],
      },
    },
    DemoqueryFailListByCaseId: {
      data: {
        dataList: [],
      },
    },
    Demotree: {
      data: {
        dataList: [],
      },
    },
    BugqueryById: {},
    querySelectListByProjectId: [],
    done: true,
    Bugstatus: [],
    Bugtype: [],
    Demotype: [],
    Bugstage: [],
    Bugseverity: [],
    Bugpriority: [],
    Bugsolution: [],
    ProjquerySelectList: [],
    res: {},
  },
  effects: {
    *Demotree({ payload }: any, { call, put }: any) {
      const responese = yield call(Demotree, payload);
      yield put({
        type: 'updateState',
        payload: { Demotree: responese },
      });
      return responese;
    },
    *DemoqueryListByCaseId({ payload }: any, { call, put }: any) {
      const responese = yield call(DemoqueryListByCaseId, payload);
      yield put({
        type: 'updateState',
        payload: { DemoqueryListByCaseId: responese },
      });
      return responese;
    },
    *DemoqueryFailListByCaseId({ payload }: any, { call, put }: any) {
      const responese = yield call(DemoqueryFailListByCaseId, payload);
      yield put({
        type: 'updateState',
        payload: { DemoqueryFailListByCaseId: responese },
      });
      return responese;
    },

    *DemoqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(DemoqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { DemoqueryList: responese },
      });
      return responese;
    },

    *ProdqueryInfo({ payload }: any, { call, put }: any) {
      const responese = yield call(ProdqueryInfo, payload);
      yield put({
        type: 'updateState',
        payload: { ProdqueryInfo: responese },
      });
      return responese;
    },
    *ProjqueryById({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjqueryById, payload);
      yield put({
        type: 'updateState',
        payload: { ProjqueryById: responese },
      });
      return responese;
    },
    *DemoqueryById({ payload }: any, { call, put }: any) {
      const responese = yield call(DemoqueryById, payload);
      yield put({
        type: 'updateState',
        payload: { DemoqueryById: responese },
      });
      return responese;
    },
    *ProjquerySelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjquerySelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          ProjquerySelectList: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *BugqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(BugqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { BugqueryList: responese },
      });
      return responese;
    },
    *BugqueryById({ payload }: any, { call, put }: any) {
      const responese = yield call(BugqueryById, payload);
      yield put({
        type: 'updateState',
        payload: { BugqueryById: responese },
      });
      return responese;
    },
    *Bugsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Demosave({ payload }: any, { call, put }: any) {
      const responese = yield call(Demosave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Bugdelete({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugdelete, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Bugsolve({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugsolve, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Demoexecute({ payload }: any, { call, put }: any) {
      const responese = yield call(Demoexecute, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Bugconfirm({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugconfirm, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Bugactivate({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugactivate, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *querySelectListByProjectId({ payload }: any, { call, put }: any) {
      const responese = yield call(querySelectListByProjectId, payload);
      yield put({
        type: 'updateState',
        payload: {
          querySelectListByProjectId: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *Bugstatus({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugstatus, payload);
      yield put({
        type: 'updateState',
        payload: { Bugstatus: responese.data && responese.data.dataList },
      });
      yield put({
        type: 'updateState',
        payload: { done: false },
      });
      return responese;
    },
    *Bugtype({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugtype, payload);
      yield put({
        type: 'updateState',
        payload: { Bugtype: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Demotype({ payload }: any, { call, put }: any) {
      const responese = yield call(Demotype, payload);
      yield put({
        type: 'updateState',
        payload: { Demotype: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Bugstage({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugstage, payload);
      yield put({
        type: 'updateState',
        payload: { Bugstage: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Bugseverity({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugseverity, payload);
      yield put({
        type: 'updateState',
        payload: { Bugseverity: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Bugpriority({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugpriority, payload);
      yield put({
        type: 'updateState',
        payload: { Bugpriority: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Bugsolution({ payload }: any, { call, put }: any) {
      const responese = yield call(Bugsolution, payload);
      yield put({
        type: 'updateState',
        payload: { Bugsolution: responese.data && responese.data.dataList },
      });
      return responese;
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      for (let i in payload) {
        if (payload[i].code != '0000' && payload[i].code) {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};
