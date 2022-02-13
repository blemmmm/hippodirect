/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

const Typesense = require('typesense');

const client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
    'port': '8108', // For Typesense Cloud use 443
    'protocol': 'http', // For Typesense Cloud use https
  }],
  'apiKey': 'test1234',
  'connectionTimeoutSeconds': 2,
});


const booksSchema = {
  'name': 'books',
  'fields': [
    { 'name': 'title', 'type': 'string' },
    { 'name': 'authors', 'type': 'string[]', 'facet': true },

    { 'name': 'publication_year', 'type': 'int32', 'facet': true },
    { 'name': 'ratings_count', 'type': 'int32' },
    { 'name': 'average_rating', 'type': 'float' },
  ],
  'default_sorting_field': 'ratings_count',
};

client.collections().create(booksSchema)
  .then(function (data) {
    console.log(data);
  });

const fs = require('fs/promises');

process.nextTick(async () => {
  console.log('deleting collection..');
  await client.collections('books').delete();
  try {
    console.log('creating collection..');
    const booksInJsonl = await fs.readFile('./data/books.jsonl');
    client.collections('books').documents().import(booksInJsonl);

  } catch (err) {
    console.log(err);
  }
});







