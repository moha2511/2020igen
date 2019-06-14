process.env.NODE_ENV = 'production';
const app = require("./app");
const db = require('./index');
const port = process.env.PORT || 3000;

db.connect()
.then(() => {
    app.listen(port, () => {
    });
})
