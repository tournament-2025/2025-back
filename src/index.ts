import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { sign, verify } from "hono/jwt"
import editRoute from "./routes/edit"
import getRoute from "./routes/get"
import seedRoute from "./routes/seed"
import authRoute, { auth } from "./routes/auth"
import matchRoute from "./routes/match"

const app = new Hono()
app.use("*", cors({ origin: "*" }))
app.use("/auth/whoami", auth)

app.route("/edit", editRoute)
app.route("/get", getRoute)
app.route("/seed", seedRoute)
app.route("/auth", authRoute)
app.route("/match", matchRoute)

const port = 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
