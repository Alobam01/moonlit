import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedKittens } from "@/components/home/FeaturedKittens";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturedKittens />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </PublicLayout>
  );
};

export default Index;
