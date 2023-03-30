import { api } from "@/utils/api";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { data } = api.recipes.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Hungrig?</title>
        <meta name="description" content="Samla dina recept" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between bg-green-900">
        <div className="m-3">Hungrig?</div>
        <div className="m-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <main className="flex flex-col items-center p-4">
        {data?.map((x) => (
          <div key={x.id}>
            <a href={x.link} target="_blank">
              {x.name}
            </a>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
