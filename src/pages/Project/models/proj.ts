import {
  ProjqueryList,
  ProdqueryAllSelect,
  ProjqueryProjectStatusSelectList,
  UserqueryAll,
  Projsave,
  Projstart,
  Projfinish,
  ProjdeleteById,
  ProdqueryInfo,
  ProjqueryById,
  TeamdeleteById,
  TeamqueryAllUser,
  Teamsave,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    ProjqueryList: {
      data: {
        page: {},
      },
    },
    ProdqueryInfo: {
      data: {
        data: {},
      },
    },
    ProjqueryById: {
      data: {
        data: {},
      },
    },
    TeamqueryAllUser: [],
    ProdqueryAllSelect: [],
    ProjqueryProjectStatusSelectList: [],
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
    *ProjqueryById({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjqueryById, payload);
      yield put({
        type: 'updateState',
        payload: { ProjqueryById: responese },
      });
      return responese;
    },
    *ProjqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { ProjqueryList: responese },
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
    *ProdqueryAllSelect({ payload }: any, { call, put }: any) {
      const responese = yield call(ProdqueryAllSelect, payload);
      yield put({
        type: 'updateState',
        payload: { ProdqueryAllSelect: responese.data && responese.data.data },
      });
      return responese;
    },
    *TeamqueryAllUser({ payload }: any, { call, put }: any) {
      const responese = yield call(TeamqueryAllUser, payload);
      yield put({
        type: 'updateState',
        payload: {
          TeamqueryAllUser: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *ProjqueryProjectStatusSelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjqueryProjectStatusSelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          ProjqueryProjectStatusSelectList:
            responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *Projsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Projsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Teamsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Teamsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *TeamdeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(TeamdeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Projstart({ payload }: any, { call, put }: any) {
      const responese = yield call(Projstart, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Projfinish({ payload }: any, { call, put }: any) {
      const responese = yield call(Projfinish, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *ProjdeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjdeleteById, payload);
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
