export default function AdminPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Administrator Dashboard
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          You are inside the protected admin area. You can build role-based
          management pages here for users, certificates, and other restricted
          actions.
        </p>
      </div>
    </section>
  )
}
