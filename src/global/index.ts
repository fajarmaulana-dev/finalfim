import {createStore} from 'vuex';
import Local from '@/api/local';

const store = createStore({
  state() {
    return {
      user: Local.getLocalData('user')
        ? Local.getLocalData('user')
        : {
            userId: '',
            name: '',
            email: '',
            date: '',
            fimunnes: false,
          },
      alert: {
        mces: false,
        mcjhs: false,
        mcshs: false,
      },
    };
  },
  mutations: {
    // updateQuest(state: any, {is, idx, point, quest}: any) {
    //   state[is].questions[idx].point = point;
    //   state[is].questions[idx].question = quest;
    // },
    setAuth(state: any, {data}: any) {
      state.user = data;
    },
    spill(state: any, {is, to}: any) {
      state.alert[is] = to;
    },
  },
  actions: {
    login(context: any) {
      context.commit('setAuth', {data: Local.getLocalData('user')});
    },
    logout(context: any) {
      context.commit('setAuth', {
        data: {userId: '', name: '', email: '', date: '', fimunnes: false},
      });
    },
    // resetQuest(context: any, {is, idx}: any) {
    //   context.commit('updateQuest', {
    //     is,
    //     idx,
    //     point: 30,
    //     quest: `<p>Soal ${is} nomor ${idx + 1} belum diedit.</p>`,
    //   });
    // },
  },
  getters: {
    id: (state: any) => state.user.userId,
    // quest: (state) => (is: string, idx: number) => state[is].questions[idx],
  },
});

export default store;
