var SuffixTrie = require('./src/SuffixTrie.js');
import _ from 'lodash';
import {lookupPatternIndexOf} from './src/strHelper.js';
function buildRandomText(){
    let count = 1000;
    var text = '';
    while(count){
      count -= 1;
      text += String.fromCharCode(_.random(97, 122));
    }
    return text;
}
let text = buildRandomText();

var buildSuffixTrieTextST = Date.now();
var suffixTrieText = new SuffixTrie(text);
console.log(`buildSuffixTrieText Time: ${Date.now() - buildSuffixTrieTextST}`);
console.log(lookupPatternIndexOf('ab', text));
// console.dir(suffixTrie);
