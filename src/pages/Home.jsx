import Banner from "../assets/Img/banner.webp";
const Home = () => {
  return (
    <main className="home">
      <img className="banner" src={Banner} alt="home banner" />
      <h1>Bienvenue dans l'univers Marvel</h1>
    </main>
  );
};

export default Home;
