function isString(str){
  return Object.prototype.toString.call(str) === '[object String]';
}
/*
    查找子串出现的次数。
    @param {String} 要查找的模式子串
    @param {String} 要查找的源文本
    @return {Number} 次数
  */
function lookupPatternIndexOf(t, s) { //
  let ST = Date.now();
  if(!isString(t) || !isString(s)){
    return 0;
  }
  let count = 0;
  var cut = s.indexOf(t);
  while(cut >= 0){
    count += 1;
    s = s.substring(cut + t.length);
    cut = s.indexOf(t);
  }
  console.log(`lookupPatternIndexOf Cost Time: ${Date.now() - ST}ms`);
  return count;
}

export {
    lookupPatternIndexOf
}
