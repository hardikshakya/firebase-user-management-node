const jwt = require('jsonwebtoken');

const { admin, db } = require('../config/firebaseConfig');

exports.registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Firebase authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Add user details to Firestore Database
    await db.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
    });

    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use Firebase Auth to verify the user's credentials
    const userRecord = await admin.auth().getUserByEmail(email);

    // TODO: different approach for user authentication

    // Generate a JWT token
    const token = jwt.sign({ uid: userRecord.uid }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).send({
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
