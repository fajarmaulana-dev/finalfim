import { ref, reactive } from "vue";
import { noAuth } from "@/api/auth";
import TokenService from "@/api/token";
import router from "@/router";
const user = TokenService.getUser();
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

    const getItems = async () => {
      noAuth();
      try {
        loading.quest = true;
        const res = await service.getAllQuests();
        items.value = res.data.quest;
        loading.quest = false;
        return res;
      } catch (err) {
        if (err.response) {
          if (user && err.response.status === 403) {
            router.go(0);
          }
        } else {
          router.push("/auth/login");
        }
        console.log(err);
      }
    };

    const getItem = async (id) => {
      noAuth();
      try {
        loading.quest = true;
        const res = await service.getQuest(id);
        item.value = res.data.quest;
        loading.quest = false;
        return res;
      } catch (err) {
        if (err.response) {
          if (user && err.response.status === 403) {
            router.go(0);
          }
        } else {
          router.push("/auth/login");
        }
        console.log(err);
      }
    };

    const editItem = async (id, data) => {
      noAuth();
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
      noAuth();
      try {
        const res = await service.answerQuest(id, data);
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const resetItems = async () => {
      noAuth();
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
        console.log(err);
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
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const getContestant = async (id) => {
      try {
        const res = await service.getContestant(id);
        contestant.value = res.data.contestant;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const editScore = async (data) => {
      noAuth();
      try {
        const res = await service.editScore(data);

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
