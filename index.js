const mongoose = require('mongoose');


 
main()
.then(() => { 
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema = new mongoose.Schema({
    name : String ,
    email : String ,
    age : Number ,
});
// collection name is users
// collection name and model name should be same
const User  = mongoose.model("User", userSchema);
User.insertMany([
    {name : "shafat", email : "123@gmail.com" , age : 24 },
    {name : "seenu", email : "1234@gmail.com" , age : 25 },
    {name : "shaffu", email : "12@gmail.comn" , age : 26 },
]).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});
/*const user2 = new User({
    name : "shafat",
    email : "mdshafat@gmail.com",
    age : 24,

});
user2.save().then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});
*/