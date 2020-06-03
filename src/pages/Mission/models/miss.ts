import {
  MisquerytaskRelease,
  Missave,
  MisdeleteById,
  Misactivation,
  ProjquerySelectList,
  querySelectListByProjectId,
  MisquerytaskAssign,
  Misassign,
  MisquerytaskDevelop,
  MisdevelopStart,
  MisdevelopEnd,
  MisquerytaskTest,
  Mistest,
  MisquerytaskCheck,
  Mischeck,
  MisquerytaskOverview,
  Misclose,
  queryTaskStatusSelectList,
} from '@/services/api.ts';

import { message } from 'antd';

export default {
  state: {
    MisquerytaskRelease: {
      data: {
        page: {},
      },
    },
    MisquerytaskAssign: {
      data: {
        page: {},
      },
    },
    MisquerytaskDevelop: {
      data: {
        page: {},
      },
    },
    MisquerytaskTest: {
      data: {
        page: {},
      },
    },
    MisquerytaskCheck: {
      data: {
        page: {},
      },
    },
    MisquerytaskOverview: {
      data: {
        page: {},
      },
    },
    ProjquerySelectList: [],
    queryTaskStatusSelectList: [],
    querySelectListByProjectId: [],
    res: {},
  },
  effects: {
    *MisquerytaskRelease({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskRelease, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskRelease: responese },
      });
      return responese;
    },
    *MisquerytaskAssign({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskAssign, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskAssign: responese },
      });
      return responese;
    },
    *MisquerytaskDevelop({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskDevelop, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskDevelop: responese },
      });
      return responese;
    },
    *MisquerytaskTest({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskTest, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskTest: responese },
      });
      return responese;
    },
    *MisquerytaskCheck({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskCheck, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskCheck: responese },
      });
      return responese;
    },
    *MisquerytaskOverview({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskOverview, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskOverview: responese },
      });
      return responese;
    },
    *Mischeck({ payload }: any, { call, put }: any) {
      const responese = yield call(Mischeck, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Misclose({ payload }: any, { call, put }: any) {
      const responese = yield call(Misclose, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Mistest({ payload }: any, { call, put }: any) {
      const responese = yield call(Mistest, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Missave({ payload }: any, { call, put }: any) {
      const responese = yield call(Missave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Misassign({ payload }: any, { call, put }: any) {
      const responese = yield call(Misassign, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *MisdevelopStart({ payload }: any, { call, put }: any) {
      const responese = yield call(MisdevelopStart, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *MisdevelopEnd({ payload }: any, { call, put }: any) {
      const responese = yield call(MisdevelopEnd, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },

    *MisdeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(MisdeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Misactivation({ payload }: any, { call, put }: any) {
      const responese = yield call(Misactivation, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
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
    *queryTaskStatusSelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(queryTaskStatusSelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryTaskStatusSelectList: responese.data && responese.data.dataList,
        },
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
