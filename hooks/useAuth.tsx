import {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  AuthError,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  setError: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  setError: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoading(false);
    });
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error: AuthError) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error: AuthError) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error: AuthError) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const memoizedValue = useMemo(
    () => ({ user, signUp, signIn, logout, loading, error, setError }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
