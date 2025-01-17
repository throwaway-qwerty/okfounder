import localStorageDB from "localstoragedb"
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "pnl5"
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage)

// Check if the database was just created. Useful for initial database setup
if (!db.tableExists("posts")) {
  // create the "posts" table
  db.createTable("posts", ["user", "title", "likes", "ratings", "created_at"])

  // insert some data
  db.insert("posts", { user: "billgates", title: "Microsoft is great", likes: [], ratings: [], created_at: null })
  db.insert("posts", {
    user: "billgates",
    title: "It looks like you're writing a letter",
    likes: [],
    ratings: [],
    created_at: null
  })
  db.insert("posts", { user: "stevejobs", title: "It just works", likes: [], ratings: [], created_at: null })

  // commit the database to localStorage
  // all create/drop/insert/update/delete operations should be committed
  db.commit()
}

export default db
