describe('Block generation test', () => {

  let block = null;

  const expect = {
    id: 1,
    name: 'block',
    urlToProductTypes: `${location.protocol}//${location.host}/api/product-types/`,
    urlToSections: `${location.protocol}//${location.host}/api/sections/`,
  }

  before ('Block initialization', () => {
    block = new Block({id: 1, name: 'block'});
  })

  it ('Block constructor test', () => {
    assert.sameDeepMembers([block], [expect])
  })

})

