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
User.findByIdAndDelete("67d696a6dbb7f6fe58fd1e1b").then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});
User.deleteOne({name : "John"}).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});
/*User.findById("67d69a2f83198baa6e9ab7cb").then((res) => {
    console.log(res[0]);
    
}).catch((error) => {
    console.log(error);
});*/
/*User.insertMany([
    {name : "shafat", email : "123@gmail.com" , age : 24 },
    {name : "seenu", email : "1234@gmail.com" , age : 25 },
    {name : "shaffu", email : "12@gmail.comn" , age : 26 },
]).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});*/
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