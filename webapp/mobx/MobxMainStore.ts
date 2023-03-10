import { observable, makeObservable } from "mobx";
import { SearchForm } from "./MobxMain.controller";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";

export class MobxMainStore {
  search: SearchForm = {
    firstName: "",
    lastName: "",
    age: undefined,
    userName: "",
  };
  people: Array<Person> = [];
  get peopleCount() {
    return this.people.length;
  }

  constructor() {
    makeObservable(this, {
      search: observable,
      people: observable.ref,
    });
  }
}
