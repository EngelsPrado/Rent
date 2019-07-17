
const algoliasearch = require('algoliasearch');
  const client = algoliasearch('XKANI2Z3LS', '2ea01e5cced441cabb02dfaa584ec4c4');
  const index = client.initIndex('rent');

  export default index;