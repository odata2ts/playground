/* eslint-disable */
import BaseController from "../BaseController";
import { MobxMainStore } from "./MobxMainStore";
import { makeAutoObservable, toJS } from "mobx";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";
import { MobxModel } from "cpro/js/ui5/mobx/MobxModel";

export interface SearchForm {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
}

function createSearchForm(): SearchForm {
  return {
    firstName: "",
    lastName: "why",
  };
}

/**
 * @namespace org.odata2ts.tst.mobx
 */
export default class MobxMainController extends BaseController {
  private state = makeAutoObservable({
    search: createSearchForm(),
    people: [],
    get formattedPeople(): Array<Person> {
      return this.people.map((p) => {
        return { ...p, fullName: `${p.FirstName} ${p.LastName}` };
      });
    },
  });

  private getTrippinService() {
    return this.getOwnerComponent().getTrippinService();
  }

  onInit() {
    // initial model
    const model = new MobxModel(this.state);
    this.getView().setModel(model);
  }

  public onSearch() {
    const { search, people } = this.state;

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
        people.length = 0;
        people.push(...res.data.value);
      })
      .catch((e) => {
        console.error("Oh no, search failed!", e);
      });
  }
}
