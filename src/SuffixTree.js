class Node{
  constructor(range, suffix){
    this.children = [];
    this.suffix = suffix;
    this.range = range || [0, Infinity];
  }
}
var SuffixTree = {
  make(str){
    var root = new Node();
    var activeNode = root,
      activeEdge = null,
      activeLength = 0;
    var reminder = 0;
    for (var c of str) {
      if(reminder === 0){
        activePoint.node.children.push(new Node());
      } else {

      }
    }
    return root;
  }
}

module.exports = SuffixTree;
