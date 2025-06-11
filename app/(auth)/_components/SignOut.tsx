import { signOut } from "@/auth";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="border rounded-full px-4 py-2 cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
};

export default SignOut;
