function sumSalary(salaries) {
  let sumSalaries = 0;
  for (let key in salaries) {
    if (
      (typeof salaries[key] == "number",
      !isNaN(salaries[key]) &&
        salaries[key] != Infinity &&
        salaries[key] != -Infinity)
    )
      sumSalaries += salaries[key];
  }
  return sumSalaries;
}
