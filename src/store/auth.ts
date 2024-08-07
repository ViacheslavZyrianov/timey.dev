import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type UserInfo,
} from "firebase/auth";
import { UserType } from "@/types/user";
import pick from "@/utils/pick";
import { createUser } from "@/utils/firebaseRequestor";

export default defineStore("auth", () => {
  const isUserLoggedIn = ref(false);
  const user = ref<UserType>({
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  });

  async function googleAuth() {
    try {
      const auth = getAuth();
      auth.useDeviceLanguage();
      const provider = new GoogleAuthProvider();
      const signInResult = await signInWithPopup(auth, provider);
      const user: UserInfo = signInResult.user;
      const userData = pick<UserInfo, UserType>(signInResult.user, [
        "uid",
        "displayName",
        "email",
        "photoURL",
      ]);
      await createUser("users", user.uid, userData);
      setUser(userData);
    } catch (err: unknown) {
      console.error("googleAuth error", err);
    }
  }

  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err: unknown) {
      console.error("logout err", err);
    }
  }

  function setUser(payload: UserType) {
    user.value = {
      uid: payload.uid,
      displayName: payload.displayName,
      email: payload.email,
      photoURL: payload.photoURL,
    };
  }

  return { user, isUserLoggedIn, googleAuth, logout, setUser };
});
