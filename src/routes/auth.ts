import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { sign, verify } from "hono/jwt"
import { randomUUID } from "crypto"
import { JwtTokenExpired } from "hono/utils/jwt/types"

let prisma = new PrismaClient()
const route = new Hono()

export const SECRET = "123456789"
export let roleTokens = {
  ADMIN: randomUUID()
}

const passwords = {
  ADMIN: process.env.ADMIN_PASSWORD,
  USER: process.env.USER_PASSWORD
}

/* 
一斉ログアウトでuuid再生成
*/

export const auth = async (c, next) => {
  const { token } = await c.req.json()
  if (token) {
    let payload
    try {
      payload = await verify(token, SECRET)
    } catch (e) {
      if(e instanceof JwtTokenExpired) {
        return c.json({m: "TokenExpired"}, 403)
      } else {
        return c.json({}, 401)
      }
    }
    // if (admin) {
    //   if (payload.role !== roleTokens.ADMIN) {
    //     return c.json({m: "PermissionError"}, 403)
    //   }
    // } else {
    //   if (payload.role !== roleTokens.USER && payload.role !== roleTokens.ADMIN) {
    //     return c.json({m: "PermissionError"}, 401)
    //   }
    // }
    await c.set("jwtPayload", payload)
    await next()
  } else {
    return c.json({m:"NoToken"}, 401)
  }
}

route.post("/login", async (c) => {
  const { password } = await c.req.json()
  let payload = { role: "", roleType: "", exp: 0 }
  if (passwords.ADMIN == password) {
    payload.role = roleTokens.ADMIN
    payload.roleType = "ADMIN"
    payload.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6
    const token = await sign(payload, SECRET)
    return c.json({ token: token })
  } else {
    return c.json({}, 401)
  }
})

// route.use("/genToken", async (c, next) => {
//   return await auth(c, next)
// })

// route.post("/genToken", async (c) => {
//   roleTokens = {
//     ADMIN: randomUUID(),
//   }
//   return c.json({})
// })

// route.post("/whoami", async (c) => {
//   const payload = await c.get("jwtPayload")
//   return c.json({ payload: payload })
// })

export default route