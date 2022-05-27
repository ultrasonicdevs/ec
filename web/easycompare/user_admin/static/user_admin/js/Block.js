class Block extends Request {
  constructor (options) {
    super();
    
    this.id = options.id;
    this.name = options.name;
  }
}
