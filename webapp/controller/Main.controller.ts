import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterType from "sap/ui/model/FilterType";

/**
 * @namespace org.odata2ts.tst.controller
 */
export default class Main extends BaseController {
  private formatter = formatter;

  private createSearchForm() {
    return {
      firstName: "",
      lastName: "",
      age: "",
    };
  }

  onInit() {
    this.onReset();
  }

  onReset() {
    const searchForm = new JSONModel(this.createSearchForm(), false);
    this.getView().setModel(searchForm, "searchForm");
  }

  onSearch() {
    const searchForm = (this.getView().getModel("searchForm") as JSONModel).getData();

    const filters = [
      new Filter("FirstName", FilterOperator.Contains, searchForm.firstName),
      new Filter("LastName", FilterOperator.Contains, searchForm.lastName),
      // TODO: add other filters
      // new Filter("ServiceLevel", FilterOperator.EQ, searchForm.dispositionType),
      // new Filter("Prio", FilterOperator.EQ, searchForm.prio),
    ];

    this.getView().byId("peopleTable").getBinding("items").filter(filters, FilterType.Application);
  }
}
