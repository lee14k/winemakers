
const firebase = import('firebase/app');
import('firebase/storage');
import('firebase/firestore');


// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbVNAxcjwqyFybOLMfEcgWjLXlGqSCt-k",
  authDomain: "vintnerspress.firebaseapp.com",
  projectId: "vintnerspress",
  storageBucket: "vintnerspress.appspot.com",
  messagingSenderId: "342226771832",
  appId: "1:342226771832:web:37a400886bf7f6be87f28d",
  measurementId: "G-RFCVYWND7T"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const storage = getStorage(app);
const db = getFirestore(app);

const PDF_DIRECTORY = '/Users/kaileehamre/Desktop/newsletters';  // Adjust to your PDFs' directory

fs.readdir(PDF_DIRECTORY, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    for (const file of files) {
        const filePath = path.join(PDF_DIRECTORY, file);
        if (path.extname(file) === '.pdf') {
            try {
                const fileData = fs.readFileSync(filePath);
                
                // Upload PDF to Firebase Storage
               const storageRef = ref(storage, `pdfs/${file}`);
const uploadSnapshot = await uploadBytesResumable(storageRef, fileData);
const downloadURL = await getDownloadURL(storageRef);

                
                // Extract text from the PDF
                const data = await pdfParse(fileData);
                
                // Store metadata in Firestore
           await addDoc(collection(db, 'newsletter'), {
    name: file,
    url: downloadURL,
    text: data.text
});


                console.log(`Uploaded and indexed ${file}`);

            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }
    }
});
