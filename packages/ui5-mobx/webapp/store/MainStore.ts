import { action, makeAutoObservable } from "mobx";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";
import { EnrichedPersonModel, SearchForm } from "./DemoModel";

class MainStore {
  // primitive property
  public busy = false;
  // the search result from the server
  public people: Array<Person> = [];
  // object type: all properties must be initialized
  public search: SearchForm = {
    firstName: undefined,
    lastName: "",
  };
  // use map instead of object when keys are not known in advance
  public selected = new Map<string, Person>();

  constructor() {
    makeAutoObservable(this, { resetSearch: action });
  }

  // stupid example for a computed value
  public get formattedPeople(): Array<EnrichedPersonModel> {
    // console.log("inside computed value!!!!!!!!!!!!!!!!!!!!!");
    return this.people.map((p) => {
      return { ...p, fullName: `${p.FirstName} ${p.LastName}` } as EnrichedPersonModel;
    });
  }

  // client side filtering would be easy
  get filteredPeople(): Array<Person> {
    return this.people.filter((p) => p.LastName === this.search.lastName);
  }

  // an action
  public resetSearch() {
    this.search.firstName = undefined;
    this.search.lastName = "";
  }
}

export const mainStore = new MainStore();
