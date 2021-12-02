const app = require('./index');
const PORT = process.env.PORT || 3000;
const url = process.env.PUBLIC_URL;

app.listen(PORT, (err: unknown) => {
    if (err) throw err;
    console.log(`> Ready on ${url}`);
    console.log(`> ENV:  ${process.env.NODE_ENV}`);
    console.log(`> PORT:  ${process.env.PORT}`);
});
