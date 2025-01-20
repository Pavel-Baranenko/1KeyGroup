import Counters from "@/components/layouts/FrontPage/Counters";
import HeroBroker from "@/components/layouts/FrontPage/HeroBroker";
import HowItWorks from "@/components/layouts/FrontPage/HowItWorks";
import MainFooter from "@/components/layouts/FrontPage/MainFooter";
import QuestAnswers from "@/components/layouts/FrontPage/QuestAnswers";
import Rieltors from "@/components/layouts/FrontPage/Rieltors";
import RieltorsSlides from "@/components/layouts/FrontPage/RieltorsSlides";
import UserVariants from "@/components/layouts/FrontPage/UserVariants";
import Header from "@/components/layouts/Header";


const Broker = () => {
  return (
    <main>
      <Header broker />
      <HeroBroker />
      <HowItWorks />
      <Counters />
      {/* <Rieltors /> */}
      <UserVariants broker />
      <RieltorsSlides />
      <QuestAnswers />
      <MainFooter />
    </main>
  );
};

export default Broker;