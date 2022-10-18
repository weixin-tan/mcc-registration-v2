import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Role } from "@prisma/client";

interface AuthWrapperInterface {
  role: Role | null;
  setRole: Dispatch<SetStateAction<Role>>;
}

export const AuthContext = createContext<AuthWrapperInterface | null>(null);

const AuthWrapper = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
