import { ObjectId } from "@fastify/mongodb";

const fastify = require('fastify')()

fastify.register(require('@fastify/mongodb'), {
  forceClose: true,
  url: 'mongodb://127.0.0.1:27017/eticaret'
});
fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:8080'],
  methods: ["GET", "POST", "OPTIONS"],
  maxAge: 0
})

fastify.get("/getproducts", async function (req:any, res:any) {
  var products = fastify.mongo.db.collection('products');
  let p = await products.find().toArray();
  console.log(p)
  res.send(p)
});

fastify.post("/getproduct", async function (req:any, res:any) {
  var products = fastify.mongo.db.collection('products');
  console.log(req.body)
  let p = await products.findOne({_id:new ObjectId(req.body.productid)});
  console.log(p)
  res.send(p)
});

fastify.listen({ port: 3000 }, (err:any) => {
  if (err) throw err
  console.log(`server listening on 3000`)
})
