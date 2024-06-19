import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
const route = new Hono()

route.post("/1", async (c) => {
  let { id, p, d }: any = await c.req.json()

  if (d.l_p1 < -1 || d.h_p1 < -1 || d.l_p2 < -1 || d.h_p2 < -1 || d.l_p3 < -1 || d.h_p3 < -1) {
    return c.json({ "message": "first" }, 400)
  }

  if (![1, 2, 3, 4, 5, 6].includes(p)) {
    return c.json({ "message": "here!!" }, 400)
  }

  try {
    await prisma.match.update({
      where: { id },
      data: {
        [`p_${p}`]: { update: d }
      }
    })
    return c.json({}, 200)
    
  } catch (error) {
    return c.json({}, 500)
  }
})

route.post("/2", async (c) => {
  const { id, targetPosition, insertNumber }: any = await c.req.json()

  try {
    const match = await prisma.match.findUnique({
      where: { id },
      select: { c_1: true, c_2: true, c_3: true, c_4: true, c_5: true, c_6: true, c_7: true }
    })

    if (!match) {
      return c.json({}, 404)
    }

    const numbers = [match.c_1, match.c_2, match.c_3, match.c_4, match.c_5, match.c_6, match.c_7]
    const otherPosition = numbers.indexOf(insertNumber)

    if (otherPosition === -1) {
      return c.json({}, 400)
    }

    const updatedNumbers = [...numbers]
    updatedNumbers[targetPosition - 1] = insertNumber
    updatedNumbers[otherPosition] = numbers[targetPosition - 1]

    await prisma.match.update({
      where: { id },
      data: {
        c_1: updatedNumbers[0],
        c_2: updatedNumbers[1],
        c_3: updatedNumbers[2],
        c_4: updatedNumbers[3],
        c_5: updatedNumbers[4],
        c_6: updatedNumbers[5],
        c_7: updatedNumbers[6],
      }
    })

    return c.json({}, 200)
  } catch (error) {
    return c.json({}, 500)
  }
})

export default route