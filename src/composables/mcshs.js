import { SeniorService } from "@/pages/edit/mcshs/__index";
import DefaultService from ".";

export const useSenior = () => new DefaultService(new SeniorService());
