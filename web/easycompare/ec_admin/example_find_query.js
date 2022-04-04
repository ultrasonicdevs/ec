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