function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 1;
  while (max ? i <= max : true) {
    if (i % 5 === 0 && i % 3 === 0) yield 'Fizz Buzz';
    else if (i % 5 === 0) yield 'Buzz';
    else if (i % 3 === 0) yield 'Fizz';
    else yield i;
    i++;
  }
}

module.exports = fizzBuzzGenerator;
