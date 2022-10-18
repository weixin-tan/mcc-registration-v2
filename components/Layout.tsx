import React, { ReactNode, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { AuthContext } from "./AuthWrapper";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const { role } = useContext(AuthContext);
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/teacher/signup">
            <a>Sign Up</a>
          </Link>{" "}
          |{" "}
          <Link href="/teacher/signin">
            <a>Sign In</a>
          </Link>{" "}
          {role ? `| ${role}` : ""}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I&apos;m here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
