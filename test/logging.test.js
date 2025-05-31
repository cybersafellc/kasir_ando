import { logger } from "../src/app/logging.js";

describe("test logger", function () {
  it("testing error", async function () {
    await logger.error("this message error");
  });
  it("testing warn", async function () {
    await logger.warn("this message warning");
  });
  it("testing info", async function () {
    await logger.info("this message info");
  });
});
