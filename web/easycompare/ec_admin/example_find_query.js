db.products.find({
$and: [
{ type: "6208c472ff9d5c6a2274e572"},
{ $or: [
    { attributes: { $elemMatch: { verbose_name: "Наличие веб-камеры", value: "Да" } } },
  ]},
{ $or: [
    { attributes: { $elemMatch: { verbose_name: "Диагональ экрана", value: "13" } } },
    { attributes: { $elemMatch: { verbose_name: "Диагональ экрана", value: "17" } } },
  ]},
]
})

db.products.aggregate([
  {
    '$match': { 'type': '6248bae987c7ece685828c25'}
  },

  {
    '$unwind': '$attributes'
  },

  {
    '$group': { '_id': '$attributes.verbose_name', 'attributes': { '$addToSet': '$attributes.value' } }
  },

  {
    '$project': {'_id': 0, 'filter_group_name': '$_id', 'attributes': 1}
  }
]).pretty()