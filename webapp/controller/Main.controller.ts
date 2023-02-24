import BaseController from "./BaseController";
import formatter from "../model/formatter";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterType from "sap/ui/model/FilterType";
import { createQueryBuilderV4 } from "@odata2ts/odata-query-builder";
import { qPerson } from "org/odata2ts/tst/gen/trippin/QTrippin";
import * as jq from "jquery";
import { ODataCollectionResponseV4 } from "@odata2ts/odata-core";
import { Person } from "org/odata2ts/tst/gen/trippin/TrippinModel";

export interface SearchForm {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
}

/**
 * @namespace org.odata2ts.tst.controller
 */
export default class Main extends BaseController {
  private formatter = formatter;

  private createSearchForm(): SearchForm {
    return {
      firstName: "",
      lastName: "",
    };
  }

  private getTrippinService() {
    return this.getOwnerComponent().getTrippinService();
  }

  onInit() {
    this.onReset();

    // initial model
    this.getView().setModel(new JSONModel([]), "trip");
  }

  onReset() {
    const searchForm = new JSONModel(this.createSearchForm(), false);
    this.getView().setModel(searchForm, "searchForm");
  }

  onSearchClassic() {
    const searchForm = (this.getView().getModel("searchForm") as JSONModel).getData() as SearchForm;

    const filters = [
      new Filter("FirstName", FilterOperator.Contains, searchForm.firstName),
      new Filter("LastName", FilterOperator.Contains, searchForm.lastName),
      // TODO: add other filters
      // new Filter("ServiceLevel", FilterOperator.EQ, searchForm.dispositionType),
      // new Filter("Prio", FilterOperator.EQ, searchForm.prio),
    ];

    this.getView().byId("peopleTable").getBinding("items").filter(filters, FilterType.Application);
  }

  onSearchWithBuilder() {
    const searchForm = (this.getView().getModel("searchForm") as JSONModel).getData() as SearchForm;

    const builder = createQueryBuilderV4("People", qPerson);
    builder
      .expanding("Trips", (tripBuilder, qTrip) => {
        return tripBuilder.select("Budget");
      })
      .filter(
        searchForm.firstName ? qPerson.FirstName.contains(searchForm.firstName) : undefined,
        searchForm.lastName ? qPerson.LastName.contains(searchForm.lastName) : undefined,
        null,
        undefined
      );
    const uri = `https://services.odata.org/TripPinRESTierService/(S(owzxqhvev5aoqr2ossuzxhvq))/${builder.build()}`;

    // new OData2tsModel(service.People("russellwhyte").BestFriend(), "bestFriend");

    jq.get(uri, (response: ODataCollectionResponseV4<Person>) => {
      console.log("response", response.value);
      (this.getView().getModel("trip") as JSONModel).setData(response.value);
    }).catch((e) => {
      console.error("failed get request!");
    });
  }

  onSearch() {
    const searchForm = (this.getView().getModel("searchForm") as JSONModel).getData() as SearchForm;

    this.getTrippinService()
      .navToPeople()
      .query((qb, qPerson) => {
        return qb.filter(
          qPerson.FirstName.contains(searchForm.firstName),
          qPerson.LastName.contains(searchForm.lastName)
        );
      })
      .then((res) => {
        (this.getView().getModel("trip") as JSONModel).setData(res.data.value);
      })
      .catch((e) => {
        console.error("Oh no, search failed!", e);
      });
  }
}
