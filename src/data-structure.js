var DATA_STRUCTURE = {}

function isArr(val){
  return Object.prototype.toString.call(val) === '[object Array]'
}
function isObj(val){
  return Object.prototype.toString.call(val) === '[object Object]'
}
function isFn(val){
  return Object.prototype.toString.call(val) === '[object Function]'
}

function deepClone(obj) {
    let res = obj;
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        res = {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && key !== 'children' && key !== '_parent') {
                res[key] = deepClone(obj[key]);
            }
        }
    } else if (isArr(obj)) {
        res = []
        for (var variable of obj) {
            res.push(deepClone(variable))
        }
    } else if (Object.prototype.toString.call(obj) === '[object Date]') {
        return new Date(obj.valueOf());
    } else if (Object.prototype.toString.call(obj) === '[object RegExp]') {
        return new RegExp(obj.valueOf());
    }
    return res;
}

class Stack {

    /**
     * We're going to again be backed by a JavaScript array, but this time it
     * represents a list like we implemented before rather than memory.
     */

    constructor() {
        this.list = [];
        this.length = 0;
    }

    /**
     * We're going to implement two of the functions from list's "push" and "pop"
     * which are going to be identical in terms of functionality.
     */

    /**
     * Push to add items to the top of the stack.
     */

    push(value) {
        this.length++;
        this.list.push(value);
    }

    pushMany(arr) {
        arr = isArr(arr) ? arr : [];
        this.length += arr.length;
        this.list = this.list.concat(arr.slice(0).reverse());
    }

    /**
     * And pop to remove items from the top of the stack.
     */

    pop() {
        // Don't do anything if we don't have any items.
        if (this.length === 0) return;

        // Pop the last item off the end of the list and return the value.
        this.length--;
        return this.list.pop();
    }
    /**
     * We're also going to add a function in order to view the item at the top of
     * the stack without removing it from the stack.
     */

    peek() {
        // Return the last item in "items" without removing it.
        return this.list[this.length - 1];
    }
}

class Queue {

    /**
     * Again, our queue is using a JavaScript array as a list rather than memory.
     */

    constructor() {
        this.list = [];
        this.length = 0;
    }

    /**
     * Similar to stacks we're going to define two functions for adding and
     * removing items from the queue. The first is "enqueue".
     *
     * This will push values to the end of the list.
     */

    enqueue(value) {
        this.length++;
        this.list.push(value);
    }
    enqueueMany(arr) {
        arr = isArr(arr) ? arr : [];
        this.length += arr.length;
        this.list.push(arr);
    }

    /**
     * Next is "dequeue", instead of removing the item from the end of the list,
     * we're going to remove it from the start.
     */

    dequeue() {
        // Don't do anything if we don't have any items.
        if (this.length === 0) return;

        // Shift the first item off the start of the list and return the value.
        this.length--;
        return this.list.shift();
    }

    /**
     * Same as stacks we're going to define a "peek" function for getting the next
     * value without removing it from the queue.
     */

    peek() {
        return this.list[0];
    }
}

class Tree {
    static filter(tree, predicate) {
        if (isArr(tree)) {
            tree = {
                children: tree
            };
        }
        var res = {
            children: []
        };
        if (!isFn(predicate)) {
            return res;
        }

        function assignParent(parent, children) {
            children = isArr(children) ? children : [];
            for (var i = 0; i < children.length; i++) {
                children[i]._parent = parent;
            }
        }

        function clearLeaf(tree, predicate) {
            function traverse(tree, parent, predicate) {
                (tree.children || []).forEach(item => {
                    if ((!item.children || item.children.length <= 0) && predicate.call(this, item) !== true) {
                        parent.children = parent.children.slice(0, parent.children.indexOf(item)).concat(parent.children.slice(parent.children.indexOf(item) + 1))
                    }
                    traverse(item, tree, predicate)
                })
            }
            traverse(tree, tree, predicate)
        }
        var processing = new Stack();
        processing.pushMany(tree.children);
        var processed = processing.pop();
        var target = res;
        assignParent(target, tree.children || []);
        while (processed) {
            var cloneNode = deepClone(processed);
            target = processed._parent;
            if (processed.children && processed.children.length > 0) {
                if (!target.children) {
                    target.children = [];
                }
                target.children.push(cloneNode);
                processing.pushMany(processed.children);
                assignParent(cloneNode, processed.children);
            } else {
                if (predicate.call(this, processed) === true) {
                    if (!target.children) {
                        target.children = [];
                    }
                    target.children.push(cloneNode);
                }
            }
            processed = processing.pop();
        }
        clearLeaf(res, predicate);
        return res;
    }
    static find(tree, predicate) { //默认是BFS
        if (isArr(tree)) {
            tree = {
                children: tree
            };
        }
        var res = null
        if (!isFn(predicate)) {
            return res;
        }
        if (predicate.call(this, tree) === true) {
            res = tree;
            return res;
        };
        function lookUp(tree, cb) {
            (tree.children || []).forEach(function(node) {
                if (cb.call(this, node) === true) {
                    res = node;
                    return;
                };
                lookUp(node, cb);
            });
        }
        lookUp(tree, predicate);
        return res
    }
    static findDFS(tree, predicate) {
        if (isArr(tree)) {
            tree = {
                children: tree
            };
        }
        var res = null
        if (!isFn(predicate)) {
            return res;
        }
        if (predicate.call(this, tree) === true) {
            res = tree;
            return res;
        };
        var processing = new Stack();
        processing.pushMany(tree.children);
        var processed = processing.pop();
        while (processed) {
            if (predicate.call(this, processed) === true) {
                res = processed
                break;
            }
            processing.pushMany(processed.children)
            processed = processing.pop()
        }
        return res
    }
    static traverseBFS(tree, cb){
      if (isArr(tree)) {
          tree = {
              children: tree
          };
      }
      if (!isFn(cb)) {
          return;
      }
      cb.call(this, tree, tree)//别忘记了根节点也要处理
      var processing = new Queue();
      processing.enqueueMany(tree.children);
      var processed = processing.dequeue();
      while (processed) {
          cb.call(this, processed, tree)
          processing.enqueueMany(processed.children)
          processed = processing.dequeue()
      }
    }
    static traverseDFS(tree, cb){
      if (isArr(tree)) {
          tree = {
              children: tree
          };
      }
      if (!isFn(cb)) {
          return;
      }
      cb.call(this, tree, tree)//别忘记了根节点也要处理
      var processing = new Stack();
      processing.pushMany(tree.children);
      var processed = processing.pop();
      while (processed) {
          cb.call(this, processed, tree)
          processing.pushMany(processed.children)
          processed = processing.pop()
      }
    }
    static traverse(tree, callback){
      if (isArr(tree)) {
          tree = {
              children: tree
          };
      }
      function innerLoop(tree, callback, parent){
        if(isFn(callback)){
          callback.call(this, tree, parent)
        }
        (tree.children || []).forEach(function(c){
          innerLoop(c, callback, tree)
        })
      }
      innerLoop(tree, callback)
    }
    /**
     * 将一个数组转换为层级结构的数据对象
     *
     * @function hierarchyList
     * @param {Array} data 待转换的数组
     * @param {Array} hierarchy 层级
     * @returns {Object} 层级对象
     */
    static hierarchyList(data, hierarchy) {
      var root = {
      }
      if(isObj(data)){
        var dataToArray = []
        for (var k in data) {
          if (data.hasOwnProperty(k)) {
            data[k].key = k
            dataToArray.push(data[k])
          }
        }
        data = dataToArray
      }
      if(!isArr(data) || !isArr(hierarchy)){
        return root;
      }
      function generateRoot(root, d, hierarchy){
        var isTopRoot = root.level === undefined;
        if(!isArr(root.children)){
          root.children = []
        }
        if(hierarchy.length === 0){
          root.children.push(d)
          return
        }
        var currHierarchy = hierarchy[0]
        var nextRoot = null;
        if(!isTopRoot){
          nextRoot = root.children.find(function(rc){
            return rc.levelName === d[currHierarchy]
          })
          if(!nextRoot){
            nextRoot = {
              levelName: d[currHierarchy],
              level: hierarchy[1]
            }
            root.children.push(nextRoot)
          }
        }else{
          nextRoot = {
            levelName: d[currHierarchy],
            level: hierarchy[1]
          }
          root.level = currHierarchy
          root.children.push(nextRoot)
        }

        generateRoot(nextRoot, d, hierarchy.slice(1))
      }
      data.forEach(function(d){
        generateRoot(root, d, hierarchy)
      })

      return root;
    }
}

DATA_STRUCTURE.Stack = Stack
DATA_STRUCTURE.Queue = Queue
DATA_STRUCTURE.Tree = Tree
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = DATA_STRUCTURE).DATA_STRUCTURE = DATA_STRUCTURE;
    // Export for CommonJS support.
    freeExports.DATA_STRUCTURE = DATA_STRUCTURE;
} else {
    // Export to the global object.
    root.DATA_STRUCTURE = DATA_STRUCTURE;
}
