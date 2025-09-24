import Hero from '../components/Hero'
// Home is kept minimal like the preview: Hero + Features
import FeatureCard from '../components/FeatureCard'
// Placeholder data retained for later use if needed

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Features */}
      <section className="container-base pb-6 -mt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard icon="🎯" title="Smart Assessment" desc="Comprehensive personality and skill evaluation." />
          <FeatureCard icon="🏫" title="College Finder" desc="Discover the best colleges for your career goals." />
          <FeatureCard icon="🚀" title="Career roadmap" desc="Personalized guidance for your journey ahead." />
        </div>
      </section>
    </div>
  )
}
