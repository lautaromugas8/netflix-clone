import Head from "next/head";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

function Account() {
  const { logout, loading, user } = useAuth();

  if (loading) return null;

  return (
    <div>
      <Head>
        <title>Account - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center justify-between border-b border-gray-600">
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          className="rounded"
          width={24}
          height={24}
        />
      </header>
      <main className="mx-auto max-w-6xl mt-24 px-5 pt-12 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <p className="text-base font-semibold">
            Member since: {user?.metadata.creationTime}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Details</h4>
          <p>{user?.email}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;
