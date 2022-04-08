class Block extends Request {
  constructor (options) {
    super()
    console.log('Блок: ', options)
    this.id = options.id;
    this.name = options.name;
  }
}