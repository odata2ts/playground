/* eslint-disable */
import BaseController from "../BaseController";
import { mainStore } from "./MobxMainStore";
import { toJS } from "mobx";
import { MobxModel } from "cpro/js/ui5/mobx/MobxModel";

export interface SearchForm {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
}

/**
 * @namespace org.odata2ts.tst.mobx
 */
export default class MobxMainController extends BaseController {
  private getTrippinService() {
    return this.getOwnerComponent().getTrippinService();
  }

  onInit() {
    // initial model
    const model = new MobxModel(mainStore);
    this.getView().setModel(model);
  }

  public onSearch() {
    const { search } = mainStore;

    console.log("search", search);
    console.log("search", toJS(search));

    this.getTrippinService()
      .navToPeople()
      .query((qb, qPerson) => {
        return qb.filter(
          qPerson.FirstName.toLower().contains(search.firstName.toLowerCase()),
          qPerson.LastName.toLower().contains(search.lastName.toLowerCase())
        );
      })
      .then((res) => {
        mainStore.setPeople(res.data.value);
      })
      .catch((e) => {
        console.error("Oh no, search failed!", e);
      });
  }
}
