import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Alert from "@mui/material/Alert";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, error, setError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col
    bg-black md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://browsecat.net/sites/default/files/netflix-background-128505-385456-9916359.png"
        layout="fill"
        objectFit="cover"
        className="-z-10 !hidden opacity-60 sm:!inline"
      />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
        md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <p className="text-red-500 italic m-0">
            WARNING: This isn't the real Netflix site. Don't use your real
            Netflix credentials.
          </p>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className={`input ${
                errors.password && "border-b-2 border-orange-500"
              }`}
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Password should be at least 6 characters.
              </p>
            )}
          </label>
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
          type="submit"
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
      {error === "Firebase: Error (auth/user-not-found)." && (
        <Alert
          className="w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute !p-3 lg:w-1/3"
          severity="error"
          onClose={() => setError(null)}
        >
          The email adress that you've entered doesn't match any account.
        </Alert>
      )}
      {error === "Firebase: Error (auth/wrong-password)." && (
        <Alert
          className="w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute !p-3 lg:w-1/3"
          severity="error"
          onClose={() => setError(null)}
        >
          Incorrect password.
        </Alert>
      )}
    </div>
  );
}

export default Login;
