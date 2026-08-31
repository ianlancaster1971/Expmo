// All Firestore-specific code lives here, isolated behind dynamic imports so
// it (and the Firebase SDK) is only ever downloaded when a project is
// actually configured — see EventsContext.jsx.
import { getDb } from "./firebase";
import { seedEvents, seedSiteContent } from "../data/seedData";

async function fs() {
  const [db, mod] = await Promise.all([getDb(), import("firebase/firestore")]);
  return { db, ...mod };
}

export async function seedIfEmpty() {
  const { db, collection, doc, getDocs, setDoc } = await fs();

  const eventsSnap = await getDocs(collection(db, "events"));
  if (eventsSnap.empty) {
    await Promise.all(
      seedEvents.map((event) => setDoc(doc(db, "events", event.id), event)),
    );
  }

  const contentSnap = await getDocs(collection(db, "content"));
  if (contentSnap.empty) {
    await setDoc(doc(db, "content", "home"), seedSiteContent);
  }
}

export async function subscribeEvents(onChange) {
  const { db, collection, onSnapshot } = await fs();
  return onSnapshot(collection(db, "events"), (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function subscribeContent(onChange) {
  const { db, doc, onSnapshot } = await fs();
  return onSnapshot(doc(db, "content", "home"), (snap) => {
    if (snap.exists()) onChange(snap.data());
  });
}

export async function addEventRemote(id, event) {
  const { db, doc, setDoc } = await fs();
  await setDoc(doc(db, "events", id), event);
}

export async function updateEventRemote(id, patch) {
  const { db, doc, updateDoc } = await fs();
  await updateDoc(doc(db, "events", id), patch);
}

export async function deleteEventRemote(id) {
  const { db, doc, deleteDoc } = await fs();
  await deleteDoc(doc(db, "events", id));
}

export async function voteEventRemote(id) {
  const { db, doc, updateDoc, increment } = await fs();
  await updateDoc(doc(db, "events", id), { votes: increment(1) });
}

export async function updateContentRemote(next) {
  const { db, doc, setDoc } = await fs();
  await setDoc(doc(db, "content", "home"), next, { merge: true });
}
