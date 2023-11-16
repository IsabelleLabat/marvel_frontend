import Logo from "../assets/Img/logo_marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="items-header">
        <div>
          <img className="logo" src={Logo} alt="logo" />
        </div>
        <div>
          <Link className="nav" to={"/comics"}>
            COMICS
          </Link>
          <Link className="nav" to={"/characters"}>
            CHARACTERS
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
