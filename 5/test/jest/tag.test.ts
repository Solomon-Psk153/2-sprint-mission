import request from "supertest";
import app from "../../src/app";
import db from "../../src/utils/prisma.util";
import { beforeAll, afterAll, expect } from '@jest/globals';
import type TestAgent from "supertest/lib/agent";
import { resetDb } from "../../src/utils/reset-db.util";
import test, { describe } from "node:test";

let agent: TestAgent;

beforeAll(async () => {
  await resetDb();

  agent = request.agent(app);

  await agent.post("/register").send({
    email: "test@dot.com",
    password: "test",
    nickname: "test"
  });

  await agent.post("/local/login").send({
    email: "test@dot.com",
    password: "test",
  });
});


afterAll(async () => {
  await db.$disconnect();
});

describe("태그 값들 가져오기(GET /tags)", () => {
  test("쿼리에 잘못된 값이 들어간 경우", async() => {
    const res = await request(app).get("/tags").query({
      offset: 0,
      limit: 10,
      orderBy: "123"
    });

    expect(res.statusCode).toEqual(400);
  });
});