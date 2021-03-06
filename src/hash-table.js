/* eslint-disable no-unused-vars */
/* eslint-disable */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    let index;
    if (typeof key === 'string') index = getIndexBelowMax(key, this.limit)
    else index = key;
    let bucket = this.storage.get(index);

    if (!bucket) {
      bucket = [];
      bucket.push([key, value]);
    }
    
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) tuple[1] = value;
    }
    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    let index;
    if (typeof key === 'string') index = getIndexBelowMax(key, this.limit)
    else index = key;
    let bucket = this.storage.get(index);
    
    if (!bucket) return;
  
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) bucket.splice(i, 1);
    }
    bucket = [];
    this.storage.set(index, bucket);
  }

  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    let index;
    if (typeof key === 'string') index = getIndexBelowMax(key, this.limit)
    else index = key;
    let bucket = this.storage.get(index);

    if (!bucket) return;

    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) return tuple[1];
    }
  }
}

module.exports = HashTable;
