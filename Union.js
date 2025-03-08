class CustomSet {
    constructor(comparator) {
        this.items = new Map(); // Using a Map for O(1) lookup
        this.comparator = comparator;
    }

    add(item) {
        if (!this.has(item)) {
            this.items.set(this._getKey(item), item);
        }
    }

    has(item) {
        return this.items.has(this._getKey(item));
    }

    values() {
        return Array.from(this.items.values());
    }

    _getKey(item) {
        return JSON.stringify(item); // Generates a unique key for deep objects/arrays
    }
}

// Deep equality comparator function (Handles Objects & Arrays)
const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true; // Reference equality check

    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null || 
        typeof obj1 !== 'Array' || typeof obj2 !== 'Array') {
        
        return false; // One is null or not an object
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        return obj1.every((el, i) => deepEqual(el, obj2[i])); // Recursively compare array elements
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Different number of keys

    return keys1.every(key => keys2.includes(key) && deepEqual(obj1[key], obj2[key]));
};

// Primitive equality comparator function
const primitiveEqual = (a, b) => a === b;

// Combined comparator function
const combinedComparator = (a, b) => {
    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        return deepEqual(a, b);
    }
    return primitiveEqual(a, b);
};

// Union Function
const Union = (arr1, arr2) => {
    const customSet = new CustomSet(combinedComparator);
    arr1.forEach(item => customSet.add(item));
    arr2.forEach(item => customSet.add(item));
    return customSet.values();
};

export default Union;
