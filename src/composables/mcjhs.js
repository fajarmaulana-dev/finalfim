import { JuniorService } from "@/pages/edit/mcjhs/__index";
import DefaultService from ".";

export const useJunior = () => new DefaultService(new JuniorService());
