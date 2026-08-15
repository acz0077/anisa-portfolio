import { signIn } from "@/auth";
import styles from "../auth.module.css";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "unverified-email":
    "Email Google belum terverifikasi. Gunakan akun Google dengan email yang sudah terverifikasi.",
  "not-registered":
    "Akun Google ini belum terdaftar. Silakan registrasi terlebih dahulu.",
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const errorMessage = params.error ? errorMessages[params.error] : undefined;

  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/" aria-label="Back to homepage">
        AZ<span>.</span>
      </a>

      <section className={styles.card}>
        <p className="eyebrow">First-time registration</p>
        <h1>Create your portfolio access.</h1>
        <p>
          Registrasi menggunakan akun Google. Nama, email, dan foto profil dari
          Google akan digunakan untuk membuat akun portofolio secara aman.
        </p>

        {errorMessage ? (
          <div className={styles.errorMessage} role="alert">
            {errorMessage}
          </div>
        ) : null}

        <form
          action={async () => {
            "use server";
            await signIn("google-register", {
              redirectTo: "/onboarding",
            });
          }}
        >
          <button className={styles.googleButton} type="submit">
            <span className={styles.googleMark}>G</span>
            Register with Google
          </button>
        </form>

        <div className={styles.securityNote}>
          <span>✓</span>
          <p>
            Tidak ada password yang disimpan oleh website. Autentikasi dilakukan
            langsung melalui Google OAuth.
          </p>
        </div>

        <a className={styles.back} href="/login">
          Already registered? Login →
        </a>
      </section>
    </main>
  );
}
