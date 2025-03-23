const mongoose = require('mongoose');

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

// Define Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["fiction", "non fiction", "comics"], // Added "comics" to avoid validation error
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1, // Ensures price is at least 1
  },
});

// Create Model
const Book = mongoose.model("Book", bookSchema);
 Book.findByIdAndUpdate("60e3f6d2e8c3c4b7c8f7a8c4", {price : 5888}).then((res) => {
    console.log(res);   
}).catch((error) => {
    console.log(error);
});
// Insert Books
async function insertBooks() {
  try {
    const book1 = new Book({
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 200, 
      category: "fiction",
      discount: 10,
    });

    const book2 = new Book({
      title: "The Secret",
      author: "Rhonda Byrne",
      price: 300,
      category: "comics", // Now allowed in schema
      discount: 20,
    });

    const savedBooks = await Book.insertMany([book1, book2]);
    console.log("Books inserted:", savedBooks);
  } catch (error) {
    console.error("Error inserting books:", error);
  }
};

// Call function to insert books
insertBooks();
