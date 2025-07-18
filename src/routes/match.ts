import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import matchSelect from "./prisma"

let prisma = new PrismaClient()
const route = new Hono()

route.get("/now", async (c) => {
  const data = await prisma.match.findMany({ select: matchSelect })
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
  const data = await prisma.match.findMany({ select: matchSelect })
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
    let data1: any = await prisma.match.findFirst({ where: { id: id as string }, select: matchSelect });

    if (!data1) {
      return c.json({}, 404)
    }

    return c.json(data1)
  } catch (error) {
    return c.json({}, 500)
  }
})

route.post("/:id/:p/:pId", async (c) => {
  const id = c.req.param("id")
  const p = c.req.param("p")
  const pId = c.req.param('pId')
  const { game } = await c.req.json()

  let d = await prisma.match.findUnique({ where: { id } })

  if (pId != d[`p_${p}`].placeId) {
    return c.json({}, 404)
  }

  if (d[`p_${p}`].recordedAt) {
    return c.json({}, 400)
  }

  d[`p_${p}`].recordedAt = Date.now()
  d[`p_${p}`].l_p1 = game.l_p1
  d[`p_${p}`].l_p2 = game.l_p2
  d[`p_${p}`].l_p3 = game.l_p3
  d[`p_${p}`].h_p1 = game.h_p1
  d[`p_${p}`].h_p2 = game.h_p2
  d[`p_${p}`].h_p3 = game.h_p3
  d[`p_${p}`].fHitted = game.fHitted
  d[`p_${p}`].soccer = game.soccer
  d[`p_${p}`].eSport = game.eSport
  await prisma.match.update({
    where: { id },
    data: {
      [`p_${p}`]: d[`p_${p}`]
    }
  })

  return c.json({ p: p, id: id })
})

export default route