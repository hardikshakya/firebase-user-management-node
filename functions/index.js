const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.logUserActivity = functions.firestore
  .document('users/{userId}')
  .onWrite((change, context) => {
    // Get the userId from the context params
    const userId = context.params.userId;

    // Log the activity
    const activityRef = admin.firestore().collection('user-activity');

    const activity = {
      userId: userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      activity: 'User profile updated or created.',
    };

    // Add the activity log to Firestore
    return activityRef.add(activity);
  });
