function getMinMax(str) {
  let arr = str.split(" ").join();
  arr = arr.split(",");
  arr = arr.filter((el) => Number(el));
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
