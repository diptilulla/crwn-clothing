import firebase from "firebase/app"; //base import which gives access to firebase and auth
import "firebase/firestore"; //we import this for database
import "firebase/auth"; //for authentication

const config = {
  apiKey: "AIzaSyDAPhEkuZTSG_dHthO99VQtj4TrP8bVVRA",
  authDomain: "crwn-db-c5780.firebaseapp.com",
  projectId: "crwn-db-c5780",
  storageBucket: "crwn-db-c5780.appspot.com",
  messagingSenderId: "375870887538",
  appId: "1:375870887538:web:e9d33985e0b3d547d194eb",
  measurementId: "G-W181DPY6CC",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //async since its an api req, userAuth is the user obj
  if (!userAuth) return; //null i.e. when signs out exit from func

  const userRef = firestore.doc(`users/${userAuth.uid}`); //we are querying the doc i.e. document reference in users collection to check if current user exists in db
  const snapShot = await userRef.get(); //using get we get document snapshot i.e. if such data exists

  //query ref obj is obj that represents current place in db that we are querying firebase always returns obj even if data doesnt exist
  if (!snapShot.exists) {
    //if snapshot doesnt exist i.e. no data in that place we create a new data
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        //create new object in that place if doesn't exist already to store data of new user.
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); //get document at empty string, firebase gives new document reference in this collection, & randomly generate an id (unique key)
    batch.set(newDocRef, obj); //we'll loop through the array and batch these calls of setting value of newDocRef with objs in array
  });

  return await batch.commit(); //fires off our batch call/request, this returns a promise, when commit succeds it'll come back and resolve a void(null) value
};
//we can make one set call at a time, we can't set an array in as collection documents, but each call is individual they fire one at a time, its possible for the code to stop mid-way dure to tech issues and only some of the documents are stored in the firebase, this makes code predictable, so to make code consistent, we make batch write, grping all calls together into 1 big req which fails of is successful

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();

    return {
      //we are returning an object
      routeName: encodeURI(title.toLowerCase()), //encodeURI will get some string and return a string where any char that url cannot handle(space and some symbols) or process it'll convert them into verion that url can actually need
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; //accumulator obj up until the iteration and we set title as prop and set its value eq to collection
    return accumulator; //goes to next iteration of reduce, finally we'll a single object with title of all 5 collection obj are keys and they are eq to collection objects
  }, {}); //initial value of accumulator is an empty obj
};

export const auth = firebase.auth(); //this method from firebase/auth
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //class from auth library
provider.setCustomParameters({ prompt: "select_account" }); //always trigger google pop up whenever we use googleauthprovider for authentication & signin
export const signInWithGoogle = () => auth.signInWithPopup(provider); //takes provider class and google popup

export default firebase;
