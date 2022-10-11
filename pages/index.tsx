import Head from "next/head";
import { TeacherSignUpForm } from "../components/TeacherSignUpForm";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MCC Registration V2</title>
      </Head>

      <main>
        <Layout title="MCC Registration V2">
          <h1>This is the landing page</h1>
        </Layout>
      </main>
    </div>
  );
}
