var SuffixTrie = require('./src/SuffixTrie.js');
import _ from 'lodash';
import {lookupPatternIndexOf} from './src/strHelper.js';
function buildRandomText(count){
    var text = '';
    while(count){
      count -= 1;
      text += String.fromCharCode(_.random(97, 122));
    }
    return text;
}
let text = buildRandomText(2000);

var buildSuffixTrieTextST = Date.now();
var suffixTrieText = new SuffixTrie(text);
console.log(`buildSuffixTrieText Time: ${Date.now() - buildSuffixTrieTextST} ms`);
// console.log(lookupPatternIndexOf('ab', text));
// console.dir(suffixTrie);
