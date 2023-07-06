import { observable, makeObservable, computed, action, makeAutoObservable } from "mobx";
import { SearchForm } from "./MobxMain.controller";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";

class MobxMainStore {
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
    // makeObservable(this, {
    //   search: observable,
    //   people: observable.ref,
    //   setPeople: action,
    //   formattedPeople: computed,
    //   peopleCount: computed,
    // });
    makeAutoObservable(this);
  }

  get peopleCount() {
    return this.people.length;
  }

  get formattedPeople(): Array<Person> {
    console.log("inside computed value!!!!!!!!!!!!!!!!!!!!!");
    return this.people.map((p) => {
      return { ...p, fullName: `${p.FirstName} ${p.LastName}` };
    });
  }

  public setPeople(people: Array<Person>) {
    this.people = people;
  }
}

export const mainStore = new MobxMainStore();
