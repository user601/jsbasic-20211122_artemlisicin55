function namify(users) {
  let out = [];
  for (let user of users) {
    out.push(user.name);
  }
  return out;
}
