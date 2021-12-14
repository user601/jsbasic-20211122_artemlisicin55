function filterRange(arr, a, b) {
  firstArr = [];
  for (let element of arr) {
    if (element >= a && element <= b) {
      firstArr.push(element);
    }
  }
  return firstArr;
}
