import BaseController from "../BaseController";
import { mainStore } from "../store/MainStore";
import { toJS } from "mobx";
import { MobxModel } from "cpro/js/ui5/mobx/MobxModel";

/**
 * @namespace org.odata2ts.tst.mobx
 */
export default class MainController extends BaseController {
  private getTrippinService() {
    return this.getOwnerComponent().getTrippinService();
  }

  onInit() {
    const model = new MobxModel(mainStore);
    this.getView().setModel(model);
  }

  public onSearch() {
    const { search } = mainStore;

    // when logging you see the proxy object
    // console.log("search", search);
    // use special MobX method for that
    // console.log("search", toJS(search));

    this.getTrippinService()
      .People()
      .query((qb, qPerson) => {
        return qb.filter(
          !search.firstName ? undefined : qPerson.FirstName.toLower().contains(search.firstName?.toLowerCase()),
          !search.lastName ? undefined : qPerson.LastName.toLower().contains(search.lastName?.toLowerCase())
        );
      })
      .then((res) => {
        mainStore.people = res.data.value;
      })
      .catch((e) => {
        console.error("Oh no, search failed!", e);
      });
  }

  public onReset() {
    mainStore.resetSearch();
  }
}
