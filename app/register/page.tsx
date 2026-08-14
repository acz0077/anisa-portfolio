import styles from "../auth.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/">
        AZ<span>.</span>
      </a>
      <section className={styles.card}>
        <p className="eyebrow">First-time setup</p>
        <h1>Create portfolio access.</h1>
        <p>
          Registrasi dengan akun Google akan dihubungkan pada tahap autentikasi.
          Setelah registrasi berhasil, pemilik portofolio akan diarahkan untuk
          melengkapi profil sebelum masuk ke dashboard.
        </p>
        <button className={styles.googleButton} type="button" disabled>
          <span className={styles.googleMark}>G</span>
          Register with Google
        </button>
        <a className={styles.back} href="/login">
          Already registered? Login →
        </a>
      </section>
    </main>
  );
}
