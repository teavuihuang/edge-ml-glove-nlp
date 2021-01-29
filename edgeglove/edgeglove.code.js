/*
Copyright 2021 Tea Vui Huang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
 
/**
 * Expand numeric tokens to words.
 * @param {!Array<number>} edgeglove_data_tokens Number array representing similiar words of a given word.
 * @param {number} vocab_depth Number of similiar words to use for each word.
 * @return {!Array<string>} Expanded words.
 */
function edgegloveExpandTokens(edgeglove_data_tokens, vocab_depth) 
{
	if (vocab_depth < 1) vocab_depth = 1;
	if (vocab_depth > edgeglove_data[0].length) vocab_depth = edgeglove_data[0].length;
	// Skip thr 1st word, which is itself
	var word_list = [];
	for (var tt=1;tt<vocab_depth;tt++) 
	{
		word_list = word_list.concat( edgeglove_word[ edgeglove_data_tokens[tt] ] );
	}
	return word_list;
}

/**
 * Return words with highest occurence.
 * @return {!Array<string>} Words with highest occurence.
 */
Array.prototype.byCount= function() 
{
    var itm, a= [], L= this.length, o= {};
    for (var i= 0; i<L; i++){
        itm= this[i];
        if(!itm) continue;
        if(o[itm]== undefined) o[itm]= 1;
        else ++o[itm];
    }
    for(var p in o) a[a.length]= p;
    return a.sort(function(a, b){
        return o[b]-o[a];
    });
}

/**
 * Concatenate similiar words of every word in the given string array, and find the most common words.
 * @param {!Array<string>} classifier_list String array output from ML classifier.
 * @param {number} vocab_depth Number of similiar words to use for each word.
 * @param {number} vocab_max Number of most common words to return.
 * @return {!Array<string>} Most common words.
 */
function edgegloveFreqWords(classifier_list, vocab_depth, vocab_max) 
{
	// Break the list into a long line with seperate words, and recompose into string array
	classifier_list = classifier_list.toString().toLowerCase().replaceAll(","," ").replaceAll("-"," ").replaceAll("  "," ").split(' ');
	if ((vocab_depth==0) || (vocab_depth== undefined)) vocab_depth = 1;
	if ((vocab_max==0)   || (vocab_max== undefined))   vocab_max   = 1;
	
	var words_total = [];
	for (var ww=0;ww < classifier_list.length;ww++) 
	{
		var edgeglove_word_index  = edgeglove_word.indexOf(classifier_list[ww]);
		if (edgeglove_word_index != -1) 
		{
			edgeglove_data_tokens = edgeglove_data[ edgeglove_word_index ];
			edgeglove_data_words  = edgegloveExpandTokens( edgeglove_data_tokens, vocab_depth);
			words_total           = words_total.concat( edgeglove_data_words );
		}
		else
		{
			words_total = words_total.concat( classifier_list[ww] );
		}
	}
	return words_total.byCount().slice(0, vocab_max);
}
