// All values come from environment variables (see .env.example). Until they
// are set, `isFirebaseConfigured` is false and the app runs in local demo
// mode (content is stored in this browser only) instead of crashing — and,
// importantly, never downloads the Firebase SDK at all.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

let dbPromise = null;

/** Lazily loads the Firebase SDK and returns the Firestore instance. Only
 * ever called when isFirebaseConfigured is true, so demo-mode visitors
 * never pay for this download. */
export function getDb() {
  if (!isFirebaseConfigured) return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
    ]).then(([{ initializeApp, getApps }, { getFirestore }]) => {
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      return getFirestore(app);
    });
  }
  return dbPromise;
}
