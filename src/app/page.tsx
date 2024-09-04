import ComapniesCarousel from "@/components/custom/ComapniesCarousel";
import Faq from "@/components/custom/Faq";
import AppHeader from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import RecommendedCourseList from "@/components/custom/RecommendedCourseList";
import Testmonial from "@/components/custom/Testmonial";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      <ComapniesCarousel />
      <RecommendedCourseList />
      <div className="max-w-6xl mx-auto py-14">
        <Testmonial />
        <Faq />
      </div>
    </>
  );
}
