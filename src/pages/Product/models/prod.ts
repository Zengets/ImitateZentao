import {
  ProdqueryList,
  ProdqueryStatus,
  UserqueryAll,
  Prodsave,
  Prodactivation,
  Prodclose,
  ProddeleteById,
  ProdqueryInfo,
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
    ProdqueryStatus: [],
    UserqueryAll: [],
    res: {},
  },
  effects: {
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
