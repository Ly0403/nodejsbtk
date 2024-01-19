// private
const privateVar = 33;

// public
const publicVar = 44;

const pubFunc01= ()=>{
  console.log(privateVar);
};

// module.exports.publicVar = publicVar;
// module.exports.pubFunc01 = pubFunc01;

module.exports = {
  pubFunc01,
  publicVar,
};
