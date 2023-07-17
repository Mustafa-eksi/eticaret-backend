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

fastify.get("/getAllProducts", async function (req:any, res:any) {
  var products = fastify.mongo.db.collection('products');
  let p = await products.find().toArray();
  res.send(p)
});

fastify.post("/getProduct", async function (req:any, res:any) {
  var products = fastify.mongo.db.collection('products');
  let p = await products.findOne({_id:new ObjectId(req.body.productid)});
  res.send(p)
});

fastify.post("/getProducts", async function (req:any, res:any) {
  console.log(req.body)
  var products = fastify.mongo.db.collection('products');
  let ps = [];
  for(let i = 0; i < req.body.products.length; i++) {
    console.log(i, req.body.products[i])
    ps.push(await products.findOne({_id:new ObjectId(req.body.products[i])}));
  }
  res.send({products:ps})
});

fastify.listen({ port: 3000 }, (err:any) => {
  if (err) throw err
  console.log(`server listening on 3000`)
})
