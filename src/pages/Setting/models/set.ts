import {
  DepqueryTreeList,
  Depsave,
  DepdeleteById,
  DepqueryByParentId,
  UserqueryList,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    DepqueryTreeList: {
      data: {
        dataList: [],
      },
    },
    DepqueryByParentId: {
      data: {
        data: {},
      },
    },
    UserqueryList: {},
    res: {},
  },
  effects: {
    *UserqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { UserqueryList: responese },
      });
      return responese.code == '0000';
    },
    *DepqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: { DepqueryTreeList: responese },
      });
      return responese.code == '0000';
    },
    *Depsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Depsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese.code == '0000';
    },
    *DepdeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(DepdeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese.code == '0000';
    },
    *DepqueryByParentId({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryByParentId, payload);
      yield put({
        type: 'updateState',
        payload: { DepqueryByParentId: responese },
      });
      return responese.code == '0000';
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      for (let i in payload) {
        if (payload[i].code !== '0000') {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};
