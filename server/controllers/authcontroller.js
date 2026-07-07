const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Step 1: Check Empty Fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 2: Check Email Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Step 3: Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    newUser.password = undefined;
    //generate the token
    const token = jwt.sign(
  { id: newUser._id, role: newUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
//final response
return res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: newUser,
  token,
});


   
    // Step 5: Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
//-------------login--------//
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //empty check//
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check user exists/
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
       // ⭐ STEP 4: Password Compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
     // ⭐ STEP 5: Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;
      // ⭐ FINAL RESPONSE
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });



  }

};

