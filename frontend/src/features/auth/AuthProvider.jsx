import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { clearTokens, getAccessToken, setTokens } from "../../lib/api";
import { getCurrentUser, loginDemoUser } from "../../lib/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        if (!getAccessToken()) {
          const tokens = await loginDemoUser();
          setTokens(tokens);
        }

        const currentUser = await getCurrentUser();
        if (!cancelled) {
          setUser(currentUser);
        }
      } catch (error) {
        clearTokens();
        try {
          const tokens = await loginDemoUser();
          setTokens(tokens);
          const currentUser = await getCurrentUser();
          if (!cancelled) {
            setUser(currentUser);
          }
        } catch {
          if (!cancelled) {
            setUser(null);
          }
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
