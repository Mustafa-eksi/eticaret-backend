const fastify = require('fastify')()

fastify.register(require('fastify-sqlite'), {dbFile: 'db.db'})

fastify.get("/getproducts", function (req: any, res: any){
  fastify.sqlite.all("select * from products", (err: any, rows: any)=>{
    res.send(err || rows);
  })
})

fastify.listen({ port: 3000 }, (err:any) => {
  if (err) throw err
  console.log(`server listening on 3000`)
})
