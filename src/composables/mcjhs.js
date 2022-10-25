import { ref } from "vue";
import { JuniorService } from "@/pages/edit/mcjhs/__index";

export const useJunior = () => {
  const service = new JuniorService();

  const items = ref([]);
  const item = ref([]);
  const contestants = ref([]);
  const meta = ref([]);

  const getItems = async () => {
    try {
      const res = await service.getAllQuests();
      items.value = res.data.quest;
      return res;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getItem = async (id) => {
    try {
      const res = await service.getQuest(id);
      item.value = res.data.quest;
      return res;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const editItem = async (id, data) => {
    try {
      const res = await service.editQuest(id, data);
      setTimeout(() => {
        getItems();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const answerItem = async (id, data) => {
    try {
      const res = await service.answerQuest(id, data);
      setTimeout(() => {
        getItems();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const resetItems = async () => {
    try {
      const res = await service.resetQuests();
      setTimeout(() => {
        getItems();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const getMeta = async () => {
    try {
      const res = await service.getMeta();
      meta.value = res.data.meta;
      return res;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const resetMeta = async () => {
    try {
      const res = await service.resetMeta();
      setTimeout(() => {
        getMeta();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const upRes = async (data) => {
    try {
      const res = await service.upRes(data);
      setTimeout(() => {
        getMeta();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const upMod = async (data) => {
    try {
      const res = await service.upMod(data);
      setTimeout(() => {
        getMeta();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const upLess = async (data) => {
    try {
      const res = await service.upLess(data);
      setTimeout(() => {
        getMeta();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const upDiag = async (data) => {
    try {
      const res = await service.upDiag(data);
      setTimeout(() => {
        getMeta();
      }, 500);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllContestants = async () => {
    try {
      const res = await service.getAllContestants();
      contestants.value = res.data.contestant;
      return res;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const editScore = async (data) => {
    try {
      const res = await service.editScore(data);
      setTimeout(() => {
        getAllContestants();
      }, 500);
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
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    items,
    item,
    meta,
    contestants,
    getItems,
    getItem,
    editItem,
    answerItem,
    resetItems,
    getMeta,
    resetMeta,
    upDiag,
    upLess,
    upMod,
    upRes,
    getAllContestants,
    editScore,
    resetContestants,
  };
};
