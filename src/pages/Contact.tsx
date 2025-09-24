export default function Contact() {
  return (
    <section className="container-base py-10">
      <h1 className="section-title">Contact</h1>
      <form className="mt-6 max-w-xl space-y-3">
        <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Name" />
        <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Message" rows={4} />
        <button className="btn-primary" type="submit">Send</button>
      </form>
    </section>
  )
}
