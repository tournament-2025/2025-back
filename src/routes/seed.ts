import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
const route = new Hono()

// route.get("/", async (c) => {
//   const r = await prisma.match.createMany({
//     data: [{
//       title: "バレー",
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
//       p_1: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_2: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_3: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_4: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_5: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_6: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//     },
//     {
//       title: "ドッジ",
//       sex: "male",
//       // @ts-ignore
//       event: "dodgeball",
//       gread: 1,
//       order: 0,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_2: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_3: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_4: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_5: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_6: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//     }, {
//       title: "サッカー",
//       sex: "male",
//       // @ts-ignore
//       event: "soccer",
//       gread: 1,
//       order: 1,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_2: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_3: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_4: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_5: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_6: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//     },
//     {
//       title: "バド",
//       sex: "male",
//       // @ts-ignore
//       event: "badminton",
//       gread: 1,
//       order: 1,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_2: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_3: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_4: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_5: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_6: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//     },
//     {
//       title: "eスポーツ",
//       sex: "mix",
//       // @ts-ignore
//       event: "esport",
//       gread: 1,
//       order: 2,
//       c_1: 1,
//       c_2: 2,
//       c_3: 3,
//       c_4: 4,
//       c_5: 5,
//       c_6: 6,
//       c_7: 7,
//       p_1: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_2: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_3: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_4: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_5: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//       p_6: { set: { fHitted: { p1: null, p2: null, p3: null } } },
//     }]
//   })
//   return await c.json({ ok: true, data: r }, 200)
// })


export default route