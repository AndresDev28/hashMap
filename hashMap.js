export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) { // previous capacity a loadFactor values
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity); // Array that contains the buckets
    this.size = 0;
  }

  /** Methods */
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + (key.charCodeAt(i) % this.capacity)) % this.capacity; // % in each iteration to prevent the hash from exceeding the max integer value allowed in JS.
    }
    return hashCode;
  }

  set(key, value) {
    // 1. Generate the hash code of the key using the hash(key) function.
    const hashCode = this.hash(key);
    // 2. Calculate the bucket index from the hash code and the current capacity of the buckets array (buckets.length).
    const hashCodeIndex = hashCode % this.capacity;
    // 3. Check if the index is valid (within the bounds of the buckets array) to avoid errors. If the index is invalid, throw an error.
    if(hashCodeIndex < 0 || hashCodeIndex >= this.buckets.length ) {
      throw new Error ("Indice fuera de los límites del buckets");
    }
    // 4. Handle the insertion
    if (this.buckets[hashCodeIndex] === undefined) { // Empty array
      const node = new LinkedListNode(key, value); // Pass key and value to the constructor
      this.buckets[hashCodeIndex] = node; // Assign the new node to the bucket
      this.size++;
    } else { // If the array is not empty
      let currentNode = this.buckets[hashCodeIndex]; // Initialize currentNode to the first node in the bicket
      while(currentNode !== null) { // Traverse the list if currentNode isn't null
        if(currentNode.key === key) { // If the key matches the one we want to insert...
          currentNode.value = value; // ...update the value
          return; // Exit the function. No need to add a new node!
        }
        currentNode = currentNode.next; // If the key doesn't match, move to the next node
      }
      // If we get here, means that the key doesn't exist on the linked list
      const newNode = new LinkedListNode(key, value); // Create new node with the key and value received as a parameter
      currentNode = this.buckets[hashCodeIndex]; // Put the currentNode back to de first node of the linked list
        while(currentNode.next !== null) { // Traverse the linked list to the las element
          currentNode = currentNode.next;
        }
      currentNode.next = newNode; // Add the new node to the end of the linked list
      this.size++; // Increment the size of the HashMap
    }
    // 5. Check if we need to resize the HashMap
    if(this.size > (this.capacity * this.loadFactor)) {
      this.resize();
    }
  }

  resize() {
    const newCapcity = this.capacity * 2; // Calculate the new capacity.
    const oldBuckets = this.buckets; // Save a reference of the current buckets
    this.capacity = newCapcity; // Update the new value of capacity in this.capacity
    
    this.buckets = new Array(newCapcity); // Create a new Array with double the capatity
    this.size = 0; // rReset the size of the HashMap, since we will recalculate it in the loop below
    for (const bucket of oldBuckets) { // Traverse the old buckets array
      if (bucket) { // Check that the bucket is not undefined
        let currentNode = bucket; // Assign the bucket to currentNode
        while(currentNode !== null) { // Traverse the linked list of each bucket
          this.set(currentNode.key, currentNode.value); // Insert the values of the old HashMap into the new one
          currentNode = currentNode.next; // Move to the next element in the list
        }
      }
    }
  }

  get(key) { //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    // 1. Calculate the hashCode of the key (key)
    const hashCode = this.hash(key);
    // 2. Calculate the index of the bucket from the hashCode and the current capacity of the buckets array
    const hashCodeIndex = hashCode % this.capacity;
    // 3. Check if the index is within the bounds of the buckets array
    if (hashCodeIndex < 0 || hashCodeIndex >= this.buckets.length) {
      throw new Error("Error: Index out of the limits of the Buckets");
    }
    // 4. Get the bucket corresponding to the calculated index
    const bucket = this.buckets[hashCodeIndex];
    // 5. If the bucket is undefined:
    if (!bucket) {
      return null;
    }
    // 6. If it is NOT undefined:
    let currentNode = bucket; // a. Initialize currentNode to the first node of the bucket
    while (currentNode !== null) { // b. While current node is not null
      if (currentNode.key === key) { // i. If the key of the currentNode matches the input key (key):
        return currentNode.value; // Return the value of currentNode
      }
      currentNode = currentNode.next; // ii. Move to the next node
    }
    // c. If the while loop ends:
    return null; 
  }

  has(key) { // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const value = this.get(key); // Call get and save its value in the variable value
    return value !== null; // Return true if the value is different from null, and false otherwise (implicit ternary operator);
  }

  remove(key) { // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false
    const hashCode = this.hash(key);
    const hashCodeIndex = hashCode % this.capacity;
    if(hashCodeIndex < 0 || hashCodeIndex >= this.buckets.length ) {
      throw new Error ("Index out of the bounds of the buckets");
    }
    const bucket = this.buckets[hashCodeIndex];
    if (!bucket) {
      return false;
    }
    let currentNode = bucket;
    let previousNode = null;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        if (previousNode === null) {
          // Special case: the node to remove is the first node of the bucket
          this.buckets[hashCodeIndex] = currentNode.next;
        } else {
          // Adjust the next pointer of the previous node
          previousNode.next = currentNode.next;
        }
        this.size--; // Reduce the size of the HashMap
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return false; // If the key is not found, return false
  }

  length() { // returns the number of stored keys in the hashMap
    let storedKeys = this.size;
    return storedKeys;
  } 

  clear() { // removes all entries in the hash map
    const currentCapacity = this.capacity;
    this.buckets = new Array(currentCapacity);
    this.size = 0;
    const newSize = this.size
    console.log("HashMap cleared. New size:", newSize);
  }

  keys() { // return an array containing all the keys inside the hash map
    const keys = [];
    this.buckets.forEach((bucket) => { // Iterate over each bucket
      let currentNode = bucket; // Initialize currentNode to the first node in the bucket
      while (currentNode !== null) { // While currentNode is not nule
        keys.push(currentNode.key); // Add the key of the currentNode to the keys
        currentNode = currentNode.next; // Move to the next node
      }
    });
    return keys;
  }

  values() { // returns an array containing all the values
    const values = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
      }
    });
    return values;
  }

  entries() { // returns an array that contains each key, value pair
    const entries = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode !== null) {
        const entrie = [currentNode.key, currentNode.value];
        entries.push(entrie);
        currentNode = currentNode.next;
      }
    });
    return entries;
  }
}

export class LinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}