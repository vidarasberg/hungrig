import { api } from "@/utils/api";
import { type NextPage } from "next";
import Head from "next/head";

const AllRecipes = () => {
  const { data } = api.recipes.getAll.useQuery();
  return (
    <div className="bg-green-900 p-4">
      <h1>Alla recept</h1>
      {data?.map((x) => (
        <div key={x.id}>
          <a href={x.link} target="_blank">
            {x.name}
          </a>
        </div>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hungrig?</title>
        <meta name="description" content="Samla dina recept" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{<AllRecipes />}</main>
    </>
  );
};

export default Home;
