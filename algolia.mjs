import algoliasearch from 'algoliasearch';
import admin from 'firebase-admin';
import serviceAccount from './vintnerspress-firebase-adminsdk-8vrnw-322e1177bc.json'  assert {type: "json"};;

// Firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Algolia setup
const ALGOLIA_APP_ID = 'ZNVM513MG7';
const ALGOLIA_ADMIN_KEY = '5f7d1e20122bbf30b08b5285daee2123';
const ALGOLIA_INDEX_NAME = 'pdfs';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

async function getIndexedObjectIDs() {
    try {
        // Search for all indexed items in the Algolia index
        const { hits } = await index.search('', {
            attributesToRetrieve: ['objectID'],
            hitsPerPage: 1000  // Adjust this if you have more documents, or use pagination
        });

        // Extract and return the objectIDs
        return hits.map(hit => hit.objectID);
    } catch (error) {
        console.error("Error fetching indexed IDs:", error);
        return [];  // Return an empty array in case of an error
    }
}
function getByteSizeOfObject(obj) {
    return new Blob([JSON.stringify(obj)]).size;
}

// ... [Your other code above]

const CHUNK_SIZE = 10;

// ... [Your other code above]

async function saveSingleToAlgolia(object) {
    return new Promise((resolve, reject) => {
        index.saveObject(object, (err, content) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(content);
        });
    });
}

// ... [Your other code above]

async function indexData() {
  try {
    console.log("Fetching data from Firestore...");
    const snapshot = await db.collection('pdfs').get();
    console.log(`Fetched ${snapshot.docs.length} documents from Firestore.`);

    let objects = snapshot.docs.map(doc => ({
      objectID: doc.id,
      ...doc.data()
    }));

    const ALGOLIA_MAX_SIZE = 10000;

    for (const obj of objects) {
      if (obj.objectID === "0NnuXMRTxbbbRknGI8Fd") {
        console.warn("Skipping problematic document with objectID 0NnuXMRTxbbbRknGI8Fd...");
        continue;
      }

      while (getByteSizeOfObject(obj) > ALGOLIA_MAX_SIZE && obj.text && obj.text.length > 0) {
        obj.text = obj.text.substring(0, obj.text.length * 0.9);
      }

      if (getByteSizeOfObject(obj) > ALGOLIA_MAX_SIZE) {
        console.warn(`Document with objectID ${obj.objectID} is too large even after truncation. Skipping...`);
        continue;
      }

      console.log(`Indexing document with objectID ${obj.objectID}...`);

      try {
        await saveSingleToAlgolia(obj);
        console.log(`Successfully indexed document with objectID ${obj.objectID}.`);
      } catch (error) {
        console.error(`Failed to index document with objectID ${obj.objectID}. Error: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("Error during the indexing process:", error);
  }
}

indexData()
  .then(() => {
    console.log("Indexing process completed.");
  })
  .catch(error => {
    console.error("Unhandled error in the main process:", error);
  });
