import { ConfigFileOptions, EmitModes, Modes } from "@odata2ts/odata2ts";

const config: ConfigFileOptions = {
  mode: Modes.service,
  emitMode: EmitModes.ts,
  allowRenaming: false,
  services: {
    trippin: {
      serviceName: "Trippin",
      source: "resource/trippin.xml",
      output: "webapp/gen/trippin",
    },
  },
};

export default config;
