const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config();
import * as Sentry from "@sentry/node";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Sentry.init({
  dsn: "https://5196eccdb3dd4702af0a16623ca03110@o4505442055618560.ingest.sentry.io/4505442114535424",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Define the asset schema
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  userId: { type: String, required: true },
});

// Define the financial schema
const financialSchema = new mongoose.Schema({
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
  savings: { type: Number, required: true },
  userId: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
});

// Define the breakdown schema
const breakdownSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
});

// Define the invoice schema
const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  invoice: { type: Buffer, required: true },
});

// Create the models
const Asset = mongoose.model("Asset", assetSchema);
const Financial = mongoose.model("Financial", financialSchema);
const Breakdown = mongoose.model("Breakdown", breakdownSchema);
const User = mongoose.model("User", userSchema);
const Invoice = mongoose.model("Invoice", invoiceSchema);

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      contact: req.body.contact,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Get all assets API
app.get("/assets", authenticateUser, async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user.email });
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching assets");
  }
});

// Add asset API
app.post("/assets", authenticateUser, async (req, res) => {
  try {
    const asset = new Asset({
      name: req.body.name,
      type: req.body.type,
      value: req.body.value,
      userId: req.user.email,
    });
    await asset.save();
    res.status(201).send("Asset added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding asset");
  }
});

// Update asset API
app.put("/assets/:id", authenticateUser, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset || asset.userId !== req.user.email) {
      return res.sendStatus(404);
    }
    asset.name = req.body.name;
    asset.type = req.body.type;
    asset.value = req.body.value;
    await asset.save();
    res.send("Asset updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating asset");
  }
});

// Delete asset API
app.delete("/assets/:id", authenticateUser, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset || asset.userId !== req.user.email) {
      return res.sendStatus(404);
    }
    await asset.remove();
    res.send("Asset deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting asset");
  }
});

// Get financial API
app.get("/financial", authenticateUser, async (req, res) => {
  try {
    let query = { userId: req.user.email };
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }
    if (req.query.month) {
      query.month = parseInt(req.query.month);
    }
    const financials = await Financial.find(query);

    res.json(financials);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching financial data");
  }
});

// Add financial API
app.post("/financial", authenticateUser, async (req, res) => {
  try {
    const financial = new Financial({
      type: req.body.type,
      amount: req.body.amount,
      year: req.body.year,
      month: req.body.month,
      userId: req.user.email,
    });
    await financial.save();
    res.status(201).send("Financial data added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding financial data");
  }
});

// Get detailed financial API
app.get("/detailedfinancial", authenticateUser, async (req, res) => {
  try {
    let query = { userId: req.user.email };
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }
    if (req.query.month) {
      query.month = parseInt(req.query.month);
    }
    const financials = await Financial.find(query);
    const income = financials.filter((f) => f.type === "income");
    const expenses = financials.filter((f) => f.type === "expense");
    res.json({
      income: income,
      expenses: expenses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching financial data");
  }
});

// Upload file API
app.post(
  "/upload",
  authenticateUser,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = new File({
        filename: req.file.filename,
        path: req.file.path,
        userId: req.user.email,
      });
      await file.save();
      res.status(201).send("File uploaded successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading file");
    }
  }
);

// Listen on port
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
