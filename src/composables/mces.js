import { ElementaryService } from "@/pages/edit/mces/__index";
import DefaultService from ".";

export const useElementary = () => new DefaultService(new ElementaryService());
