import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc , collection, writeBatch,query,getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDxQNCcX4cq4wWRvimktU1D0ZpRUlns9Bw",
    authDomain: "crown-clothing-e2ca2.firebaseapp.com",
    projectId: "crown-clothing-e2ca2",
    storageBucket: "crown-clothing-e2ca2.appspot.com",
    messagingSenderId: "328277299942",
    appId: "1:328277299942:web:4d5841770f5e03831f6127"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({
    prompt: 'select_account',
});
  
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object)
    })
    await batch.commit();
    
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth , additionalInformation ={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid)
   

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error is created", error.message);
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth,callback)
}