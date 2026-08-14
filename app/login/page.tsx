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
          Registrasi Google sudah aktif. Login Google akan diaktifkan pada tahap
          berikutnya dan hanya menerima akun yang sudah pernah terdaftar.
        </p>
        <button className={styles.googleButton} type="button" disabled>
          <span className={styles.googleMark}>G</span>
          Continue with Google
        </button>
        <a className={styles.back} href="/register">
          New account? Register first →
        </a>
      </section>
    </main>
  );
}
