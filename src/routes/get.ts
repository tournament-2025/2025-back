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

const lWin = (d: any, event: string) => {
  if (["volleyball", "badminton"].includes(event)) {
    return d.l_p1 > d.h_p1
  } else if (event == "dodgeball") {
    return d.l_p1 > d.h_p1
  } else if (event == "soccer") {
    return d.l_p1 > d.h_p1
  }
  return true
}

route.get("/match/:grade/:class/", async (c) => {
  const targetClass = parseInt(await c.req.param("class"))
  const targetGrade = parseInt(await c.req.param("grade"))
  const res = []

  try {
    const data = await prisma.match.findMany({ where: { gread: targetGrade } })
    data.forEach((data1) => {
      let match: any = [[[data1["c_1"]], [data1["c_2"]]], [[data1["c_3"]], [data1["c_4"]]], [[data1["c_5"]], [data1["c_6"]]], [[], []], [[], [data1["c_7"]]], [[], []]]

      for (let i = 1; i < 6; i++) {
        const d = data1[`p_${i}`]

        const p1 = (i == 1 || i == 2) ? 4 : (i == 3) ? 5 : (i != 6) ? 6 : null
        const p2 = [1, 3, 4].includes(i) ? 0 : 1
        match[p1 - 1][p2] = d.applied ?
          match[i - 1][lWin(d, data1.event) ? 0 : 1] :
          [].concat(match[i - 1][0], match[i - 1][1])
      }

      for (let i = 0; i < 6; i++) {
        if (match[i][0].includes(targetClass)) {
          res.push({
            id: data1.id,
            game: i + 1,
            opponent: match[i][1],
            data: data1,
            certainty: match[i][1].length == 1 ? true : false,
          })
        }
        if (match[i][1].includes(targetClass)) {
          res.push({
            id: data1.id,
            game: i + 1,
            opponent: match[i][0],
            data: data1,
            certainty: match[i][0].length == 1 ? true : false,
          })
        }
      }
    })

    return c.json(res)
  } catch (error) {
    console.log(error)
    return c.json({}, 500)
  }
})



export default route