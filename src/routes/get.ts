import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
const route = new Hono()

route.get("/1", async (c) => {
  try {
    const data = await prisma.match.findMany({
      where: { /*gread: 1*/ }, select: {
        id: true,
        title: true,
        gread: true,
        sex: true
      },
    })

    return c.json({ data1: data });
  } catch (e) {
    return c.json({ ok: false }, 500)
  }
})

route.get("/2", async (c) => {
  const data1 = await prisma.match.findMany({
    where: { gread: 1 },
    orderBy: [{ order: "asc" }]
  });

  return c.json({ data1: data1 })
})

route.get("/match/:id", async (c) => {
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

export default route