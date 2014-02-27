/*
* Copyright 2014 Luis Perdomo

* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

//Custom equality operator definition for simple usage
function __DefaultEqualityComparer(a, b) {
    return a === b || a.valueOf() === b.valueOf();
};
 
//Custom sort operator definition for simple usage
function __DefaultSortComparer(a, b) {
    if (a === b) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a == "string") return a.toString().localeCompare(b.toString());
    return a.valueOf() - b.valueOf();
};
 
function __DefaultPredicate() {
    return true;
};

function __DefaultSelector(t) {
    return t;
}; 

Array.prototype.clone = function() {
	//return this.slice(0);
	//SEE: http://jsperf.com/loop-vs-slice-copy/3
	var copy = [];
	for (var j = 0; j < this.length; j++) {
		copy.push(this[j]);
	}
	return copy;
};

/*
Array.prototype.first = function (predicate, def) {
    var l = this.length;
    if (!predicate) return l ? this[0] : def == null ? null : def;
    for (var i = 0; i < l; i++)
        if (predicate(this[i], i, this))
            return this[i];
    return def == null ? null : def;
}; 
*/

Array.prototype.unique = function() {
	var self = this;
	return self.filter(function(elem, pos) { return self.indexOf(elem) == pos; });
}

Array.prototype.select = Array.prototype.map || function (selector, context) {
    context = context || window;
    var arr = [];
    var l = this.length;
    for (var i = 0; i < l; i++)
        arr.push(selector.call(context, this[i], 	i, this));
    return arr;
}; 

Array.prototype.where = function(fn){
    if (typeof (fn) !== typeof (Function)) throw "where takes a function to filter on";
    var ret = fn(this[0]);
    if (typeof (ret) !== "boolean") throw "function provided to where much return bool";
    return this.filter(fn);
}

Array.prototype.ucase=function()
{
  for (i=0;i<this.length;i++)
  {
      if (typeof this[i]=="string"){
          this[i]=this[i].toUpperCase();
      }
  }
}

Array.prototype.lcase=function()
{
  for (i=0;i<this.length;i++)
  {
      if (typeof this[i]=="string"){
          this[i]=this[i].toLowerCase();
      }
  }
}

Array.prototype.capitalize=function()
{
  for (i=0;i<this.length;i++)
  {
      if (typeof this[i]=="string"){
          this[i]=this[i].charAt(0).toUpperCase() + this[i].slice(1).toLowerCase();
      }
  }
  return this;
}

Array.prototype.readonly = function(){
    this.push = function(denied) { throw 'Ops!: array is read-only' };
}

Array.prototype.union=function(other)
{
  return this.concat(other).distinct();
}

Array.prototype.unionAll=function(others)
{
  return this.concat.apply(this,others).distinct();
}

Array.prototype.sum = function (s) {
    s = s || __DefaultSelector;
    var l = this.length;
    var sum = 0;
    while (l-- > 0) sum += s(this[l]);
    return sum;
}; 

Array.prototype.checkTypes = function(desired) {
    var ret = true;
    for (var i = 0, len = this.length; i < len; i++) {
        if(typeof this[i] != desired) {
            ret = false;
            break;
        }
    }
    return ret;
}

Array.prototype.equalTypes = function() {
    var ret = true;
    var previousType = null;
    for (var i = 0, len = this.length; i < len; i++) {
        if(previousType == null){
            previousType = typeof this[i];
        }
        if (previousType != typeof this[i]){
            ret = false;
            break;
        } else {
            previousType = typeof this[i];
        }
    }
    return ret;
}

Array.prototype.flatten = function() {
    return this.reduce(function(a,b){
        if( 
            Object.prototype.toString.call( a ) === '[object Array]' &&
            Object.prototype.toString.call( b ) === '[object Array]'  
          ) {
            return a.concat(b);
        } else {
            throw "One or many elements of the source cannot be flattened";
        }
    });
}

Array.prototype.itemsType = function() {
    var t = undefined;
    if(this.equalTypes()){
       var t = typeof this[0];
        if(t === "object" && Object.prototype.toString.call( this[0] ) === '[object Array]'){
            t = "array";
            return t;
        }
        if(t === "object" && Object.prototype.toString.call( this[0] ) === '[object Date]'){
            t = "date";
            return t;
        }
        return t;
    } else { return t; }
}

Array.prototype.asc=function(){
    var fn = null;
    switch(this.itemsType()) {
        case 'date':
          fn = function (date1, date2) {
              // This is a comparison function that will result in dates being sorted in
              // ASCENDING order. As you can see, JavaScript's native comparison operators
              // can be used to compare dates.
              if (date1 > date2) return 1;
              if (date1 < date2) return -1;
              return 0;
           };
            break;
        case 'string':
            return this.sort();
            break;
        case 'number':
            fn = function(a,b){return a-b}
            break;
        default:
            throw "Cannot sort the items in ascending order"
            break;
    }    
    return this.sort(fn);
}

Array.prototype.desc=function(){
    var fn = null;
    switch(this.itemsType()) {
        case 'date':
          fn = function (date1, date2) {
              // This is a comparison function that will result in dates being sorted in
              // DESCENDING order.
              if (date1 > date2) return -1;
              if (date1 < date2) return 1;
              return 0;
          };
            break;
        case 'string':
            this.sort();
            return this.reverse();
            break;
        case 'number':
            fn = function(a,b){return b-a};
            break;
        default:
            throw "Cannot sort the items in descending order"
            break;
    }    
    return this.sort(fn);
}

Array.prototype.singleOrNull = function (pred) {
    var filtered = this.filter(pred);
    if (filtered.length == 0)
        return null;
    if (filtered.length > 1)
        throw "More than one element returned.";
    
    return filtered[0];
};

Array.prototype.groupBy = function(fn) {
    /// 
    if (!fn || typeof (fn) !== typeof (Function)) {
        throw Error.argumentType("fn", typeof (fn), typeof (Function), "groupBy takes a function to filter on");
    }
    var ret = new Array();
    for (var i = 0; i < this.length; i++) {
        var key = fn(this[i]);
        var keyNode = ret.singleOrNull(function(item) { return item.key === key; });

        if (!keyNode) {
            ret[ret.length] = { "key": key, "items": new Array() };
            ret[ret.length - 1].items.push(this[i]);
        } else {
            ret[ret.indexOf(keyNode)].items.push(this[i]);
        }
    }

    return ret;
}

Array.prototype.skip = function (c) {
    return this.slice(c);
}; 

Array.prototype.contains = function (o, comparer) {
    comparer = comparer || __DefaultEqualityComparer;
    var l = this.length;
    while (l-- > 0)
        if (comparer(this[l], o) === true) return true;
    return false;
}; 

Array.prototype.distinct = function (comparer) {
    var arr = [];
    var l = this.length;
    for (var i = 0; i < l; i++) {
        if (!arr.contains(this[i], comparer))
            arr.push(this[i]);
    }
    return arr;
}; 

Array.prototype.intersect = function (arr, comparer) {
    comparer = comparer || __DefaultEqualityComparer;
    return this.distinct(comparer).where(function (t) {
        return arr.contains(t, comparer);
    });
}; 

Array.prototype.zip = function (arr, selector) {
    return this
        .take(Math.min(this.length, arr.length))
        .select(function (t, i) {
            return selector(t, arr[i]);
        });
}; 

Array.prototype.take = function (c) {
    return this.slice(0, c);
}; 

Array.prototype.except = function (arr, comparer) {
    if (!(arr instanceof Array)) arr = [arr];
    comparer = comparer || __DefaultEqualityComparer;
    var l = this.length;
    var res = [];
    for (var i = 0; i < l; i++) {
        var k = arr.length;
        var t = false;
        while (k-- > 0) {
            if (comparer(this[i], arr[k]) === true) {
                t = true;
                break;
            }
        }
        if (!t) res.push(this[i]);
    }
    return res;
};  

Array.prototype.inject = function (key,value){
	for (var i = 0; i < this.length; i++){
		this[i][key] = value;
	}
}

Array.prototype.extract = function (key){
	var c = this.clone();
	for (var i = 0; i < c.length; i++){
		var ic = JSON.parse(JSON.stringify(c[i]));
		delete ic[key]
		c[i] = ic;
	}
	return c;
}
