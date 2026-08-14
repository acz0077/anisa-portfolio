export default function LoginPage() {
  return (
    <main className="auth-page">
      <a className="brand auth-brand" href="/">
        AZ<span>.</span>
      </a>
      <section className="auth-card">
        <p className="eyebrow">Portfolio owner access</p>
        <h1>Welcome back, Anisa.</h1>
        <p>
          Login dengan akun Google akan diaktifkan pada tahap autentikasi berikutnya.
          Halaman ini sudah disiapkan agar navigasi landing page tidak terputus.
        </p>
        <button className="google-button" type="button" disabled>
          <span className="google-mark">G</span>
          Continue with Google
        </button>
        <a className="auth-back" href="/">
          ← Back to portfolio
        </a>
      </section>
    </main>
  );
}
