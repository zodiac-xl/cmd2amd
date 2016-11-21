export default function arryUnique(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('array-unique expects an array.');
    }

    var len = arr.length;
    var i = -1;

    while (i++ < len) {
        var j = i + 1;

        for (; j < arr.length; ++j) {
            if (JSON.stringify(arr[i]) === JSON.stringify(arr[j])) {
                arr.splice(j--, 1);
            }
        }
    }
    return arr;
};