import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import BookSection from "@/components/home/BookSection";
import JourneySection from "@/components/home/JourneySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection from "@/components/home/AboutSection";
import HomeFooter from "@/components/home/HomeFooter";
import { getHomepageContent } from "@/lib/homepage";

export const metadata: Metadata = {
  title: "Darwin Garg | When Gods Must Return",
  description:
    "Author Darwin Garg writes at the meeting of ancient stories and modern chaos.",
};

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <HeroSection content={content.author} />
        <BookSection content={content.book} />
        <JourneySection />
        <TestimonialsSection content={content.readerVoices} />
        <AboutSection content={content.aboutAuthor} />
      </main>
      <HomeFooter content={content.footer} socialLinks={content.socialLinks} />
    </>
  );
}
