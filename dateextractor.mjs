const firebase = import('firebase/app');
import('firebase/storage');
import('firebase/firestore');import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
// Initialize Firestore (assuming you've already initialized Firebase)
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

const db = getFirestore(app);

async function extractAndUpdateDates() {
    // Fetch all documents from the pdfs collection
    const pdfsCollection = collection(db, 'newsletter');
    const snapshot = await getDocs(pdfsCollection);
    
    // Regular expression to match "month name year" format
    const dateRegex = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s\d{4}\b/i;

    for (const docSnapshot of snapshot.docs) {
        const text = docSnapshot.data().text;

        const match = text.match(dateRegex);
        if (match) {
            const extractedDate = match[0];
            console.log(`Found date "${extractedDate}" in document ID ${docSnapshot.id}`);
            
            // Update the Firestore document with the new field
            await updateDoc(doc(db, 'newsletter', docSnapshot.id), {
                extractedDate: extractedDate
            });
        }
    }
}

extractAndUpdateDates().catch(error => {
    console.error("Error extracting dates:", error);
});
