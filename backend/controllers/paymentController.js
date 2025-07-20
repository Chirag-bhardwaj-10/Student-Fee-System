const Student = require('../models/Student');

exports.payFees = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.isFeePaid) {
      return res.status(400).json({ message: 'Fees already paid' });
    }

    student.isFeePaid = true;
    await student.save();

    res.json({ 
      message: 'Fees paid successfully',
      isFeePaid: student.isFeePaid
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};