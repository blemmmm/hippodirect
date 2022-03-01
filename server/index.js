const fastify = require('fastify').default;
const fastify_static = require('fastify-static');
const fastify_favicon = require('fastify-favicon');
const path = require('path');


const app = fastify({ logger: true });

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
      <title>HippoDirect | Buy Smartphones & Accessories</title>
      <meta name="title" content="HippoDirect">
      <meta name="description" content="eCommerce Search demo using Typesense">
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

app.register(fastify_favicon, { path: './', name: 'favicon.ico' });

app.get('/*', async (request, reply) => {
  return reply
    .status(200)
    .header('Content-Type', 'text/html')
    .send(html);
});

process.nextTick(async () => {
  try {
    await app.listen(8080, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});