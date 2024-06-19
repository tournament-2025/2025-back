import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
const route = new Hono()

// app.get("/", async (c) => {
//   const r = await prisma.match.createMany({
//     data: [{
//       title: "男バレー",
//       sex: "male",
//       // @ts-ignore
//       event: "volleyball",
//       gread: 1,
//       order: 0,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: {},
//       p_2: {},
//       p_3: {},
//       p_4: {},
//       p_5: {},
//       p_6: {}
//     },
//     {
//       title: "男バド",
//       sex: "male",
//       // @ts-ignore
//       event: "badminton",
//       gread: 1,
//       order: 0,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: {},
//       p_2: {},
//       p_3: {},
//       p_4: {},
//       p_5: {},
//       p_6: {}
//     }]
//   })
//   return await c.json({ ok: true, data: r }, 200)
// })


export default route