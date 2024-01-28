const welcomeES5 = function() {
  console.log("Welcome without arrow function from ES5");
};

welcomeES5();

const welcomeES6 = () => {
  console.log("Welcome from ES6 with arrow function");
};

welcomeES6();

const welcomeES6Short = () =>
  console.log("Welcome arrow function short version");

welcomeES6Short();

// ES5
const returnObj = function() {
  return {
    name: 'aa',
    surname: 'aa',
  };
};

console.log(returnObj());


// ES6
const returnObj02 = () => (
  {
    name: 'aa',
    surname: 'aa',
  }
);

console.log(returnObj02());

// ES5 Array operations

const arr01 = [1, 2, 4, 5, 6];

const multiplyBy2 = arr01.map(
    function(v) {
      return v*2;
    },
);

console.log(multiplyBy2);

const multiplyBy3 = arr01.map((v) => v * 3);

console.log(multiplyBy3);
