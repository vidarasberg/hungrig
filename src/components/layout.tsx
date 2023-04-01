import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main className="ml-auto mr-auto max-w-5xl p-10">{children}</main>
      <Footer />
    </>
  );
}

function Navbar() {
  const { user } = useUser();
  return (
    <header className="flex bg-green-900">
      <div className="ml-auto mr-auto flex max-w-5xl">
        <div className="m-3 font-extrabold">
          <Link href="/">Hungrig?</Link>
        </div>
        <div className="m-3 flex flex-row gap-4">
          {user && <Link href={user?.id}>Din sida</Link>}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-green-900 py-4 text-center text-white">
      Created by Vidar Åsberg
    </footer>
  );
}
