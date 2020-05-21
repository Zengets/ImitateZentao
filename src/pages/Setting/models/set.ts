import { DepqueryTreeList } from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    DepqueryTreeList: {
      data: {
        dataList: [],
      },
    },
  },
  effects: {
    *DepqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: { DepqueryTreeList: responese },
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
