import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import data from "./data/sr"

let prisma = new PrismaClient()
const route = new Hono()

// route.get("/", async (c) => {
//   const r = await prisma.match.createMany({
//     // @ts-ignore
//     data: data
//   })
//   return await c.json({ ok: true, data: r }, 200)
// })


export default route