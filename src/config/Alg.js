
const algoliasearch = require('algoliasearch');
  const client = algoliasearch('QHNRM6MI8E', '90079e3cd10bff4417507518e6caffc7');
  const index = client.initIndex('rent');

  export default index;