const bcrypt = require("bcrypt");
const Employee = require("../models/employee.model");
const jwtUtils = require("../utils/jwtUtils");

//login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = jwtUtils.generateToken(employee);
    const refreshToken = jwtUtils.generateRefreshToken(employee);
    // Set the refresh token in an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//create super admin
exports.createSuperadmin = async (req, res) => {
      const { name, email, password, phone } = req.body;
    
      try {
        // Check if a superadmin already exists
        const existingSuperadmin = await Employee.findOne({ role: 'admin' });
        if (existingSuperadmin) {
          return res.status(400).json({ message: 'Superadmin already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new superadmin
        const superadmin = new Employee({
          name,
          email,
          password: hashedPassword,
          phone,
          role: 'admin',
        });
    
        // Save the superadmin to the database
        await superadmin.save();
    
      //   // Generate tokens
      //   const accessToken = jwtUtils.generateToken(superadmin);
      //   const refreshToken = jwtUtils.generateRefreshToken(superadmin);
    
      //   // Set the refresh token in an HttpOnly cookie
      //   res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    
        res.status(201).json({ message: 'Superadmin created successfully' });
      } catch (error) {
        console.error('Error creating superadmin:', error);
        res.status(500).json({ message: 'Server error' });
      }
    };


//add employee
exports.addEmployee = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // Check if an employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'employee',
    });

    // Save the employee to the database
    await employee.save();

    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

//delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

//logout controller
exports.logout=async(req,res)=>{
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out successfully" });
}