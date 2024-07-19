import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    setLoggedIn(false);

    navigate("/");
  };

  return (
    <>
      <div className="w-[200px] bg-black h-svh">
        <div className="text-white p-4">
          <div className="uppercase font-semibold text-2xl">
            Inventory
            <br />
            Management
            <br />
            System
          </div>
          <div>NORTHERN RAILWAYS LOCOMOTIVE WORKSHOP</div>
          <div className="py-8 flex flex-col gap-4 h-full text-black text-center uppercase">
          <Link to="/" className="cursor-pointer hover:bg-neutral-200 rounded-md p-1 bg-white">
              <div>Home</div>
            </Link>
            <Link to="/stock-arrival" className="cursor-pointer rounded-md p-1 bg-white hover:bg-neutral-200">
              <div>Stock Arrival</div>
            </Link>
            <Link to="/stock-consumption" className="cursor-pointer rounded-md p-1 bg-white hover:bg-neutral-200">
              <div>Stock Consumption</div>
            </Link>
            <Link to="/items" className="cursor-pointer hover:bg-neutral-200 rounded-md p-1 bg-white">
              <div>Items</div>
            </Link>
            <Link to="/alerts" className="cursor-pointer hover:bg-neutral-200 rounded-md p-1 bg-white">
              <div>Alerts</div>
            </Link>
            <Link to="/logs" className="cursor-pointer hover:bg-neutral-200 rounded-md p-1 bg-white">
              <div>Logs</div>
            </Link>
            <Link to="/about" className="cursor-pointer hover:bg-neutral-200 rounded-md p-1 bg-white">
              <div>About</div>
            </Link>
            {loggedIn && <div
              className="cursor-pointer rounded-md p-1 bg-white hover:bg-neutral-200"
              onClick={handleLogout}
            >
              Logout
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}