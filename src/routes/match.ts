import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { auth } from "./auth"

let prisma = new PrismaClient()
const route = new Hono()

route.use("/*/*/start", async (c, next) => {
  return await auth(c, next)
})

route.use("/*/*/end", async (c, next) => {
  return await auth(c, next)
})

route.use("/apply/*/*", async (c, next) => {
  return await auth(c, next)
})

route.get("/nApplied", async (c) => {
  const data = await prisma.match.findMany()
  const r = []

  data.forEach((data1) => {
    for (let i = 1; i < 6; i++) {
      const d = data1[`p_${i}`]
      if (!d.applied && (d.startedAt && d.endedAt)) {
        r.push({
          id: data1.id,
          game: i,
          data: data1
        })
      }
    }
  })

  return c.json(r)
})

route.post("/apply/:id/:game", async (c) => {
  const id = c.req.param("id")
  const game = c.req.param("game")

  try {
    let d = await prisma.match.findUnique({ where: { id } })
    d[`p_${game}`].applied = true
    const r = await prisma.match.update({
      where: { id },
      data: {
        [`p_${game}`]: d[`p_${game}`]
      }
    })

    return c.json(r)
  } catch (error) {
    return c.json({}, 500)
  }
})

route.get("/now", async (c) => {
  const data = await prisma.match.findMany()
  const r = []

  data.forEach((data1) => {
    for (let i = 1; i < 6; i++) {
      const d = data1[`p_${i}`]
      if (d.startedAt && !(d.endedAt)) {
        r.push({
          id: data1.id,
          game: i,
          data: data1
        })
      }
    }
  })

  return c.json(r)
})

route.get("/soon", async (c) => {
  const data = await prisma.match.findMany()
  const r = []

  data.forEach((data1) => {
    for (let i = 1; i < 6; i++) {
      const d = data1[`p_${i}`]
      if (!(d.startedAt) && !(d.endedAt) && d.scheduledAt != null && d.scheduledAt - 600000 <= Date.now()) {
        r.push({
          id: data1.id,
          game: i,
          data: data1
        })
      }
    }
  })

  return c.json(r)
})


route.get("/:id", async (c) => {
  const id = c.req.param("id")

  try {
    const data1 = await prisma.match.findFirst({ where: { id: id as string } });

    if (!data1) {
      return c.json({}, 404)
    }

    return c.json(data1)
  } catch (error) {
    return c.json({}, 500)
  }
})

route.post("/:id/:p/start", async (c) => {
  const id = c.req.param("id")
  const p = c.req.param("p")
  const { recorderId } = await c.req.json()

  let d = await prisma.match.findUnique({ where: { id } })
  d[`p_${p}`].startedAt = Date.now()
  d[`p_${p}`].recorderId = recorderId
  await prisma.match.update({
    where: { id },
    data: {
      [`p_${p}`]: d[`p_${p}`]
    }
  })

  return c.json({ p: p, id: id })
})

route.post("/:id/:p/end", async (c) => {
  const id = c.req.param("id")
  const p = c.req.param("p")
  const { recorderId, game } = await c.req.json()

  let d = await prisma.match.findUnique({ where: { id } })
  d[`p_${p}`].endedAt = Date.now()
  d[`p_${p}`].recorderId = recorderId
  d[`p_${p}`].l_p1 = game.l_p1
  d[`p_${p}`].l_p2 = game.l_p2
  d[`p_${p}`].l_p3 = game.l_p3
  d[`p_${p}`].h_p1 = game.h_p1
  d[`p_${p}`].h_p2 = game.h_p2
  d[`p_${p}`].h_p3 = game.h_p3
  d[`p_${p}`].fHitted = game.fHitted
  d[`p_${p}`].pk = game.pk
  await prisma.match.update({
    where: { id },
    data: {
      [`p_${p}`]: d[`p_${p}`]
    }
  })

  return c.json({ p: p, id: id })
})

export default route