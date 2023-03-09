import BaseController from "../BaseController";
import { MobxMainStore } from "./MobxMainStore";
import { MobxModel } from "org/odata2ts/tst/mobx/lib/MobxModel";
import { makeAutoObservable } from "mobx";

export interface SearchForm {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
}

function createSearchForm(): SearchForm {
  return {
    firstName: "russel",
    lastName: "why",
  };
}

export default class MobxMainController extends BaseController {
  private stateDirect = makeAutoObservable({ search: createSearchForm(), people: [] });
  private state = new MobxMainStore();

  private getTrippinService() {
    return this.getOwnerComponent().getTrippinService();
  }

  onInit() {
    // initial model
    const model = new MobxModel(this.stateDirect);
    this.getView().setModel(model, "model");
  }

  public onSearch() {
    const { search, people } = this.stateDirect;

    this.getTrippinService()
      .navToPeople()
      .query((qb, qPerson) => {
        return qb.filter(
          qPerson.FirstName.toLower().contains(search.firstName.toLowerCase()),
          qPerson.LastName.toLower().contains(search.lastName.toLowerCase())
        );
      })
      .then((res) => {
        people.push(...res.data.value);
      })
      .catch((e) => {
        console.error("Oh no, search failed!", e);
      });
  }
}
