function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function combinations(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}