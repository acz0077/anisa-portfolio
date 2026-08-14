import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { completeOnboarding } from "@/actions/onboarding";
import styles from "./onboarding.module.css";

type OnboardingPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/register");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    include: { profile: true },
  });

  if (!user) {
    redirect("/register?error=account-not-found");
  }

  if (user.registrationCompleted && user.profile) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;

  return (
    <main className={styles.page}>
      <a className={`brand ${styles.brand}`} href="/" aria-label="Back to homepage">
        AZ<span>.</span>
      </a>

      <section className={styles.shell}>
        <aside className={styles.intro}>
          <p className="eyebrow">Step 2 of 2</p>
          <h1>Complete your profile.</h1>
          <p>
            Data ini akan menjadi identitas utama yang tampil di dashboard dan nantinya
            dapat digunakan untuk mengisi konten portofolio secara dinamis.
          </p>

          <div className={styles.accountCard}>
            <div className={styles.avatar}>
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="Google profile" />
              ) : (
                <span>{(session.user.name ?? "A").slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div>
              <strong>{session.user.name ?? "Anisa Chuzaimatuz Zahro"}</strong>
              <p>{session.user.email}</p>
            </div>
          </div>
        </aside>

        <form className={styles.formCard} action={completeOnboarding}>
          <div className={styles.formHeader}>
            <div>
              <p className={styles.stepLabel}>Personal information</p>
              <h2>Tell people about you.</h2>
            </div>
            <span className={styles.badge}>Google connected ✓</span>
          </div>

          {error === "invalid-profile" ? (
            <div className={styles.errorBox}>
              Nama, umur, dan universitas wajib diisi dengan data yang valid.
            </div>
          ) : null}

          <div className={styles.gridTwo}>
            <label className={styles.field}>
              <span>Nama lengkap *</span>
              <input
                name="fullName"
                type="text"
                required
                maxLength={100}
                defaultValue={user.profile?.fullName ?? session.user.name ?? "Anisa Chuzaimatuz Zahro"}
                placeholder="Anisa Chuzaimatuz Zahro"
              />
            </label>

            <label className={styles.field}>
              <span>Umur *</span>
              <input
                name="age"
                type="number"
                min={15}
                max={100}
                required
                defaultValue={user.profile?.age ?? 23}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Universitas *</span>
            <input
              name="university"
              type="text"
              required
              maxLength={150}
              defaultValue={user.profile?.university ?? "Universitas Yudharta Pasuruan"}
              placeholder="Universitas Yudharta Pasuruan"
            />
          </label>

          <label className={styles.field}>
            <span>Headline</span>
            <input
              name="headline"
              type="text"
              maxLength={120}
              defaultValue={user.profile?.headline ?? "Mahasiswa & Digital Creator"}
              placeholder="Contoh: Frontend Developer & UI Enthusiast"
            />
          </label>

          <label className={styles.field}>
            <span>Bio singkat</span>
            <textarea
              name="bio"
              rows={5}
              maxLength={600}
              defaultValue={user.profile?.bio ?? ""}
              placeholder="Ceritakan sedikit tentang diri, minat, pengalaman, dan tujuan profesionalmu."
            />
          </label>

          <div className={styles.gridTwo}>
            <label className={styles.field}>
              <span>Lokasi</span>
              <input
                name="location"
                type="text"
                maxLength={100}
                defaultValue={user.profile?.location ?? "Pasuruan, Jawa Timur"}
                placeholder="Pasuruan, Jawa Timur"
              />
            </label>

            <label className={styles.field}>
              <span>GitHub</span>
              <input
                name="github"
                type="url"
                defaultValue={user.profile?.github ?? "https://github.com/acz0077"}
                placeholder="https://github.com/username"
              />
            </label>
          </div>

          <div className={styles.gridTwo}>
            <label className={styles.field}>
              <span>LinkedIn</span>
              <input
                name="linkedin"
                type="url"
                defaultValue={user.profile?.linkedin ?? ""}
                placeholder="https://linkedin.com/in/..."
              />
            </label>

            <label className={styles.field}>
              <span>Instagram</span>
              <input
                name="instagram"
                type="url"
                defaultValue={user.profile?.instagram ?? ""}
                placeholder="https://instagram.com/..."
              />
            </label>
          </div>

          <div className={styles.actions}>
            <p>* Wajib diisi sebelum masuk dashboard.</p>
            <button type="submit">Save & continue →</button>
          </div>
        </form>
      </section>
    </main>
  );
}
