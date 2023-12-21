const path = require('path');
const os = require('os');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { admin, db, bucket } = require('../config/firebaseConfig');

function generatePublicFileURL(bucketName, filePath) {
  return `https://storage.googleapis.com/${bucketName}/${filePath}`;
}

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
    res.status(500).send({ message: error.message });
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
    res.status(500).send({ message: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const file = req.file;

    // Create a unique file name
    const fileName = `${req.user.uid}_${Date.now()}_${file.originalname}`;
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: file.mimetype,
    };

    // Move the file to the temporary directory
    fs.renameSync(file.path, tempFilePath);

    // Upload file to Firebase Storage
    const uploadedFile = await bucket.upload(tempFilePath, {
      destination: `profile-images/${fileName}`,
      metadata: metadata,
    });

    // Get the public URL of the file
    const fileUrl = generatePublicFileURL(
      uploadedFile[0].metadata.bucket,
      uploadedFile[0].metadata.fullPath
    );

    // Update user's profile in Firestore
    await db.collection('users').doc(req.user.uid).update({
      profileImageUrl: fileUrl,
    });

    res.status(200).send({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
