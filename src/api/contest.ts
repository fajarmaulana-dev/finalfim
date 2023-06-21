import {ref} from '@vue/reactivity';
import Api from './api';

export const useContest = () => {
  const data: any = ref();
  const quest: any = ref();
  const decision: any = ref();
  const msg = ref('');

  const composs = async (func: any) => {
    msg.value = '';
    try {
      const res = await func;
      if (res.data) {
        if (res.data.data) {
          decision.value = undefined;
          msg.value = '';
          data.value = res.data.data;
        }
        if (res.data.quest) {
          decision.value = undefined;
          msg.value = '';
          quest.value = res.data.quest;
        }
        if (res.data.decision) {
          decision.value = undefined;
          msg.value = '';
          decision.value = res.data.decision;
        }
      }
    } catch (err: any) {
      msg.value = err.response.data.message;
    }
  };

  const getData = async (params: any) => composs(Api.get(`/contest`, {params}));
  const getQuests = async (params: any) =>
    composs(Api.get(`/contest/quest`, {params}));
  const getQuest = async (idx: any, params: any) =>
    composs(Api.get(`/contest/quest/${idx}`, {params}));
  const setAnswer = async (data: any) => composs(Api.patch(`/contest`, data));
  const setPoint = async (data: any) =>
    composs(Api.patch(`/contest/point`, data));
  const reset = async (level: any) =>
    composs(Api.patch(`/contest/reset?is=${level}`));
  const update = async (data: any) =>
    composs(Api.patch(`/contest/update`, data));
  const resetQuest = async (idx: any, level: any) =>
    composs(Api.patch(`/contest/reset/${idx}?is=${level}`));

  return {
    data,
    quest,
    msg,
    decision,
    getData,
    getQuests,
    getQuest,
    setAnswer,
    setPoint,
    reset,
    update,
    resetQuest,
  };
};
