import HomeBanner from "./_components/HomeBanner";
import Clients from "./_components/Clients";
import Mission from "./_components/Mission";
import Services from "./_components/Services";
import Reach from "./_components/Reach";
// import Training from "./_components/Training";
import Contacts from "./_components/Contacts";
import Feedback from "./_components/Feedback";
import About from "./_components/About";

function Home() {
  return (
    <>
      <HomeBanner />
      <Clients />
      <Mission />
      <Reach />
      <Contacts />
      <Services />
      {/* <Training /> */}
      <About />
      <Feedback />
    </>
  );
}

export default Home;
