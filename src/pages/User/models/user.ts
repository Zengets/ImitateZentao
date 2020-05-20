import { Login, sendVerificationCode, reparePassword } from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    res: {},
  },
  effects: {
    *Login({ payload }: any, { call, put }: any) {
      const responese = yield call(Login, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese.code == '0000';
    },
    *sendVerificationCode({ payload }: any, { call, put }: any) {
      const responese = yield call(sendVerificationCode, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese.code == '0000';
    },
    *reparePassword({ payload }: any, { call, put }: any) {
      const responese = yield call(reparePassword, payload);
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
