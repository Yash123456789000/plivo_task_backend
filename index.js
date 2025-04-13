import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// import clientRoutes from "./routes/client.js";
// import generalRoutes from "./routes/general.js";
// import managementRoutes from "./routes/management.js";
// import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Website from "./models/Website.js"
import Api from "./models/Api.js"
import Database from "./models/Database.js";
import Calendar from "./models/Calendar.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
// app.use("/management", managementRoutes);
// app.use("/sales", salesRoutes);

app.get("/", (req, res)=>{
  return res.status(201).message('Hello world');
})

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // const newUser = new User({ name, email, password });
  const userexists = await User.findOne({ email })
  if (userexists) {
    return res.status(400).send('User already exists');
  }

  await User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(400).send('Error registering user: ' + error));
});

app.post("/login", async(req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.status(401).send('Invalid email or password');
      }
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).send('Error logging in: ' + error));
})

app.post("/website", async (req, res)=>{
  const { traffic, owner, lastUpdated, company, Location, Status, StatusBg, ProductImage} = req.body;
  await Website.create(req.body)
    .then((website) => res.status(201).json(website))
    .catch((error) => res.status(400).send('Error creating website: ' + error));
})

app.post("/api", async (req, res)=>{
  await Api.create(req.body)
    .then((api) => res.status(201).json(api))
    .catch((error) => res.status(400).send('Error creating api: ' + error));
})

app.post("/database", async (req, res)=>{
  await Database.create(req.body)
    .then((database) => res.status(201).json(database))
    .catch((error) => res.status(400).send('Error creating database: ' + error));
});

app.get("/api", async (req, res) => {
  try {
    const apis = await Api.find();
    res.status(200).json(apis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/website", async (req, res) => {
  try {
    const websites = await Website.find();
    res.status(200).json(websites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ✅ GET /website/:id - Get all websites of a user
app.get('/website/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.websites);
  } catch (error) {
    console.error('Error fetching websites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST /website/:id - Add a new website to user
app.post('/website/:id', async (req, res) => {
  try {
    const { ProductImage, company, owner, traffic, lastUpdated, Location, Status, StatusBg } = req.body;

    const newWebsite = {
      ProductImage,
      company,
      owner,
      traffic,
      lastUpdated,
      Location,
      Status,
      StatusBg
    };

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.websites.push(newWebsite);
    await user.save();

    res.status(201).json(newWebsite);
  } catch (error) {
    console.error('Error adding website:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.apis);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching APIs' });
  }
});

// POST a new API entry
app.post('/api/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.apis.push(req.body);
    await user.save();

    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding API' });
  }
});

/* --------------------- DATABASE ROUTES ---------------------- */

// GET all databases for a user
app.get('/database/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.databases);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching databases' });
  }
});

// POST a new database entry
app.post('/database/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.databases.push(req.body);
    await user.save();

    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding database' });
  }
});

app.get('/lineChartData/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.lineChartData);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching databases' });
  }
});

app.post('/lineChartData/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.lineChartData.push(req.body);
    await user.save();

    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding API' });
  }
});

app.post('/pieChartData/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.pieChartData.push(req.body);
    await user.save();

    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding API' });
  }
});



app.get('/pieChartData/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.pieChartData);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching databases' });
  }
});


app.get("/database", async (req, res) => {
  try {
    const databases = await Database.find();
    res.status(200).json(databases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/calendar", async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.status(200).json(calendars);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Node.js with Express
app.post('/calendar', async (req, res) => {
  const newEvent = req.body;
  await Calendar.create(newEvent);
  res.sendStatus(201);
});


app.put('/calendar/:id', async (req, res) => {
  const { id } = req.params;
  await Calendar.updateOne({ Id: parseInt(id) }, { $set: req.body });
  res.sendStatus(200);
});

app.delete('/calendar/:id', async (req, res) => {
  const { id } = req.params;
  await Calendar.deleteOne({ Id: parseInt(id) });
  res.sendStatus(200);
});

app.patch('/themeColor/:id', async (req, res) => {
  const { id } = req.params;
  await User.updateOne({ _id: id }, { $set: { themeColor: req.body.themeColor } });
  res.sendStatus(200);
});

app.patch('/themeMode/:id', async (req, res) => {
  const { id } = req.params;
  await User.updateOne({ _id: id }, { $set: { themeMode: req.body.themeMode } });
  res.sendStatus(200);
});





/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
