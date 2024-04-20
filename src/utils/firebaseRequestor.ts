import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import firebase from '@/plugins/firebase'
import { getAuth } from 'firebase/auth'

export const fetchCollection = async <T>(collectionName: string):Promise<T[]> => {
  const auth = getAuth()
  const db = getFirestore(firebase)
  const collectionUID = `${collectionName}-${auth.currentUser?.uid}`
  const querySnapshot = await getDocs(collection(db, collectionUID))

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as unknown as T[]
}

export const fetchDocById = async <T>(collectionName: string, id: string):Promise<T>=> {
  const auth = getAuth()
  const db = getFirestore(firebase)
  const collectionUID = `${collectionName}-${auth.currentUser?.uid}`
  const querySnapshot = await getDoc(doc(db, collectionUID, id))

  return {
    id: querySnapshot.id,
    ...querySnapshot.data()
  } as unknown as T
}
