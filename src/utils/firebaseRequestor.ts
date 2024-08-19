import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
  arrayUnion,
  and,
} from "firebase/firestore";
import firebase from "@/plugins/firebase";
import { getAuth } from "firebase/auth";
import { TimeTrackingPayload } from "@/store/types/types";

const db = getFirestore(firebase);
const auth = getAuth();

export const fetchItems = async <T>(collectionName: string): Promise<T[]> => {
  const collectionFunction = collection(db, collectionName);
  const whereFunction = where("uid", "==", auth.currentUser?.uid);
  const querySnapshot = await getDocs(query(collectionFunction, whereFunction));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

export const fetchTimeTrackingForUserByDate = async <T>(
  payload: TimeTrackingPayload,
): Promise<T[]> => {
  const { month, year, userId } = payload;
  const lastDay = new Date(new Date(year, month, 1).getTime() - 1).getDate();
  const collectionFunction = query(
    collection(db, "users", userId, "time-tracking"),
  );
  const whereFromFunction = where("date", ">=", new Date(year, month - 1, 1));
  const whereToFunction = where(
    "date",
    "<=",
    new Date(year, month - 1, lastDay),
  );
  const querySnapshot = await getDocs(
    query(collectionFunction, and(whereFromFunction, whereToFunction)),
  );
  return querySnapshot.docs.map((queryDoc) => ({
    id: queryDoc.id,
    ...queryDoc.data(),
  })) as T[];
};

export const fetchItemById = async <T>(
  collectionName: string,
  id: string,
): Promise<T> => {
  const querySnapshot = await getDoc(doc(db, collectionName, id));

  return {
    id: querySnapshot.id,
    ...querySnapshot.data(),
  } as T;
};

export const postItem = async <T>(
  collectionName: string,
  data: T,
): Promise<string> => {
  const querySnapshot = await addDoc(collection(db, collectionName), {
    ...data,
    uid: auth.currentUser?.uid,
  });

  return querySnapshot.id;
};

export const updateItem = {
  arrayUnion: async (
    collectionName: string,
    documentId: string,
    field: string,
    values: unknown[],
  ) => {
    await updateDoc(doc(db, collectionName, documentId), {
      [field]: arrayUnion(...values),
    });
  },
  updateDoc: async (
    collectionName: string,
    documentId: string,
    payload: { [key: string]: any },
  ) => {
    return await updateDoc(doc(db, collectionName, documentId), payload);
  },
};

export const deleteItem = async (
  collectionName: string,
  documentId: string,
) => {
  return await deleteDoc(doc(db, collectionName, documentId));
};

export const checkIsItemExists = async (
  collectionName: string,
  documentId: string,
) => {
  const querySnapshot = await getDoc(doc(db, collectionName, documentId));
  return querySnapshot.exists();
};

export const createUser = async (
  collectionName: string,
  userId: string,
  data: unknown,
) => {
  return await setDoc(doc(db, collectionName, userId), data);
};
