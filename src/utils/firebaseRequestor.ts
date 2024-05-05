import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc, where, query, arrayUnion } from 'firebase/firestore'
import firebase from '@/plugins/firebase'
import { getAuth } from 'firebase/auth'

const db = getFirestore(firebase)
const auth = getAuth()

export const fetchItems = async <T>(collectionName: string): Promise<T[]> => {
  const collectionFunction = collection(db, collectionName)
  const whereFunction = where('uid', '==', auth.currentUser?.uid)
  const querySnapshot = await getDocs(query(collectionFunction, whereFunction))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as T[]
}

export const fetchSubCollectionItems = async <T>(collectionName: string, documentId: string, subCollectionName: string): Promise<T[]> => {
  const collectionFunction = query(collection(db, collectionName, documentId, subCollectionName))
  const querySnapshot = await getDocs(query(collectionFunction))
  return querySnapshot.docs.map((queryDoc) => ({
    id: queryDoc.id,
    ...queryDoc.data()
  })) as T[]
}

export const fetchItemById = async <T>(collectionName: string, id: string):Promise<T>=> {
  const querySnapshot = await getDoc(doc(db, collectionName, id))

  return {
    id: querySnapshot.id,
    ...querySnapshot.data()
  } as T
}

export const postItem = async <T>(collectionName: string, data: T): Promise<string> => {
  const querySnapshot = await addDoc(collection(db, collectionName), {
    ...data,
    uid: auth.currentUser?.uid,
  })

  return querySnapshot.id
}

export const updateItem  = {
  arrayUnion: async (collectionName: string, documentId: string, field: string, values: unknown[]) => {
     await updateDoc(doc(db, collectionName, documentId), {
      [field]: arrayUnion(...values)
    })
  }
}

export const checkIsItemExists = async (collectionName: string, documentId: string) => {
  const querySnapshot = await getDoc(doc(db, collectionName, documentId))
  return querySnapshot.exists()
}

export const createUser = async (collectionName: string, userId: string, data: unknown) => {
  return await setDoc(doc(db, collectionName, userId), data)
}
