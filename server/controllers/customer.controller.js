const Customer = require("../models/customer.model");
const Address = require("../models/address.model");
const bcrypt = require("bcrypt");

// Function to create a new customer
exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists." });
    }

    // Create a new Address
    const newAddress = new Address({
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    });

    // Save the address to the database
    const savedAddress = await newAddress.save();

    // Hash the customer's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      phone,
      address: savedAddress._id,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();

    // Respond with the newly created customer (excluding password)
    res.status(201).json({
      id: savedCustomer._id,
      name: savedCustomer.name,
      email: savedCustomer.email,
      phone: savedCustomer.phone,
      address: savedAddress,
      createdAt: savedCustomer.createdAt,
      updatedAt: savedCustomer.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

