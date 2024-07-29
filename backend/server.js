const app = require('./src/app');
const PORT = 5000;
require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//hi