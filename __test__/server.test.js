//const getGeo = require("../src/server/server");
import getGeo from "../src/server/server";

import 'babel-polyfill';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

it("Testing the Geonames API, by sending New York, and result should be US", async () => {
  const data = await getGeo("new york");
  expect(data.countryCode).toEqual("US");
})