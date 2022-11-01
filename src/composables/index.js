import { ref, reactive } from "vue";
import { noAuth } from "@/api/auth";
class DefaultService {
  constructor(newService) {
    const service = newService;

    const items = ref([]);
    const item = ref([]);
    const contestants = ref([]);
    const contestant = ref([]);
    const meta = ref([]);
    const loading = reactive({
      quest: false,
      contestant: false,
    });
    const exp = ref(false);

    const getItems = async () => {
      noAuth(exp);
      try {
        loading.quest = true;
        const res = await service.getAllQuests();
        items.value = res.data.quest;
        loading.quest = false;
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const getItem = async (id) => {
      noAuth(exp);
      try {
        loading.quest = true;
        const res = await service.getQuest(id);
        item.value = res.data.quest;
        loading.quest = false;
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const editItem = async (id, data) => {
      noAuth(exp);
      try {
        const res = await service.editQuest(id, data);
        setTimeout(() => {
          getItems();
        }, 500);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const answerItem = async (id, data) => {
      noAuth(exp);
      try {
        const res = await service.answerQuest(id, data);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const resetItems = async () => {
      noAuth(exp);
      try {
        const res = await service.resetQuests();
        setTimeout(() => {
          getItems();
        }, 500);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const getMeta = async () => {
      try {
        const res = await service.getMeta();
        meta.value = res.data.meta;
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const resetMeta = async () => {
      try {
        const res = await service.resetMeta();
        setTimeout(() => {
          getMeta();
        }, 500);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const upRes = async (data) => {
      try {
        const res = await service.upRes(data);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const getAllContestants = async () => {
      try {
        loading.contestant = true;
        const res = await service.getAllContestants();
        contestants.value = res.data.contestant;
        loading.contestant = false;
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const getContestant = async (id) => {
      try {
        const res = await service.getContestant(id);
        contestant.value = res.data.contestant;
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const editScore = async (data) => {
      noAuth(exp);
      try {
        const res = await service.editScore(data);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const resetContestants = async () => {
      try {
        const res = await service.resetContestants();
        setTimeout(() => {
          getAllContestants();
        }, 500);
        exp.value = false;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    return {
      items,
      item,
      meta,
      exp,
      loading,
      contestants,
      contestant,
      getItems,
      getItem,
      editItem,
      answerItem,
      resetItems,
      getMeta,
      resetMeta,
      upRes,
      getAllContestants,
      getContestant,
      editScore,
      resetContestants,
    };
  }
}

export default DefaultService;
