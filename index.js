;
var bcrypt = require("bcryptjs");

bcrypt.genSalt(10).then(succ=>{
  console.log(succ)
})
