const Response = require('../response/Response');

class Element {
    constructor(obj) {
        this.id = obj ? obj.id : null,
            this.title = obj ? obj.title : null,
            this.level = obj ? obj.level : null,
            this.children = obj ? obj.children : [],
            this.parent_id = obj ? obj.parent_id : null
    }

    // validating input

    validate(data) {
        if (!data)
            throw new Error("please provide necessary data");
        for (const level in data) {
            // checking dats are array
            if (isNaN(Number(level)))
                throw new Error("body params must be integers")
            let is_array = Array.isArray(data[level]);
            if (!is_array)
                throw new Error("datas must be arrays");
            data[level].map(item => {
                if (!item instanceof Object)
                    throw new Error("each element in the array must be objects")
                let keys = Object.keys(item);
                let required_fields = ["id", "title", "level", "children", "parent_id"];
                let isEvery = required_fields.every(el => keys.includes(el))
                if (!isEvery)
                    throw new Error(`${required_fields.join()} are mandatory`);
                if (level != item.level)
                    throw new Error("the body params and the level inside data must be same");

            })

        }
    }

    // init function

    organizingChildren = (req, h) => {
        try {
            this.validate(req.payload)
        } catch (e) {
            let res = Response.validationError(e.message)
            return h.response(res).code(422);
        }
        this.start(req.payload);
        return this.result;
    }

    //insert childrens

    insert(element) {
        if (this.id == element.parent_id) {
            this.children.push(element);
        } else {

            // if the current element is not a child looping continues to find its parent

            this.children.forEach(item => {
                item.insert(element);
            })
        }
    }


    start = (data) => {

        // initializing element with null data

        var head = new Element();
        // iterating to get single objects

        for (const level in data) {
            data[level].forEach(value => {
                const element = new Element(value);

                // passing single objects to find is it child

                head.insert(element);

            })
        }
        this.result = head.children;
    }
}

module.exports = new Element();
