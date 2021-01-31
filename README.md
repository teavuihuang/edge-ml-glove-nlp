# Edge-ML GloVe NLP

This high-speed, low-footprint **NLP** (Natural Language Processing) **EDGE-ML** (Edge Machine Learning) JavaScript library can be used to enhance and derive more info from 'TensorFlow.js' (TensorFlow JavaScript) classification predictions. This is accomplished by applying GloVe-based NLP (Natural Language Processing) on the classification labels. The most frequently associated words of the top labels are gathered, matched, ranked and sorted. This is essentially an **ML charades expert** that deduces what the unidentified object is by using the top labels as word clues.

**GloVe** (Global Vectors for Word Representation, https://nlp.stanford.edu/projects/glove/) is an unsupervised learning NLP algorithm for obtaining "word embedding" vector representations for words. Training is performed on aggregated global word-word co-occurrence statistics from a corpus, and the resulting representations showcase interesting linear substructures of the word vector space. In other words, GloVe observes that ratios of word-word co-occurrence probabilities have the potential for encoding some form of meaning. 

The data in this ML-Edge library is pre-computed using the 60,000 most frequently used pre-trained word vectors from "glove.6B.300d.txt", which is generated from Wikipedia 2014 wikis and English Gigaword 5th Edition newswire text from 1995 to 2010. The original consists of 6 billion tokens, has 400,000 uncased vocabulary, 300-dimension vectors and is 1 GB in size. Loading and running massive sized models into a client-based web application would cause performance issues. In this client-side library, the 400,000 vocabulary is first reduced to 317,565 (~20% reduction) after filtering out URLs, digits, alphabets and non-ASCII characters. The Edge-GloVe library then uses 60,000 (top ~20%) of the most frequently associated words of the filtered data. The following shows a TSNE comparison based on a sample of 6000 vocabulary. TSNE (T-distributed Stochastic Neighbor Embedding) is a ML (machine learning) visualization algorithm that dipslays high-dimensional data in a low-dimensional space of two or three dimensions. Similar objects are modeled by nearby points and dissimilar objects are modeled by distant points.
  
[![](https://raw.githubusercontent.com/teavuihuang/edge-ml-glove-nlp/main/examples/TSNE_6K_Unfiltered_And_Filtered.png)](https://raw.githubusercontent.com/teavuihuang/edge-ml-glove-nlp/main/examples/TSNE_6K_Unfiltered_And_Filtered.png)

TensorFlow suggests using a model that is of 30 MB in size or less in the browser. The NLP data in this ML-Edge library is customizable from 4-34 MB, depending on word-depth requirement from 10-100 of the most frequently used words of each vocabulary. To import the library, include the following lines in your client-side JavaScript code. The last line can be customized based on the search depth required, e.g. 'edgeglove.data_10.js' for up to 10 most-frequently used words, and 'edgeglove.data_100.js' for up to 100 most-frequently used words etc. 

```javascript
<script type="text/javascript" src="edgeglove.code.js"></script>
<script type="text/javascript" src="edgeglove.word.js"></script>
<script type="text/javascript" src="edgeglove.data_10.js"></script>
```

The following code sample shows how the edge library can be used. 'labels' is a string containing the words to query. 'vocab_depth' is the number of most frequently associated words to include in the search & match. 'vocab_max' parameter is the maximum number of most frequently associated words to return in descending order.

```javascript
var labels = "dog cat bird";
var vocab_depth = 4;
var vocab_max = 10;
result = edgegloveFreqWords(labels, vocab_depth, vocab_max);
// result = "pet,dogs,cat,cats,dog,birds,avian,flu"
```


Edge-ML GloVe NLP with Tensorflow.js:  
[![](https://raw.githubusercontent.com/teavuihuang/edge-ml-glove-nlp/main/examples/edgeglove.png)](https://raw.githubusercontent.com/teavuihuang/edge-ml-glove-nlp/main/examples/edgeglove.png)
