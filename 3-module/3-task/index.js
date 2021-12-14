function camelize(str) {
  return str
    .split("-")
    .map((string, index) =>
      index == 0 ? string : string[0].toUpperCase() + string.slice(1)
    )
    .join("");
}
