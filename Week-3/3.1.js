// Create a memoize function that remembers previous inputs and stores them in cache so that it 
// won’t have to compute the same inputs more than once. The function will take an unspecified 
// number of integer inputs and a reducer method.

// Given reducer method:
function memoize(fn, resolver) {
    const cache = new Map();
    return function (...args) {
        const key = resolver ? resolver.apply(null, args) : args[0];

        if (cache.has(key)) {
            return cache.get(key);
        }
        else {
            const result = fn.apply(null, args);
            cache.set(key, result);
            return result;
        }
    }
}


function add(a,b=0)
{
    return a+b;
}
//Create a method called memoize such that:
const memoizeAdd = memoize(add, (a, b) => `${a}:${b}`);
//then calling...
console.log(memoizeAdd(100,100));
//returns 200
console.log(memoizeAdd(100));
//returns 100
console.log(memoizeAdd(100,200));
//returns 300
console.log(memoizeAdd(100,100));
//returns 200 without computing