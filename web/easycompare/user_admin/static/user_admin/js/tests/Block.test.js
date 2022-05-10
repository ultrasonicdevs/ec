describe('Block generation test', () => {

  let block = null;

  const expect = {
    id: 1,
    name: 'block',
    urlToProductTypes: 'http://192.168.0.128:8000/api/product-types/',
    urlToSections: 'http://192.168.0.128:8000/api/sections/',
  }

  before ('Block initialization', () => {
    block = new Block({id: 1, name: 'block'});
  })

  it ('Block constructor test', () => {
    assert.sameDeepMembers([block], [expect])
  })

})