import { ObjectId } from "@fastify/mongodb";

const fastify = require('fastify')()

const ALLOWED_ORIGINS = ['http://localhost:8080/']

fastify.register(require('@fastify/mongodb'), {
  forceClose: true,
  url: 'mongodb://127.0.0.1:27017/eticaret'
});
fastify.get("/getproducts", async function (req:any, res:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Name, Accept, Sdk-Context');

  var products = fastify.mongo.db.collection('products');
  let p = await products.find().toArray();
  console.log(p)
  res.send(p)
});

fastify.post("/getproduct", async function (req:any, res:any) {
  let orig = ALLOWED_ORIGINS[0];
  res.header('Access-Control-Allow-Origin', orig);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.header('Access-Control-Max-Age', '0');
  var products = fastify.mongo.db.collection('products');
  console.log(JSON.parse(req.body))
  let p = await products.findOne({_id:new ObjectId(req.body.productid)});
  console.log(p)
  res.send(p)
});

fastify.listen({ port: 3000 }, (err:any) => {
  if (err) throw err
  console.log(`server listening on 3000`)
})
