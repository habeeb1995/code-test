const Response = require('../response/Response');

class Element {
  constructor(obj) {
    this.id = obj ? obj.id : null;
    this.title = obj ? obj.title : null;
    this.level = obj ? obj.level : null;
    this.children = obj ? obj.children : [];
    this.parent_id = obj ? obj.parent_id : null;
    this.organizingChildren = this.organizingChildren.bind(this);
    this.start = this.start.bind(this);
  }

  // validating input
  validate(data) {
    if (!data) {
      throw new Error('please provide necessary data');
    }
    Object.keys(data).forEach((level) => {
      // checking data are array
      if (Object.prototype.hasOwnProperty.call(data, level)) {
        if (Number.isNaN(Number(level))) {
          throw new Error('body params must be integers');
        }
        const isArray = Array.isArray(data[level]);
        if (!isArray) {
          throw new Error('data must be array');
        }
        data[level].forEach((item) => {
          if (!(item instanceof Object)) {
            throw new Error('each element in the array must be objects');
          }
          const keys = Object.keys(item);
          const requiredFields = ['id', 'title', 'level', 'children', 'parent_id'];
          const isEvery = requiredFields.every((el) => keys.includes(el));
          if (!isEvery) {
            throw new Error(`${requiredFields.join()} are mandatory`);
          }
          if (Number(level) !== item.level) {
            throw new Error('the body params and the level inside data must be same');
          }
        });
      }
    });
  }

  // init function
  organizingChildren(req, reply) {
    try {
      this.validate(req.payload);
    } catch (e) {
      const res = Response.validationError(e.message);
      return reply.response(res)
        .code(422);
    }
    this.start(req.payload);
    return this.result;
  }

  // insert children
  insert(element) {
    if (this.id === element.parent_id) {
      this.children.push(element);
    } else {
      // if the current element is not a child looping continues to find its parent
      this.children.forEach((item) => {
        item.insert(element);
      });
    }
  }

  start(data) {
    // initializing element with null data
    const head = new Element();
    // iterating to get single objects
    Object.keys(data).forEach((level) => {
      // checking data are array
      if (Object.prototype.hasOwnProperty.call(data, level)) {
        data[level].forEach((value) => {
          const element = new Element(value);
          // passing single objects to find is it child
          head.insert(element);
        });
      }
    });
    this.result = head.children;
  }
}
module.exports = new Element();
