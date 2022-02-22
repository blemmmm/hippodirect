const fastify = require('fastify').default;
const fastify_static = require('fastify-static');
const path = require('path');
// const fs = require('fs/promises');


const app = fastify({ logger: true });

// const Typesense = require('typesense');

// const client = new Typesense.Client({
//   'nodes': [{
//     'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
//     'port': '8108', // For Typesense Cloud use 443
//     'protocol': 'http', // For Typesense Cloud use https
//   }],
//   'apiKey': 'test1234',
//   'connectionTimeoutSeconds': 2,
// });

const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/dist/esbuild/esbuild.css" rel="stylesheet">
      <link href="/dist/postcss/postcss.css" rel="stylesheet">
      <script src="https://code.iconify.design/2/2.1.0/iconify.min.js"></script>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <title>Typesense Test</title>
      <meta name="title" content="Add meta content">
      <meta name="description" content="Add meta desc">
  </head>
  <body>
      <div id="root"></div>
      <script src="/dist/esbuild/esbuild.js"></script>
  </body>  
  </html>
`;

app.register(fastify_static, {
  root: path.join(process.cwd(), './client/dist'),
  prefix: '/dist/',
});

app.get('/*', async (request, reply) => {
  return reply
    .status(200)
    .header('Content-Type', 'text/html')
    .send(html);
});

// app.get('/products', async (request, reply) => {
//   const products = await fs.readFile('./data/ecommerce.json');
//   return reply
//     .status(200)
//     .header('Content-Type', 'application/json')
//     .send(products);
// });

// const searchParameters = {
//   'q': 'samsung',
//   'query_by': 'name',
// };

// client.collections('products')
//   .documents()
//   .search(searchParameters)
//   .then(function (searchResults) {
//     console.log(JSON.stringify(searchResults, null, 2));
//   });

process.nextTick(async () => {
  try {
    await app.listen(8080, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});