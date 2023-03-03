type Props = {};

const signup = (props: Props) => {
  return (
    <>
      <main className="min-h-screen p-6">
        <h1 className="text-center text-lg">Fake Twitter</h1>
        <label className="block">
          <span className="text-gray-700">User Name</span>
          <input
            type="text"
            className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder=""
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder=""
          />
        </label>
        <button className="w-full bg-sky-400 text-white mt-4 h-12 rounded-md">
          Sign Up
        </button>
      </main>
    </>
  );
};

export default signup;
