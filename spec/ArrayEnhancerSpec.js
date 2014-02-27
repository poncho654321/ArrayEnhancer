describe("ArrayEnhace", function() {
  var source;
  var result;

  beforeEach(function() {
    source = [];
    result = [];
  });

  it("should be able to clone an array", function() {
    source = [1,2,3,4];
	result = source.clone();
	expect(result).toEqual(source);
	expect(result.length).toEqual(source.length);
  });
  
  it("should be able to create an array without duplicates", function() {
    source = [1,2,22,3,5,2,3,4];
	result = source.unique();
	expect(result).toEqual([1,2,22,3,5,4]);
  });  
  
  it("should be able to select all numbers before 10", function() {
    source = [1,2,3,4,5,6,7,8,9,10,2,3];
	result = source.where(function(item){ return item < 10 });
	expect(result.length).toEqual(11);
  });
  
  it("should be able to select all numbers between 5 and 9", function() {
    source = [1,2,3,4,5,6,7,8,9,10,2,3];
	result = source.where(function(item){ return (item > 5 && item < 9) });
	expect(result.length).toEqual(3);
  });
  
  it("should be able to select all numbers after 10", function() {
    source = [1,2,3,4,5,6,7,8,9,10,2,3];
	result = source.where(function(item){ return (item > 10) });
	expect(result.length).toEqual(0);
  });
  
  it("should be able to select all numbers between 3 and 8 but no 6", function() {
    source = [1,2,3,4,5,6,7,8,9,10,2,3];
	result = source.where(function(item){ return (item > 3 && item < 8 && item != 6) });
	expect(result.length).toEqual(3);
  });
  
  it("should be able to UPPER CASE the all strings", function() {
    source = ["apple","duck","SCIENCE"];
	source.ucase();
	expect(source[0]).toEqual("APPLE");
  });
  
  it("should be able to [lower case] the all strings", function() {
    source = ["apple","duck","SCIENCE"];
	source.lcase();
	expect(source[2]).toEqual("science");
  });
  
  it("should be able to capitalize the all strings", function() {
    source = ["apple","duck","SCIENCE"];
	source.capitalize();
	expect(source[1]).toEqual("Duck");
  });
  
  it("should be able to union arrays: [1,2,3] and [3,4,5,6] with distinct", function() {
    source = [1,2,3];
	var unionto = [3,4,5,6];
	var result = source.union(unionto);
	expect(result.length).toEqual(6);
	expect(result).toEqual([1,2,3,4,5,6]);
  });
  
  it("should be able to union all arrays: [1,2,3], [3,4,5,6], [3,6,20,11,66] with distinct", function() {
    source = [1,2,3];
	var result = source.unionAll([[3,4,5,6],[3,6,20,11,66]]);
	expect(result.length).toEqual(9);
	expect(result).toEqual([1,2,3,4,5,6,20,11,66]);
  });
  
  it("should be able to sumairze all numbers from this array: [1,2,3,3,4,5,6,3,6,20,11,66] with distinct", function() {
    source = [1,2,3,3,4,5,6,3,6,20,11,66];
	expect(source.sum()).toEqual(130);
  });
  
  it("should be able to check all items types and get equals to 'number' [1,2,3,3,4,5,6,3,6,20,11,66]", function() {
    source = [1,2,3,3,4,5,6,3,6,20,11,66];
	expect(source.checkTypes('number')).toEqual(true);
  });
  
  it("should be able to detect one o many different types of 'number' in [1,2,3,3,'samsung',5,6,3,{id:1},'luis',11,66]", function() {
    source = [1,2,3,3,'samsung',5,6,3,{id:1},'luis',11,66];
	expect(source.checkTypes('number')).toEqual(false);
  });
  
  it("should be able to detect that all items in [{id:1},{id:1},{id:1},{id:1}] are JSON objects", function() {
    source = [{id:1},{id:1},{id:1},{id:1}];
	expect(source.equalTypes()).toEqual(true);
  });
  
  it("should be able to detect that not all items in [{id:1},1,'hello from there',1] are numbers", function() {
    source = [{id:1},1,'hello from there',1];
	expect(source.equalTypes()).toEqual(false);
  });
  
  it("should be able to flatten this array: [[0, 1], [2, 3], [4, 5]]", function() {
    source = [[0, 1], [2, 3], [4, 5]]
	result = source.flatten()
	expect(result).toEqual([0,1,2,3,4,5]);
  });
  
  it("should be able to except this values [1,8,2,7,3] from this array: [1,2,3,4,5,6,7,8]", function() {
    source = [1,2,3,4,5,6,7,8]
	result = source.except([1,8,2,7,3]);
	expect(result).toEqual([4,5,6]);
  });
  
  it("should be able to group this values [{id: 1, total: 3.50},{id: 1, total: 115.50},{id: 2, total: 3.50},{id: 2, total: 3.50}] by key id", function() {
    source = [{id: 1, total: 3.50},{id: 1, total: 115.50},{id: 2, total: 3.50},{id: 2, total: 3.50}]
	result = source.groupBy(function(item){ return item.id })
	expect(result).toEqual(
		[
			{key: 1, 
				items: [{id: 1, total: 3.50},{id: 1, total: 115.50}]}
				,
			{key: 2,
				items: [{id: 2, total: 3.50},{id: 2, total: 3.50}]}
		]);
  });
  
  it("should be able to inject a new property 'PRICE' with value 10000 to this objects [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}]", function() {
    source = [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}]
	source.inject('price',10000);
	expect(source).toEqual([{id:1,brand:'Ford',price:10000},{id:2,brand:'Chevrolet',price:10000},{id:3,brand:'Audi',price:10000}]);
  });
  
  it("should be able to extract the property 'BRAND' from this objects [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}] without modify the original array", function() {
    source = [{id:1,brand:'Ford'},{id:2,brand:'Chevrolet'},{id:3,brand:'Audi'}]
	result = source.extract('brand');
	expect(result).toEqual([{id:1},{id:2},{id:3}]);
  });
  
  it("should be able to select all values after 5 from this array: [1,2,3,4,5,6,7,8] and calculate the result of SUM function, in fluent way", function() {
    source = [1,2,3,4,5,6,7,8]
	result = source.where(function(item){ return item < 5}).sum(function(item) { return item; });
	expect(result).toEqual(10);
  });
  
  it("should be able to select all values between 7 and 50 from this array: [1,2,3,4,5,6,7,8,22,55,30,11,41,20], get all the pair numbers and calculate the result of SUM function, in fluent way", function() {
    source = [1,2,3,4,5,6,7,8,22,55,30,11,41,20]
	result = source.where(function(item){ return item > 7 && item < 50}).where(function(item){ return item % 2 == 0 }).sum(function(item) { return item; });
	expect(result).toEqual(80);
  });
  
  /*
    it("test", function() {
    source = [{id:1,cant:10,precio: 20},{id:1,cant:10,precio: 20},{id:1,cant:10,precio: 20}]
	result = source.sum(function(item) { return item.precio*item.cant; } )
	expect(result).toEqual(600);
  });*/
  
});
