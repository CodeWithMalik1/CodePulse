import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demoUsers = [
      {
        id: "1",
        email: "student@example.com",
        name: "John Doe",
        role: "student",
        password: "password",
      },
      {
        id: "2",
        email: "instructor@example.com",
        name: "Jane Smith",
        role: "instructor",
        password: "password",
      },
    ];

    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const register = async (email, password, name, role) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ export AuthContext itself (like DataContext does)
export { AuthContext };
