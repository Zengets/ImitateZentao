import { User } from '@/services/api.ts';

export default {
  namespace: 'model',
  state: {
    User: [],
  },
  effects: {
    *User({ payload }: any, { call, put }: any) {
      //datalist
      const responese = yield call(User, payload);
      console.log(responese);
      yield put({
        type: 'updateState',
        payload: { User: responese.users ? responese.users : [] },
      });
      return responese.code == '0000';
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
};
