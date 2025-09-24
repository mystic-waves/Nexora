import ResourceCard from '../components/cards/ResourceCard'
import { featuredResources } from '../placeholderData.ts'
import type { Resource } from '../placeholderData.ts'

export default function Resources() {
  return (
    <section className="container-base py-10">
      <h1 className="section-title">Resources</h1>
      <p className="mt-2 text-slate-600">Articles, videos, and downloadable guides.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredResources.map((r: Resource) => (
          <ResourceCard key={r.title} title={r.title} type={r.type} description={r.description} />
        ))}
      </div>
    </section>
  )
}
