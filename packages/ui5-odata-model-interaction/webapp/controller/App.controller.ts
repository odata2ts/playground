import BaseController from "../BaseController";

/**
 * @namespace org.odata2ts.tst.controller
 */
export default class App extends BaseController {
  public onInit(): void {
    // apply content density mode to root view
    this.getView().addStyleClass(this.getAppComponent().getContentDensityClass());
  }
}
