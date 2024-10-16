import "./_home.scss";
import Hero from "../../Components/Hero/index.jsx";
import Features from "../../Components/Features/index.jsx";
import Header from "../../Components/Header/index.jsx";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
    </div>
  );
}

export default Home;
