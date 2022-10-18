import Head from "next/head";
import { TeacherSignUpForm } from "../../components/TeacherSignUpForm";

export default function TeacherSignUp() {
  return (
    <div>
      <Head>
        <title>Teacher Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Teacher Sign Up</h1>
        <TeacherSignUpForm />
      </main>
    </div>
  );
}
