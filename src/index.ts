import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { sign, verify } from "hono/jwt"
import editRoute from "./routes/edit"
import getRoute from "./routes/get"
import seedRoute from "./routes/seed"
const SECRET = "123456789"
const ADMINID = "123423"
const USERID = "456"

const app = new Hono()
app.use("*", cors({ origin: "*" }))
app.use("/edit/*", async (c, next) => {
  const { token } = await c.req.json()
  if (token) {
    const payload = await verify(token, SECRET)
    if (payload.role !== ADMINID) {
      return c.json({}, 401)
    }
    await next()
  } else {
    return c.json({}, 401)
  }
})

app.route("/edit", editRoute)
app.route("/get", getRoute)
app.route("/seed", seedRoute)

app.get("/token", async (c) => {
  const payload = {
    role: ADMINID,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 60min
  }
  const token = await sign(payload, SECRET)
  return c.json({ token: token })
})

const port = 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
