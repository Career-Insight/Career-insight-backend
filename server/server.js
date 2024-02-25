const app = require('./app');

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Sever is up on port: ${PORT}`);
});