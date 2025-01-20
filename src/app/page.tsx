import Counters from "@/components/layouts/FrontPage/Counters";
import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/FrontPage/Hero";
import HowItWorks from "@/components/layouts/FrontPage/HowItWorks";
import MainFooter from "@/components/layouts/FrontPage/MainFooter";
import QuestAnswers from "@/components/layouts/FrontPage/QuestAnswers";
import RieltorsSlides from "@/components/layouts/FrontPage/RieltorsSlides";
import UserVariants from "@/components/layouts/FrontPage/UserVariants";



const Home = () => {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Counters />
      <UserVariants />
      <RieltorsSlides />
      <QuestAnswers />
      <MainFooter />
    </main>
  )
};

export default Home;