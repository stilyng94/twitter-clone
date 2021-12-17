import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import { useSession, getProviders, getSession } from "next-auth/react";
import Login from "../components/Login";

const Home = ({ providers }) => {
  const { data: session } = useSession();

  return !session ? (
    <Login providers={providers} />
  ) : (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>{session.data}</h1>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  const session = await getSession(ctx);
  return { props: { providers, session } };
}
