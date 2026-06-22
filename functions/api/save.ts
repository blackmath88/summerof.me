interface Env {
  MANIFESTOS: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const body = await ctx.request.json()
  const slug = nanoid(8)

  await ctx.env.MANIFESTOS.put(slug, JSON.stringify(body), {
    expirationTtl: 60 * 60 * 24 * 30,
  })

  return Response.json({ slug })
}

function nanoid(len = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  let id = ''
  for (let i = 0; i < len; i += 1) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

