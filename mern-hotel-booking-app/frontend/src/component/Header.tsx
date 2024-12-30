import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedin } = useAppContext();

  const signOut = () => {
    // setCookie("my_token", "mytoken", { path: "/" });
    // console.log("cookies", cookies["my_token"]);
    // console.log(document.cookie);
};

  return (
    <>
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white tracking-tight">
            <Link to={"/"}>Home.com</Link>
          </span>
          {isLoggedin ? (
            <div className="flex space-x-4">
              <Link
                to={"/my-bookings"}
                className="px-4 py-2 text-white font-semibold rounded-md"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="px-4 py-2 text-white font-semibold rounded-md"
              >
                My Hotels
              </Link>
              <span
                className="px-4 py-2 bg-gray-50 text-blue-600 font-semibold rounded-md"
                onClick={() => signOut()}
              >
                Sing Out
              </span>
            </div>
          ) : (
            <>
              <span className="px-4 py-2 bg-gray-50 text-blue-600 font-semibold rounded-md">
                Sing In
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
