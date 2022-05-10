describe('Request method tests', () => {

  const actual = [];

  const expect = [
    {id: 1, name: 'Leanne Graham'},
    {id: 2, name: 'Ervin Howell'},
    {id: 3, name: 'Clementine Bauch'},
    {id: 4, name: 'Patricia Lebsack'},
    {id: 5, name: 'Chelsey Dietrich'},
  ];

  before ('Get data from jsonplaceholder (database simulation)', async () => {
    const request = new Request();
    const response = await request.sendRequest('https://jsonplaceholder.typicode.com/users?_limit=5');

    response.forEach(data => {
      const {id, name} = data;
      actual.push({id, name});
    })
  })


  it('sendRequest test', () => {
    assert.sameDeepMembers(actual, expect);
  })

})