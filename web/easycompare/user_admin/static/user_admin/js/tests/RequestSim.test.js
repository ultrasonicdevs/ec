describe('Request DB method test', () => {

  const actual = [];

  const expect = [
    {id: '625c0b7db496ff723b488613', name: 'Электроника'},
  ];

  before ('Get data from jsonplaceholder (database simulation)', async () => {
    const request = new Request();
    const response = await request.sendRequest(`${location.protocol}//${location.host}/api/sections/`)
      .then(data => data.response);

    response.forEach(data => {
      const {id, name} = data;
      actual.push({id, name});
    })
  })

  it('sendRequest db test', () => {
    console.log(actual)
    assert.sameDeepMembers(actual, expect);
  })

})



