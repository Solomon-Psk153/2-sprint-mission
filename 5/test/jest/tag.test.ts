import request from "supertest";
import app from "../../src/app";
// import db from "../../src/utils/prisma.util";
import { beforeAll, afterAll, expect } from '@jest/globals';
// import type TestAgent from "supertest/lib/agent";
// import { resetDb } from "../../src/utils/reset-db.util";
import it, { describe } from "node:test";

// let agent: TestAgent;

// beforeAll(async () => {
//   await resetDb();

//   agent = request.agent(app);

//   await agent.post("/register").send({
//     email: "test@dot.com",
//     password: "test",
//     nickname: "test"
//   });

//   await agent.post("/local/login").send({
//     email: "test@dot.com",
//     password: "test",
//   });
// });


// afterAll(async () => {
//   await db.$disconnect();
// });

describe("GET /tags", () => {
  const name = "test"
  it("is wrong query", async() => {
    const res = await request(app).get(`/tags`).query({
      offset: -1,
      limit: 10,
      orderBy: "123"
    })

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", expect.stringContaining("must"));
  });

  it("is success", async() => {
    const res = await request(app).get(`/tags`).query({
      offset: 0,
      limit: 10,
      orderBy: "recent"
    });

    console.log(res);

    expect(res.statusCode).toEqual(200);
    expect(res.body.products.length).toBeLessThanOrEqual(10);
  });
});

describe("GET /tags/:name", () => {
  const name = "test"
  it("is wrong query", async() => {
    const res = await request(app).get(`/tags/${name}`).query({
      offset: -1,
      limit: 10,
      orderBy: "123"
    })

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", expect.stringContaining("must"));
  });

  it("is success", async() => {
    const res = await request(app).get(`/tags/${name}`).query({
      offset: 0,
      limit: 10,
      orderBy: "recent"
    });

    console.log(res);

    expect(res.statusCode).toEqual(200);
    expect(res.body.products.length).toBeLessThanOrEqual(10);
  });
});