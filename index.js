const mongoose = require("mongoose");
const MockGoose = require("mockgoose").Mockgoose;

const DB_URI =
  "mongodb+srv://moha2511:ztt53tzg@cluster0-6qmq1.mongodb.net/test?retryWrites=true";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * Coonects to the real mongodb or creates a mock
 *  process.env.NODE_ENV control the check 
 * if test mock 
 */
function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const mockgoose = new MockGoose(mongoose);
      mockgoose
        .prepareStorage()
        .then(() => {
          mongoose
            .connect(DB_URI)
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            });
        });
    } else {
      mongoose
        .connect(DB_URI)
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

/**
 * Closes the conntect to mongoose
 */
function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
