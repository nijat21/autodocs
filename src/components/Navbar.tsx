import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { Ghost } from "lucide-react";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          autodocs
        </Link>
      </div>
      <div className="flex-none gap-2">
        {isLoggedIn() ? (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user && user.imgUrl ? (
                    <img alt="User's profile photo" src={user.imgUrl} />
                  ) : (
                    <div className="h-full flex justify-center items-center">
                      <Ghost size={34} />
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">wip</span>
                  </a>
                </li>
                <li>
                  <a className="justify-between">
                    Settings
                    <span className="badge">wip</span>
                  </a>
                </li>
                <li onClick={() => logout()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div tabIndex={0} className="flex gap-1">
            <Link to={"/login"} className="btn w-24">
              Log in
            </Link>
            <Link to={"/signup"} className="btn btn-secondary w-24">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
