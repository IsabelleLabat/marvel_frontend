import Logo from "../assets/Img/logo_marvel.png";

import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <header>
      <div className="items-header">
        <div>
          <Link to={"/"}>
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </div>
        <div>
          <Link className="nav" to={"/comics"}>
            COMICS
          </Link>
          <Link className="nav" to={"/characters"}>
            CHARACTERS
          </Link>
          <Link className="nav" to={token ? "/favorites" : "/login"}>
            FAVORITES
          </Link>
          {token ? (
            <button
              className="nav"
              onClick={() => {
                // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                handleToken(null);
              }}
            >
              DÉCONNEXION
            </button>
          ) : (
            <>
              <Link className="nav" to={"/signup"}>
                SIGNUP
              </Link>
              <Link className="nav" to={"/login"}>
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
