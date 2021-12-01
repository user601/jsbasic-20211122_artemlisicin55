function checkSpam(str) {
  let spamStr = str.toLowerCase();

  if (spamStr.includes("1xbet") || spamStr.includes("xxxxx")) {
    return true;
  }
  return false;
  // ваш код...
}
