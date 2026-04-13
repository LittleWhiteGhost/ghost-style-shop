import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase';

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт сервисов
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Сервис авторизации
export const AuthService = {
  // Регистрация по email
  async registerWithEmail(email: string, password: string, name: string) {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
  },

  // Вход по email
  async loginWithEmail(email: string, password: string) {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Вход через Google
  async loginWithGoogle() {
    const { signInWithPopup } = await import('firebase/auth');
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  },

  // Выход
  async logout() {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  },

  // Сброс пароля
  async resetPassword(email: string) {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    await sendPasswordResetEmail(auth, email);
  }
};
