import Head from "next/head";
import { TeacherSignInForm } from "../../components/TeacherSignInForm";

export default function TeacherSignIn() {
  return (
    <div>
      <Head>
        <title>Teacher Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Teacher Sign In</h1>
        <TeacherSignInForm />
      </main>
    </div>
  );
}
