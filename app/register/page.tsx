export default function RegisterPage() {
  return (
    <main className="auth-page">
      <a className="brand auth-brand" href="/">
        AZ<span>.</span>
      </a>
      <section className="auth-card">
        <p className="eyebrow">First-time setup</p>
        <h1>Create portfolio access.</h1>
        <p>
          Registrasi dengan akun Google akan dihubungkan pada tahap autentikasi.
          Setelah registrasi berhasil, pemilik portofolio akan diarahkan untuk
          melengkapi profil sebelum masuk ke dashboard.
        </p>
        <button className="google-button" type="button" disabled>
          <span className="google-mark">G</span>
          Register with Google
        </button>
        <a className="auth-back" href="/login">
          Already registered? Login →
        </a>
      </section>
    </main>
  );
}
