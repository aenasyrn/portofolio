/**
 * Portfolio JavaScript - Modern Editorial Minimalism (Cream & Blue)
 * Mahasiswa Sistem Informasi Telkom University Kampus Jakarta
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initBackToTop();
  initCurrentYear();
  initCopyEmail();
  initProjectModals();
});

/* ================= 1. NAVBAR SCROLL EFFECT ================= */
function initNavbar() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ================= 2. MOBILE MENU DRAWER ================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    drawer.setAttribute('aria-hidden', String(!isOpen));
    drawer.classList.toggle('open', isOpen);
  };

  toggleBtn.addEventListener('click', () => {
    toggleMenu();
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* ================= 3. ACTIVE NAV LINK HIGHLIGHT (SCROLLSPY) ================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (sections.length === 0) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================= 4. SCROLL REVEAL ANIMATIONS ================= */
function initScrollReveal() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ================= 5. BACK TO TOP BUTTON ================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ================= 6. DYNAMIC CURRENT YEAR ================= */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ================= 7. COPY EMAIL TO CLIPBOARD ================= */
function initCopyEmail() {
  const copyBtn = document.getElementById('btn-copy-email');
  const emailSpan = document.getElementById('email-address-text');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn || !emailSpan) return;

  copyBtn.addEventListener('click', async () => {
    const rawEmail = emailSpan.textContent.trim();
    
    // Check if user still has placeholder text
    if (rawEmail === '[Tambahkan alamat email]') {
      showToast('Placeholder email terdeteksi. Silakan edit alamat email Anda di index.html.');
      return;
    }

    try {
      await navigator.clipboard.writeText(rawEmail);
      if (tooltip) {
        tooltip.textContent = 'Tersalin!';
        tooltip.classList.add('active');
        setTimeout(() => {
          tooltip.classList.remove('active');
          tooltip.textContent = 'Salin';
        }, 2200);
      }
      showToast(`Email ${rawEmail} berhasil disalin ke clipboard!`);
    } catch (err) {
      // Fallback
      showToast('Gagal menyalin email otomatis.');
    }
  });

  const emailCard = document.getElementById('contact-email-container');
  if (emailCard) {
    emailCard.addEventListener('click', (e) => {
      if (e.target.closest('#btn-copy-email')) return;
      copyBtn.click();
    });
    emailCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyBtn.click();
      }
    });
  }
}

/* Toast Message Utility */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* ================= 8. PROJECT DETAIL MODAL DATA & HANDLERS ================= */
const projectsDatabase = {
  'logistikku': {
    number: '01',
    role: 'Web Developer Intern',
    title: 'Website Logistikku',
    org: 'PT Pegadaian Kantor Wilayah VIII Jakarta 1',
    focus: 'Digitalisasi Operasional Logistik & Inventaris',
    overview: 'Pengalaman magang dalam proyek pengembangan Website Logistikku untuk mendukung digitalisasi proses logistik pada PT Pegadaian Kantor Wilayah VIII Jakarta 1. Proyek ini memodernisasi pelacakan aset dan sirkulasi logistik kantor wilayah menjadi sistem terpusat yang transparan.',
    scope: [
      'Analisis alur logistik eksisting di lingkungan kantor wilayah PT Pegadaian.',
      'Pengembangan modul antarmuka dan logika backend menggunakan kerangka kerja web.',
      'Perancangan struktur data inventaris, alur persetujuan (approval flow), dan pencatatan riwayat distribusi.',
      'Pengujian fungsionalitas sistem bersama tim internal untuk memastikan keandalan data logistik.'
    ],
    tech: ['Web Development', 'Logistics Management System', 'Database Design', 'Process Digitalization']
  },
  'sipedang': {
    number: '02',
    role: 'System Analyst & Web Developer',
    title: 'SIPEDANG (Sistem Informasi Pendakian Gunung Gede)',
    org: 'Proyek Analisis & Pengembangan Sistem Informasi',
    focus: 'Manajemen Data & Registrasi Pendakian Gunung Gede',
    overview: 'Proyek analisis sistem dan pengembangan sistem informasi komprehensif terkait kegiatan pendakian di Gunung Gede. Berfokus pada kemudahan pendaftaran pendaki, verifikasi kuota, dan monitoring jalur secara digital.',
    scope: [
      'Pemodelan proses bisnis pendaftaran dan perizinan pendakian (Flowchart & DFD/UML).',
      'Pengumpulan kebutuhan fungsional pendaki dan pihak pengelola pos pendakian.',
      'Perancangan database relasional untuk kuota pendakian, data peserta, dan jadwal operasional.',
      'Implementasi antarmuka portal yang responsif untuk kemudahan akses via smartphone.'
    ],
    tech: ['System Analysis', 'Requirements Gathering', 'Web Development', 'Database Design (MySQL)']
  },
  'siap-sk': {
    number: '03',
    role: 'Web Developer',
    title: 'SIAP SK (Sistem Informasi Administrasi Permohonan Surat Keterangan)',
    org: 'Proyek Digitalisasi Pelayanan Administrasi Publik',
    focus: 'Automasi Alur Permohonan & Pengesahan Surat Keterangan',
    overview: 'Pengembangan sistem informasi terpadu untuk mendukung digitalisasi proses administrasi permohonan surat keterangan. Sistem memangkas birokrasi manual kertas menjadi pengajuan daring yang efisien dan dapat dilacak.',
    scope: [
      'Transformasi formulir permohonan konvensional ke dalam validasi form web dinamis.',
      'Implementasi status tracking sehingga pemohon dapat memantau progres surat secara real-time.',
      'Pengelolaan basis data arsip surat keterangan terdigitalisasi dengan enkripsi identitas dasar.',
      'Desain antarmuka yang ramah pengguna bagi staf administrator dan pemohon.'
    ],
    tech: ['Web Development', 'Workflow Automation', 'Administrative Portal', 'PHP / Database']
  },
  'desa-cikasungka': {
    number: '04',
    role: 'Web Developer',
    title: 'Website Profil Desa Cikasungka',
    org: 'Proyek Pemberdayaan & Publikasi Informasi Digital Desa',
    focus: 'Portal Transparansi Informasi & Layanan Publik Desa',
    overview: 'Pengembangan website profil desa untuk menyajikan informasi desa secara digital, mencakup struktur pemerintahan, program kerja, potensi ekonomi desa, serta transparansi kegiatan masyarakat.',
    scope: [
      'Perancangan arsitektur informasi website agar mudah diakses oleh warga dari berbagai rentang usia.',
      'Pengembangan fitur berita desa, galeri kegiatan kemasyarakatan, dan direktori layanan warga.',
      'Optimalisasi tampilan website agar cepat dimuat di koneksi internet mobile.',
      'Penyusunan panduan pengelolaan konten untuk operator desa setempat.'
    ],
    tech: ['Web Development', 'UI/UX Design', 'Information Architecture', 'Public Portal']
  },
  'clean-energy': {
    number: '05',
    role: 'System Analyst & Web Developer',
    title: 'Clean Energy Hub',
    org: 'Platform Informasi & Riset Keberlanjutan Energi Bersih',
    focus: 'Edukasi, Visualisasi Data & Sentralisasi Informasi Energi Terbarukan',
    overview: 'Proyek analisis sistem dan pengembangan platform website yang berfokus pada penyajian informasi, edukasi, dan riset seputar transisi energi bersih dan solusi keberlanjutan masa depan.',
    scope: [
      'Analisis kebutuhan audiens terhadap literatur dan data statistik pemanfaatan energi terbarukan.',
      'Perancangan sistem navigasi berbasis topik (Solar, Hydro, Biomassa, Konservasi).',
      'Pengembangan antarmuka bersih, minimalis, dan kaya data tanpa membebani performa perangkat.',
      'Penyediaan repositori artikel, infografis, dan studi kasus sistem energi.'
    ],
    tech: ['System Analysis', 'Web Development', 'Data Presentation', 'Sustainable Tech']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const triggerBtns = document.querySelectorAll('[data-project-trigger]');

  if (!modalBackdrop || !modalBody || !closeBtn) return;

  const openModal = (projectId) => {
    const data = projectsDatabase[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-num-badge">PROJECT ${data.number}</span>
        <h3 class="modal-title" id="modal-title">${data.title}</h3>
        <span class="modal-role">${data.role}</span>
      </div>

      <div class="modal-meta-list">
        <div class="modal-meta-item">
          <span class="label">Organisasi / Proyek</span>
          <span class="val">${data.org}</span>
        </div>
        <div class="modal-meta-item">
          <span class="label">Fokus Solusi</span>
          <span class="val">${data.focus}</span>
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-section-title">Ringkasan Proyek</h4>
        <p class="modal-text">${data.overview}</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-section-title">Ruang Lingkup &amp; Kontribusi</h4>
        <ul style="list-style: disc; padding-left: 1.25rem; font-size: 0.93rem; color: var(--text-charcoal); line-height: 1.7;">
          ${data.scope.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section-block" style="margin-bottom: 0;">
        <h4 class="modal-section-title">Kompetensi &amp; Teknologi</h4>
        <div class="project-tags" style="margin-bottom: 0;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-trigger');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}
