import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";

export default {
  config(_input) {
    return {
      name: "nokdo",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(ExampleStack);
  }
} satisfies SSTConfig;
