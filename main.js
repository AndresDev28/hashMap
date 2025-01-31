import { HashMap } from "./hashMap.js";

const myHashMap = new HashMap();

myHashMap.set('apple', 'red');
myHashMap.set('banana', 'yellow');
myHashMap.set('orange', 'orange');
myHashMap.set('grape', 'purple');
myHashMap.set('watermelon', 'green');
myHashMap.set('strawberry', 'red');
myHashMap.set('blueberry', 'blue');
myHashMap.set('raspberry', 'red');
myHashMap.set('kiwi', 'green');
myHashMap.set('mango', 'yellow');
myHashMap.set('pineapple', 'yellow');
myHashMap.set('peach', 'pink');
myHashMap.set('lemon', 'yellow');
myHashMap.set('lime', 'green');


// console.log("Buckets:", myHashMap.buckets);
// console.log("Size:", myHashMap.size);

// myHashMap.set("plum", "purple");

// console.log("Buckets after resize:", myHashMap.buckets);
// console.log("Size after resize:", myHashMap.size);

// myHashMap.set('apricot', 'orange');
// console.log("Buckets after more entries:", myHashMap.buckets);
// console.log("Size after more entries:", myHashMap.size);

/* Probando el método get(key) */

// const colorOfLime = myHashMap.get("lime");
// const colorOfBanana = myHashMap.get("banana");
// const noExistingkey = myHashMap.get("random");

// console.log("El color de lime es:", colorOfLime);
// console.log("El color de banana es:", colorOfBanana);
// console.log("El valor nulo es:", noExistingkey);

// ------------- ------------------ //

/* Probando el método has(key) */ 
// const keyBanana = myHashMap.has("banana");
// console.log("Is banana a key?:", keyBanana);
// const keyApple = myHashMap.has("apple");
// console.log("Is apple a key?:", keyApple);
// const keyBrown = myHashMap.has("brown");
// console.log("Is brown a key?:", keyBrown);

/* Probando el método remove() */

// const removeLime = myHashMap.remove("lime")
// console.log("Is lime removed?:", removeLime);
// const removeAnother = myHashMap.remove("poo")
// console.log("Is Another removed?:", removeAnother);

/* Probando el método length() */
// const totalEntries = myHashMap.length();
// console.log("The total of entries are: ", totalEntries);

/* Probando método clear() */
// myHashMap.clear();

/* Testing keys() */
// const keys = myHashMap.keys();
// console.log("Keys on the hashMap are: ", keys);

/* Testing values() */
// const values = myHashMap.values();
// console.log("Values on the hashMap are: ", values);

/* Testing entries() */
const entries = myHashMap.entries();
console.log("Entries on the hashMap are: ", entries);