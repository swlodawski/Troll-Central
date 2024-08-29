const expresss = require('express');
const db = require('./config/connection');
const routes = require('./routes');

cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = expresss();

app.use(expresss.urlencoded({extended: true}));
app.use(expresss.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})