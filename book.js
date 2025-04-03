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
    enum: ["fiction", "non fiction", "comics"],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Create Model
const Book = mongoose.model("Book", bookSchema);

// Update book
async function updateBook() {
  try {
    const res = await Book.findByIdAndUpdate("60e3f6d2e8c3c4b7c8f7a8c4", { price: 5888 });
    console.log(res);   
  } catch (error) {
    console.log("Update error:", error);
  }
}

// Insert Books with duplicate handling
async function insertBooks() {
  try {
    const book1 = {
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 200, 
      category: "fiction",
      discount: 10,
    };

    const book2 = {
      title: "The Secret",
      author: "Rhonda Byrne",
      price: 300,
      category: "comics",
      discount: 0
    };

    // First check if books already exist
    const existingBook1 = await Book.findOne({ title: book1.title });
    const existingBook2 = await Book.findOne({ title: book2.title });

    if (!existingBook1) {
      await Book.create(book1);
      console.log(`${book1.title} inserted successfully`);
    } else {
      console.log(`${book1.title} already exists in the database`);
    }

    if (!existingBook2) {
      await Book.create(book2);
      console.log(`${book2.title} inserted successfully`);
    } else {
      console.log(`${book2.title} already exists in the database`);
    }

    // Alternative: Using insertMany with ordered: false to continue on errors
    /*
    try {
      const savedBooks = await Book.insertMany([book1, book2], { ordered: false });
      console.log("Books inserted:", savedBooks);
    } catch (error) {
      if (error.code === 11000) {
        console.log("Some books were not inserted due to duplicate titles");
        console.log("Inserted books:", error.insertedDocs);
      } else {
        throw error;
      }
    }
    */
  } catch (error) {
    console.error("Error inserting books:", error);
  }
}

// Execute functions
async function run() {
  await updateBook();
  await insertBooks();
  mongoose.connection.close();
}

run();