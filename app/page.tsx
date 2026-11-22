import { Button } from "@/components/ui/button"
import HeroSection from "./components/home/heroSection"
import SebjectSection from "./components/home/sebjectSection"
import ProgressSection from "./components/home/progressSection"
import PricingSection from "./components/home/pricingSection"
import FreeVsProSection from "./components/home/freeVsProSection"
import HowWorkSection from "./components/home/howWorkSection"
import LoveLessonSection from "./components/home/loveLessonSection"
import DynamicFeatured from "./components/home/dynamicFeatured"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
       <HeroSection/>
       <SebjectSection/>
       <ProgressSection/>
       <PricingSection/>
       <FreeVsProSection/>
       <HowWorkSection/>
       <DynamicFeatured/>
       <LoveLessonSection/>
    </div>
  )
}
