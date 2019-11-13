
const algoliasearch = require('algoliasearch');
  const client = algoliasearch('QHNRM6MI8E', 'e6a2cc55534d6411d953249c82282be6');
  const index = client.initIndex('rent');

  export default index;