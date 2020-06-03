import {
  DepqueryTreeList,
  Depsave,
  DepdeleteById,
  DepqueryByParentId,
  UserqueryList,
  UserqueryAll,
  UserqueryWechatList,
  UserqueryTreeList,
  UserqueryAllSelect,
  Usersave,
  Chasave,
  Userdelete,
  Userreset,
  ChaqueryList,
  Chadelete,
  ChaqueryAllByRoleId,
  Chamissave,
  DataqueryTreeList,
  DataqueryDicTypeSelectList,
  Datasave,
  DatadeleteById,
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
    ChaqueryList: {
      data: {
        page: {},
      },
    },
    ChaqueryAllByRoleId: {
      data: {
        data: {
          haveIdList: [],
          premList: [],
        },
      },
    },
    DataqueryTreeList: {
      data: {
        page: {},
      },
    },
    UserqueryList: {},
    UserqueryAll: [],
    UserqueryWechatList: [],
    UserqueryTreeList: [],
    UserqueryAllSelect: [],
    DataqueryDicTypeSelectList: [],
    res: {},
  },
  effects: {
    *DataqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(DataqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: { DataqueryTreeList: responese },
      });
      return responese;
    },
    *ChaqueryAllByRoleId({ payload }: any, { call, put }: any) {
      const responese = yield call(ChaqueryAllByRoleId, payload);
      yield put({
        type: 'updateState',
        payload: { ChaqueryAllByRoleId: responese },
      });
      return responese;
    },
    *ChaqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(ChaqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { ChaqueryList: responese },
      });
      return responese;
    },
    *UserqueryAllSelect({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryAllSelect, payload);
      yield put({
        type: 'updateState',
        payload: { UserqueryAllSelect: responese.data && responese.data.data },
      });
      return responese;
    },
    *DataqueryDicTypeSelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(DataqueryDicTypeSelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          DataqueryDicTypeSelectList: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *UserqueryWechatList({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryWechatList, payload);
      yield put({
        type: 'updateState',
        payload: {
          UserqueryWechatList: responese.data && responese.data.wechatList,
        },
      });
      return responese;
    },
    *UserqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: {
          UserqueryTreeList: responese.data && responese.data.dataList,
        },
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
    *UserqueryList({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryList, payload);
      yield put({
        type: 'updateState',
        payload: { UserqueryList: responese },
      });
      return responese;
    },
    *Usersave({ payload }: any, { call, put }: any) {
      const responese = yield call(Usersave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Chamissave({ payload }: any, { call, put }: any) {
      const responese = yield call(Chamissave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Chasave({ payload }: any, { call, put }: any) {
      const responese = yield call(Chasave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Chadelete({ payload }: any, { call, put }: any) {
      const responese = yield call(Chadelete, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Userreset({ payload }: any, { call, put }: any) {
      const responese = yield call(Userreset, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Userdelete({ payload }: any, { call, put }: any) {
      const responese = yield call(Userdelete, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *DepqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: { DepqueryTreeList: responese },
      });
      return responese;
    },
    *Depsave({ payload }: any, { call, put }: any) {
      const responese = yield call(Depsave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Datasave({ payload }: any, { call, put }: any) {
      const responese = yield call(Datasave, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *DatadeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(DatadeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *DepdeleteById({ payload }: any, { call, put }: any) {
      const responese = yield call(DepdeleteById, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *DepqueryByParentId({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryByParentId, payload);
      yield put({
        type: 'updateState',
        payload: { DepqueryByParentId: responese },
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
