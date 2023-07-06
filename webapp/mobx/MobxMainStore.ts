import { observable, makeObservable } from "mobx";
import { SearchForm } from "./MobxMain.controller";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";

export class MobxMainStore {
  // @observable
  search: SearchForm = {
    firstName: "",
    lastName: "",
    age: undefined,
    userName: "",
  };

  // @observable.ref
  people: Array<Person> = [];

  constructor() {
    makeObservable(this, {
      search: observable,
      people: observable.ref,
    });
  }

  get peopleCount() {
    return this.people.length;
  }
}
