class STrie{
  constructor(suffix){
    this.children = {};//子节点
    this.suffix = suffix;//后缀链接
  }
}
var SuffixTrie = function(str) {
    var top = null;
    for (s of str) {
      top = insert(top, s);
    }
    return root(top);
}
var insert = function(top, c){
  if(!top){
    top = new STrie();
  }
  var node = top;
  var newNode = new STrie();
  while(node && !node.children[c]){
    newNode.suffix = node.children[c] = new STrie(node);
    newNode = node.children[c];
    node = node.suffix;
  }
  if(node){
    newNode.suffix = node.children[c];
  }
  return top.children[c];
}

var root = function(node){
  while(node.suffix){
    node = node.suffix;
  }
  return node;
}

module.exports = SuffixTrie;
