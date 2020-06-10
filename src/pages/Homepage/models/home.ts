import {
  IndexFirst,
  IndexSecond,
  IndexThird,
  IndexFourth,
  IndexFifth,
  IndexSixth,
  queryTaskStatusSelectList,
  MisquerytaskDetails,
  querySelectListByProjectId,
} from '@/services/api.ts';

import { message } from 'antd';

export default {
  state: {
    IndexFirst: {
      data: {
        data: {},
      },
    },
    IndexSecond: {
      data: {
        data: {},
      },
    },
    IndexFourth: {
      data: {
        dataList: {},
      },
    },
    IndexFifth: {
      data: {
        dataList: {},
      },
    },
    IndexThird: {
      data: {
        dataList: {},
      },
    },
    IndexSixth: {
      data: {
        dataList: {},
      },
    },
    queryTaskStatusSelectList: [],
    MisquerytaskDetails: {
      data: {
        data: {},
      },
    },
    querySelectListByProjectId: [],
    res: {},
  },
  effects: {
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
    *MisquerytaskDetails({ payload }: any, { call, put }: any) {
      const responese = yield call(MisquerytaskDetails, payload);
      yield put({
        type: 'updateState',
        payload: { MisquerytaskDetails: responese },
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
    *IndexFirst({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexFirst, payload);
      yield put({
        type: 'updateState',
        payload: { IndexFirst: responese },
      });
      return responese;
    },
    *IndexSecond({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexSecond, payload);
      yield put({
        type: 'updateState',
        payload: { IndexSecond: responese },
      });
      return responese;
    },
    *IndexThird({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexThird, payload);
      yield put({
        type: 'updateState',
        payload: { IndexThird: responese },
      });
      return responese;
    },
    *IndexFourth({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexFourth, payload);
      yield put({
        type: 'updateState',
        payload: { IndexFourth: responese },
      });
      return responese;
    },
    *IndexFifth({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexFifth, payload);
      yield put({
        type: 'updateState',
        payload: { IndexFifth: responese },
      });
      return responese;
    },
    *IndexSixth({ payload }: any, { call, put }: any) {
      const responese = yield call(IndexSixth, payload);
      yield put({
        type: 'updateState',
        payload: { IndexSixth: responese },
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
