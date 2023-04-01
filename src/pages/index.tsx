import { api } from "@/utils/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const CreateRecipeWizard = () => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { mutate } = api.recipes.create.useMutation();
  if (!user) return null;

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="link">Link:</label>
      <input
        type="text"
        id="link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={() => mutate({ name: name, link: link })}>Submit</button>
    </div>
  );
};

const Recipes = () => {
  const { data } = api.recipes.getAll.useQuery();
  return (
    <>
      {data?.map((x) => (
        <div key={x.id}>
          <a href={x.link} target="_blank">
            {x.name}
          </a>
        </div>
      ))}
    </>
  );
};

const Home: NextPage = () => {
  const { user } = useUser();

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
        {user && (
          <>
            <CreateRecipeWizard />
            <Recipes />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
