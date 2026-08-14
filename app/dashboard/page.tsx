import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    include: { profile: true },
  });

  if (!user) {
    redirect("/register");
  }

  if (!user.registrationCompleted || !user.profile) {
    redirect("/onboarding");
  }

  const profile = user.profile;

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <a className={`brand ${styles.brand}`} href="/">
          AZ<span>.</span>
        </a>

        <nav className={styles.nav} aria-label="Dashboard navigation">
          <a className={styles.active} href="/dashboard">Overview</a>
          <span>Profile</span>
          <span>Projects</span>
          <span>Skills</span>
          <span>Education</span>
          <span>Experience</span>
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className={styles.logout} type="submit">Logout</button>
        </form>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Portfolio dashboard</p>
            <h1>Welcome back, {profile.fullName.split(" ")[0]}.</h1>
          </div>
          <div className={styles.userChip}>
            <div className={styles.avatar}>
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="Profile" />
              ) : (
                <span>{profile.fullName.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div>
              <strong>{profile.fullName}</strong>
              <span>{user.email}</span>
            </div>
          </div>
        </header>

        <section className={styles.welcomeCard}>
          <div>
            <span className={styles.status}>PROFILE READY</span>
            <h2>Your portfolio workspace is ready.</h2>
            <p>
              Profil utama sudah tersimpan. Tahap selanjutnya kita bisa membuat modul
              Projects, Skills, Education, dan Experience agar seluruh isi landing page
              dapat dikelola dari dashboard tanpa mengubah kode.
            </p>
          </div>
          <div className={styles.bigMark}>AZ</div>
        </section>

        <section className={styles.statsGrid}>
          <article>
            <span>01</span>
            <p>Profile</p>
            <strong>Completed</strong>
          </article>
          <article>
            <span>02</span>
            <p>Projects</p>
            <strong>0 items</strong>
          </article>
          <article>
            <span>03</span>
            <p>Skills</p>
            <strong>0 items</strong>
          </article>
          <article>
            <span>04</span>
            <p>Experience</p>
            <strong>0 items</strong>
          </article>
        </section>

        <section className={styles.profileSection}>
          <div className={styles.sectionTitle}>
            <div>
              <p>Current profile</p>
              <h2>Personal information</h2>
            </div>
            <a href="/onboarding">Edit profile →</a>
          </div>

          <div className={styles.infoGrid}>
            <div>
              <span>Full name</span>
              <strong>{profile.fullName}</strong>
            </div>
            <div>
              <span>Age</span>
              <strong>{profile.age} years</strong>
            </div>
            <div>
              <span>University</span>
              <strong>{profile.university}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{profile.location ?? "Not set"}</strong>
            </div>
            <div className={styles.wideInfo}>
              <span>Headline</span>
              <strong>{profile.headline ?? "Not set"}</strong>
            </div>
            <div className={styles.wideInfo}>
              <span>Bio</span>
              <p>{profile.bio ?? "Bio belum ditambahkan."}</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
