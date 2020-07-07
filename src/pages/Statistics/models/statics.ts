import { queryProjectTaskStatus } from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    queryProjectTaskStatus: [],
    code: {},
  },
  effects: {
    *queryProjectTaskStatus({ payload }: any, { call, put }: any) {
      const responese = yield call(queryProjectTaskStatus, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryProjectTaskStatus: responese.data && responese.data.dataList,
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
