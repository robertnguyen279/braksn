import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDcujY0OT3AwwELtBoW5tBvVBUfoH3-1KY',
  authDomain: 'braksn-cf4a7.firebaseapp.com',
  projectId: 'braksn-cf4a7',
  storageBucket: 'braksn-cf4a7.appspot.com',
  messagingSenderId: '349789507451',
  appId: '1:349789507451:web:2ce3898817e0c108d4f7de',
  measurementId: 'G-7Y90S2H20L',
};

firebase.default.initializeApp(firebaseConfig);

const database = firebase.default.database();
const firestore = firebase.default.firestore();

export { firestore, database as default };
