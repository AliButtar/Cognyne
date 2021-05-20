import * as firebase from "firebase";

export const loginRequest = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

// export const registerRequest = (email, password) => {
//   return firebase.auth().createUserWithEmailAndPassword(email, password);
// };

// export const checkAuthorizationState = () => {
//   return firebase.auth.checkAuthorizationState;
// };

// export const signOut = () => {
//   return firebase.auth().signOut;
// };
