import { changePassword, Logout } from '@/services/api.ts';
import { message } from 'antd';

export default {
  namespace: 'model',
  state: {
    res: {},
  },
  effects: {
    *changePassword({ payload }: any, { call, put }: any) {
      const responese = yield call(changePassword, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese.code == '0000';
    },
    *Logout({ payload }: any, { call, put }: any) {
      const responese = yield call(Logout, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
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
