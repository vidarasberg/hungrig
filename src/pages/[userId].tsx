import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UserPage() {
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useUser();

  if (typeof userId !== "string") return null;

  const showCreateRecipe = user?.id === userId;

  return (
    <p className="flex flex-wrap justify-evenly gap-4">
      <Recipes userId={userId} />
      {showCreateRecipe && <CreateRecipeWizard />}
    </p>
  );
}

const Recipes = ({ userId }: { userId: string }) => {
  const { data } = api.recipes.getAllByUserId.useQuery({ userId: userId });
  const { user } = useUser();
  const { data: username } = api.users.getAllByUserId.useQuery({
    userId: userId,
  });

  if (!username) return <div>Laddar...</div>;
  const header = user?.id === userId ? "Dina recept" : `${username}'s recept`;

  return (
    <p className="bg-green-900 p-4">
      <h2>{header}</h2>
      {data?.map((x) => (
        <div key={x.id}>
          <a href={x.link} target="_blank">
            {x.name}
          </a>
        </div>
      ))}
    </p>
  );
};

const CreateRecipeWizard = () => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { mutate } = api.recipes.create.useMutation();
  if (!user) return null;

  return (
    <p className="flex flex-col bg-green-900 p-4">
      <h2>Lägg till nytt recept</h2>
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
    </p>
  );
};
