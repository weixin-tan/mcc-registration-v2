import { GetServerSideProps } from "next";
import { authUser, UserJwt } from "../../lib/authUser";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.cookies.mccToken);
  const user = authUser(req.cookies.mccToken);
  if (!user) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return {
    props: { user: user },
  };
};

interface Props {
  user: UserJwt;
}

const TeacherPage = ({ user }: Props) => {
  return (
    <>
      <h1>Welcome to Teacher only page!</h1>
      <p>You are {user.id}</p>
      <p>Your role is {user.role}</p>
    </>
  );
};

export default TeacherPage;
