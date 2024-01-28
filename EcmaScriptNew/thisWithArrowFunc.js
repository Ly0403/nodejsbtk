// ES5
const obj01 = {
  a: [1, 2, 3, 4],
  c: "text",
  b: function() {
    const self = this;
    this.a.forEach(function(v) {
      //   console.log(this.c); Error this not reach
      console.log(self.c);
    });
  },
};

obj01.b();

// ES6
const obj02 = {
  a: [1, 2, 3, 4],
  c: "textES6",
  b: function() {
    this.a.forEach( () => {
      console.log(this.c); // arrow functions do not create a new context
      // and can reach the object
    });
  },
};

obj02.b();
