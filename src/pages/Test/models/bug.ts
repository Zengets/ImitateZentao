import {
  querySelectListByProjectId,
  BugqueryList,
  Bugsave,
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
} from '@/services/api.ts';

import { message } from 'antd';

export default {
  state: {
    BugqueryList: {
      data: {
        page: {},
      },
    },
    BugqueryById: {},
    querySelectListByProjectId: [],
    done: true,
    Bugstatus: [],
    Bugtype: [],
    Bugstage: [],
    Bugseverity: [],
    Bugpriority: [],
    Bugsolution: [],
    ProjquerySelectList: [],
    res: {},
  },
  effects: {
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
        payload: { BugqueryById: responese.data && responese.data.data },
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
        if (payload[i].code !== '0000' && payload[i].code) {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};
