import {ref} from '@vue/reactivity';
import {ContestService} from './contestend';

export const useContest = () => {
  const service = new ContestService();
  const data: any = ref();
  const quest: any = ref();
  const decision: any = ref();
  const msg = ref('');

  const composs = (res: any) => {
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
    if (res.status >= 300) msg.value = res.data.message;
  };

  const getData = async (params: any) => composs(await service.getData(params));
  const getQuests = async (params: any) =>
    composs(await service.getQuests(params));
  const getQuest = async (idx: any, params: any) =>
    composs(await service.getQuest(idx, params));
  const setAnswer = async (data: any) => composs(await service.setAnswer(data));
  const setPoint = async (data: any) => composs(await service.setPoint(data));
  const reset = async (level: any) => composs(await service.reset(level));
  const update = async (data: any) => composs(await service.update(data));
  const resetQuest = async (idx: any, level: any) =>
    composs(await service.resetOne(idx, level));

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
