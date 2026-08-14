const projects = [
  {
    number: "01",
    title: "Project Showcase",
    description:
      "Tempat untuk menampilkan project utama, studi kasus, atau karya terbaik yang pernah dikerjakan.",
    status: "Coming soon",
  },
  {
    number: "02",
    title: "Academic Project",
    description:
      "Ruang untuk menampilkan project akademik, penelitian, atau tugas yang paling representatif.",
    status: "Coming soon",
  },
  {
    number: "03",
    title: "Personal Project",
    description:
      "Tempat untuk project personal yang menunjukkan minat, proses belajar, dan kemampuan eksplorasi.",
    status: "Coming soon",
  },
];

const strengths = [
  "Continuous Learning",
  "Problem Solving",
  "Team Collaboration",
  "Digital Exploration",
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Kembali ke beranda">
          AZ<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Navigasi utama">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="/login">
          Login
        </a>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Personal Portfolio · 2026</p>
          <h1>
            Anisa
            <br />
            Chuzaimatuz <span>Zahro.</span>
          </h1>
          <p className="hero-description">
            23 tahun · Universitas Yudharta Pasuruan. Portofolio ini menjadi ruang
            untuk memperkenalkan diri, perjalanan belajar, dan karya yang terus
            berkembang.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#about">
              More about me
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Monogram Anisa Chuzaimatuz Zahro">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="portrait-card">
            <div className="portrait-topline">
              <span>Based in Indonesia</span>
              <span>23 y.o.</span>
            </div>
            <div className="monogram">AZ</div>
            <div className="portrait-caption">
              <p>Student</p>
              <strong>Universitas Yudharta Pasuruan</strong>
            </div>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <div />
          <span>PORTFOLIO</span>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-label">
          <span>02</span>
          <p>About me</p>
        </div>

        <div className="about-grid">
          <div>
            <p className="kicker">Hello, I&apos;m Anisa.</p>
            <h2>
              Belajar, berkembang,
              <br />
              dan membangun karya yang <em>bermakna.</em>
            </h2>
          </div>

          <div className="about-copy">
            <p>
              Saya Anisa Chuzaimatuz Zahro, berusia 23 tahun dan sedang menempuh
              perjalanan akademik di Universitas Yudharta Pasuruan. Saya tertarik
              pada proses belajar yang memberi ruang untuk bereksperimen,
              memecahkan masalah, dan menghasilkan sesuatu yang dapat digunakan
              dengan baik.
            </p>
            <p>
              Website ini akan terus diperbarui seiring bertambahnya pengalaman,
              project, dan kemampuan baru.
            </p>
          </div>
        </div>

        <div className="strength-grid">
          {strengths.map((strength, index) => (
            <article className="strength-card" key={strength}>
              <span>0{index + 1}</span>
              <h3>{strength}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <div className="section-heading-row">
          <div className="section-label light">
            <span>03</span>
            <p>Selected projects</p>
          </div>
          <p className="section-note">
            Project asli dapat ditambahkan nanti melalui dashboard portofolio.
          </p>
        </div>

        <div className="projects-heading">
          <h2>Work in progress.</h2>
          <p>
            Tiga slot awal sudah disiapkan agar karya Anisa bisa langsung masuk
            tanpa perlu mengubah struktur landing page.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.number}>
              <span className="project-number">{project.number}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="project-status">{project.status}</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="education section-shell" id="education">
        <div className="section-label">
          <span>04</span>
          <p>Education</p>
        </div>

        <div className="education-card">
          <div className="education-year">Present</div>
          <div>
            <p className="kicker">Higher Education</p>
            <h2>Universitas Yudharta Pasuruan</h2>
            <p>
              Detail program studi, pencapaian akademik, organisasi, dan aktivitas
              kampus dapat ditambahkan setelah data profil dilengkapi.
            </p>
          </div>
          <div className="education-mark">UY</div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Let&apos;s connect</p>
          <h2>
            Have an idea?
            <br />
            Let&apos;s make it <span>happen.</span>
          </h2>
          <p>
            Lihat aktivitas dan project terbaru melalui profil GitHub Anisa.
          </p>
        </div>

        <div className="contact-actions">
          <a
            className="button button-light"
            href="https://github.com/acz0077"
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub
            <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="/register">
            Portfolio owner? Register with Google →
          </a>
        </div>
      </section>

      <footer className="footer section-shell">
        <a className="brand footer-brand" href="#home">
          AZ<span>.</span>
        </a>
        <p>© 2026 Anisa Chuzaimatuz Zahro</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
