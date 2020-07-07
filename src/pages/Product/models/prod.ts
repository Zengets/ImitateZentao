import {
  ProdqueryList,
  ProdqueryStatus,
  UserqueryAll,
  Prodsave,
  Prodactivation,
  Prodclose,
  ProddeleteById,
  ProdqueryInfo,
  umRequirequeryList,
  Bugpriority,
  umRequiretoproj,
  queryRequireStatusSelectList,
  queryRequireStageSelectList,
  Requireactivate,
  Requiresave,
  Requireclose,
  RequiredeleteById,
  queryDetailInfo,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    ProdqueryList: {
      data: {
        page: {},
      },
    },
    ProdqueryInfo: {
      data: {
        data: {},
      },
    },
    queryDetailInfo: {
      data: {
        data: {},
      },
    },
    ProdqueryStatus: [],
    UserqueryAll: [],
    umRequirequeryList: {
      data: {
        page: {},
      },
    },
    umRequiretoproj: [],
    queryRequireStatusSelectList: [],
    queryRequireStageSelectList: [],
    Bugpriority: [],
    res: {},
    code: {},
  },
  effects: {
    *queryDetailInfo({ payload }: any, { call, put }: any) {
      const responese = yield call(queryDetailInfo, payload);
      yield put({
        type: 'updateState',
        payload: { queryDetailInfo: responese },
      });
      return responese;
    },
    *umRequirequeryList({ payload }: any, { call, put }: any) {
      const responese = yield call(umRequirequeryList, payload);
      yield put({
        type: 'updateState',
        payload: { umRequirequeryList: responese },
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
    *ProdqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(ProdqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { ProdqueryList: responese },
      });
      return responese;
    },
    *UserqueryAll({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryAll, payload);
      yield put({
        type: 'updateState',
        payload: { UserqueryAll: responese.data && responese.data.parentList },
      });
      return responese;
    },
    *ProdqueryStatus({ payload }: any, { call, put }: any) {
      const responese = yield call(ProdqueryStatus, payload);
      yield put({
        type: 'updateState',
        payload: { ProdqueryStatus: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *Prodsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Prodsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Requireactivate({ payload }: any, { call, put }: any) {
      const responese = yield call(Requireactivate, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Requiresave({ payload }: any, { call, put }: any) {
      const responese = yield call(Requiresave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Requireclose({ payload }: any, { call, put }: any) {
      const responese = yield call(Requireclose, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *RequiredeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(RequiredeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Prodactivation({ payload }: any, { call, put }: any) {
      const responese = yield call(Prodactivation, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Prodclose({ payload }: any, { call, put }: any) {
      const responese = yield call(Prodclose, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *ProddeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(ProddeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
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
    *umRequiretoproj({ payload }: any, { call, put }: any) {
      const responese = yield call(umRequiretoproj, payload);
      yield put({
        type: 'updateState',
        payload: { umRequiretoproj: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *queryRequireStatusSelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(queryRequireStatusSelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryRequireStatusSelectList:
            responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *queryRequireStageSelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(queryRequireStageSelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryRequireStageSelectList:
            responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      for (let i in payload) {
        if (payload[i].code && payload[i].code !== '0000') {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};
