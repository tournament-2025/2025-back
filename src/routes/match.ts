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