const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose
//     .connect(
//         'mongodb+srv://candace55:zxcv1234@cc-database-duvx8.mongodb.net/shop?retryWrites=true&w=majority',
//         { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//     )

const url = 'mongodb+srv://candace55:zxcv1234@cc-database-duvx8.mongodb.net/math?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`))
