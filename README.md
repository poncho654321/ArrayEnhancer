ArrayEnhancer
=============

Bunch of utility functions thats extend the base Javascript Array prototype to create LINQ-like utilities and content manipulation.

GOAL: centralize multiple operational solutions in then Javascript Array without use of any kind of depdendency like jQuery, Underscore, etc.

<div style="text-decoration:underline;">Some examples:</div>

<h3>Where predicate</h3>

<code>
  var source, predicate, result; <br/><br/>
  source = [1,2,3,4,5,6,7,8,9,10,2,3]; <br/><br/>
  predicate = function(item){ return item < 10 };<br/><br/>
  result = source.where(predicate);
  //result = [1,2,3,4,5,6,7,8,9,2,3];</code>

<h3>Capitalize utility</h3>
<code>
  var source, result; <br/><br/>
  source = ["apple","duck","SCIENCE"];<br/><br/>
  result = source.capitalize(); //result = ["Apple","Duck","Science"]
</code>

<h3>Array "flattening"</h3>
<code>
  var source, result; <br/><br/>
  source = [[0, 1], [2, 3], [4, 5]];<br/><br/>
  result = source.flatten();<br/><br/>
  //result = [0,1,2,3,4,5]
</code>

<br/><br/>
JSON manipulation:

<h3>Add a new attribute to all JSON objects in array</h3>
<code>
  source = [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}];<br/><br/>
  source.inject('price',10000);<br/><br/>
  //source = [{id:1,brand:'Ford',price:10000},{id:2,brand:'Chevrolet',price:10000},{id:3,brand:'Audi',price:10000}]
</code>

<h3>Remove an attribute from all JSON objects in array</h3>
<code>
  source = [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}];<br/><br/>
	result = source.extract('brand');<br/><br/>
  //result = {id:1},{id:2},{id:3}]
</code>

<br/><br/>
Fluent support:

<h3>Chaining Case 1</h3>
<code>
  source = [1,2,3,4,5,6,7,8];<br/><br/>
	result = source.where(function(item){ return item < 5}).sum(function(item) { return item; });<br/><br/>
	//result = 10;
</code>

<h3>Chaining Case 2</h3>
<code>
  source = [1,2,3,4,5,6,7,8,22,55,30,11,41,20];<br/><br/>
	result = source.where(function(item){ return item > 7 && item < 50}).where(function(item){ return item % 2 == 0 }).sum(function(item) { return item; });<br/><br/>
	//result = 80
</code>

<br/><br/>
WIP (editable):

I'm working to archive these new functions (comments, needs and suggestions are welcome):

- removeAll: remove all literals/JSON objects that meet a certain predicate.
- takeWhile: get a new array that contains all literals/JSON objects that meet a certain predicate.
- takeNotWhile: get a new arrat that not contains all literals/JSON objects that meet a certain predicate.
