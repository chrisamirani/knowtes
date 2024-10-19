import { generate as generateAPIClient } from "openapi-typescript-codegen";

const SDK_CONFIG_PATH = {
  input: "./build/swagger.json",
  output: "../client/src/api-sdk",
};
generateAPIClient(SDK_CONFIG_PATH);
