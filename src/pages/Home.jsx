import Spiderman from "../assets/Img/spiderman.png";
const Home = () => {
  return (
    <main className="home">
      <div className="fade-in-image">
        <img className="banner" src={Spiderman} alt="home banner" />
      </div>
      <div className="fade-in-text">
        <h1>Welcome in MARVEL UNIVERSE</h1>
      </div>
    </main>
  );
};

export default Home;
