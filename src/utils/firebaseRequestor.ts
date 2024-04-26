import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, where, query } from 'firebase/firestore'
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

export const fetchItemById = async <T>(collectionName: string, id: string):Promise<T>=> {
  const querySnapshot = await getDoc(doc(db, collectionName, id))

  return {
    id: querySnapshot.id,
    ...querySnapshot.data()
  } as unknown as T
}

export const postItem = async <T>(collectionName: string, data: T): Promise<string> => {
  const querySnapshot = await addDoc(collection(db, collectionName), {
    ...data,
    uid: auth.currentUser?.uid,
  })

  return querySnapshot.id
}

export const createUser = async (collectionName: string, userId: string, data: unknown) => {
  return await setDoc(doc(db, collectionName, userId), data)
}
