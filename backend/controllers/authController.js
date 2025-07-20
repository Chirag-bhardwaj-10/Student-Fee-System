const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    student = new Student({ name, email, password });
    
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    
    await student.save();

    const token = generateToken(student._id);

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isFeePaid: student.isFeePaid,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(student._id);

    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isFeePaid: student.isFeePaid,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};