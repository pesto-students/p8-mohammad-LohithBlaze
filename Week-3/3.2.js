// call is a function that you can use to change the value of this inside a function and execute it with
// arguments provided.

// func.call(thisObj, arg1, arg2, ....)

function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.call(this, "convertible", "petrol");
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.call(this, "convertible", "diesel");
	this.price = price;
	console.log(`Car details = `, this);
}

let newBrand = new setBrand('Brand1');
let newCarPrice = new definePrice(100000);

// in the above example, you can see that we use the call function to invoke the Car function on two occasions. 
// Firstly, in the setBrand and then in the definePrice functions.

// In both of these functions, we invoke the Car function with this object representing
//  to the respective functions themselves. For example, inside setBrand, we call the Car function 
// with the this object belonging to its context. The case is similar for definePrice


// apply is similar to call function, but the only difference is between call and apply is the difference
// in how the arguments are passed.

// func.apply(thisObj, [arg1, arg2, ...., argN]);

function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
	this.price = price;
	console.log(`Car details = `, this);
}

let newBrand = new setBrand('Brand1');
let newCarPrice = new definePrice(100000);

// instead of call we have used apply in the above example, instead of passing all the arguments 
// one by one, in the apply function, you can pass all the arguments in an array.


// bind function creates a copy function with a new  value to the this present inside the calling function
// func.bind(thisObj, arg1, arg2, ...., argN);

// The bind function then returns a new function that consists of a new context to the this variable
// present inside the calling function.


function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	let carFunc = Car.bind(this, "convertible", "petrol");
    carFunc();
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	let carFunc = Car.bind(this, "convertible", "diesel");
    carFunc();
	this.price = price;
	console.log(`Car details = `, this);
}

let newBrand = new setBrand('Brand1');
let newCarPrice = new definePrice(100000);

// in the above example, we use the bind to set the this keyword belonging to its context, and since 
// bind returns a function but doesnt invoke a function, we store the returned function with the custom
// this in a variable and call that function again.