import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import styles from "../auth.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "unverified-email":
    "Email Google belum terverifikasi. Gunakan akun Google dengan email yang sudah terverifikasi.",
  AccessDenied:
    "Login ditolak. Pastikan akun Google yang digunakan sudah pernah diregistrasikan.",
};

const infoMessages: Record<string, string> = {
  "already-registered":
    "Akun Google ini sudah terdaftar. Silakan login untuk melanjutkan ke portofolio.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (session?.user?.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
      select: { registrationCompleted: true },
    });

    if (existingUser?.registrationCompleted) {
      redirect("/dashboard");
    }

    if (existingUser) {
      redirect("/onboarding");
    }
  }

  const params = await searchParams;
  const errorMessage = params.error ? errorMessages[params.error] : undefined;
  const infoMessage = params.message ? infoMessages[params.message] : undefined;

  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/" aria-label="Back to homepage">
        AZ<span>.</span>
      </a>

      <section className={styles.card}>
        <p className="eyebrow">Portfolio owner access</p>
        <h1>Welcome back, Anisa.</h1>
        <p>
          Login menggunakan akun Google yang sudah pernah diregistrasikan. Setelah
          autentikasi berhasil, sistem akan mengarahkan akun ke onboarding atau
          dashboard sesuai status profilnya.
        </p>

        {errorMessage ? (
          <div className={styles.errorMessage} role="alert">
            {errorMessage}
          </div>
        ) : null}

        {infoMessage ? (
          <div className={styles.infoMessage} role="status">
            {infoMessage}
          </div>
        ) : null}

        <form
          action={async () => {
            "use server";
            await signIn("google-login", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <button className={styles.googleButton} type="submit">
            <span className={styles.googleMark}>G</span>
            Continue with Google
          </button>
        </form>

        <div className={styles.securityNote}>
          <span>✓</span>
          <p>
            Hanya akun Google yang sudah terdaftar yang dapat masuk. Akun baru harus
            melalui halaman registrasi terlebih dahulu.
          </p>
        </div>

        <a className={styles.back} href="/register">
          New account? Register first →
        </a>
      </section>
    </main>
  );
}
