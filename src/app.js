import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const port = process.env.PORT
//connect MongoDB
mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
.then(() => console.log('DB Connected!'));

app.use(express.json());

import routerProduct from './routers/product.js'
import routerUser from './routers/user.js'

app.use('/api/product',routerProduct);
app.use('/api',routerUser);


app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`)
})