import styles from "../auth.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/">
        AZ<span>.</span>
      </a>
      <section className={styles.card}>
        <p className="eyebrow">Portfolio owner access</p>
        <h1>Welcome back, Anisa.</h1>
        <p>
          Login dengan akun Google akan diaktifkan pada tahap autentikasi berikutnya.
          Halaman ini sudah disiapkan agar navigasi landing page tidak terputus.
        </p>
        <button className={styles.googleButton} type="button" disabled>
          <span className={styles.googleMark}>G</span>
          Continue with Google
        </button>
        <a className={styles.back} href="/">
          ← Back to portfolio
        </a>
      </section>
    </main>
  );
}
