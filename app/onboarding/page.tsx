import { redirect } from "next/navigation";
import { auth } from "@/auth";
import styles from "../auth.module.css";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/register");
  }

  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/" aria-label="Back to homepage">
        AZ<span>.</span>
      </a>

      <section className={styles.card}>
        <p className="eyebrow">Registration successful</p>
        <h1>Welcome, {session.user.name ?? "Anisa"}.</h1>
        <p>
          Akun Google berhasil terhubung dan data registrasi sudah tersimpan.
          Tahap berikutnya adalah melengkapi profil sebelum masuk ke dashboard.
        </p>

        <div className={styles.securityNote}>
          <span>✓</span>
          <p>
            Signed in as <strong>{session.user.email}</strong>
          </p>
        </div>

        <a className={styles.back} href="/">
          ← Back to portfolio
        </a>
      </section>
    </main>
  );
}
