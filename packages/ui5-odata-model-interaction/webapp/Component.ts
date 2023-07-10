import models from "./models";
import { TrippinService } from "./gen/trippin/TrippinService";
import { JQueryClient } from "@odata2ts/http-client-jquery";
import * as jq from "jquery";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace org.odata2ts.tst
 */
export default class Component extends UIComponent {
  private trippinService: TrippinService<JQueryClient>;

  public static metadata = {
    manifest: "json",
  };

  private contentDensityClass: string;

  public init(): void {
    // @ts-ignore: call the base component's init function
    super.init(); //eslint-disable-line

    this.setModel(models.createDeviceModel(), "device");

    // create the views based on the url/hash
    this.getRouter().initialize();

    // init Trippin OData service
    const client = new JQueryClient(jq);
    this.trippinService = new TrippinService(
      client,
      "https://services.odata.org/TripPinRESTierService/(S(uw0lp31en3kfizuwvgtataed))"
    );
  }

  public getTrippinService() {
    return this.trippinService;
  }

  /**
   * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
   * design mode class should be set, which influences the size appearance of some controls.
   *
   * @public
   * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
   */
  public getContentDensityClass(): string {
    if (this.contentDensityClass === undefined) {
      // check whether FLP has already set the content density class; do nothing in this case
      if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
        this.contentDensityClass = "";
      } else {
        this.contentDensityClass = "sapUiSizeCozy";
      }
    }
    return this.contentDensityClass;
  }
}
