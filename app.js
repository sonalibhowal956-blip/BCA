/**
 * BCA Department Portal - Core Application Controller
 * Handles client-side hash routing, section rendering, filtering,
 * modal dialogs, resource download generation, and mobile navigation.
 */

import { store } from './store.js';
import { globalSearch } from './search.js';
import { adminController } from './admin.js';

class App {
  constructor() {
    this.currentSection = 'home';
    this.notesViewMode = 'cards'; // 'cards' | 'table'
    this.activeSemester = 1;
    this.activeSyllabusSemester = 1;
  }

  init() {
    // 1. Initialize Sub-modules
    globalSearch.init();
    adminController.init();

    // 2. Setup Router & Navigation
    this.setupRouting();
    this.setupMobileMenu();

    // 3. Listen to Data Changes for Auto-Rerender
    store.subscribe('all', () => {
      this.refreshCurrentView();
    });

    // 4. Listen to Global Search Custom Events
    window.addEventListener('search-navigation', (e) => {
      const { action, id, sem, href } = e.detail;
      if (href) {
        window.location.hash = href;
      }
      if (action === 'goto-sem' && sem) {
        this.selectSemester(parseInt(sem, 10));
      } else if (action === 'preview-note' && id) {
        setTimeout(() => this.openNotePreview(id), 100);
      } else if (action === 'preview-pyq' && id) {
        setTimeout(() => this.openPYQPreview(id), 100);
      } else if (action === 'view-announcement' && id) {
        setTimeout(() => this.openAnnouncementModal(id), 100);
      }
    });

    // 5. Initial Render based on current Hash
    this.handleRoute();

    // 6. Setup Modal Generic Close Handlers
    this.setupModals();
  }

  // -----------------------------------------------------------
  // Hash Routing
  // -----------------------------------------------------------
  setupRouting() {
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  handleRoute() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    const section = rawHash || 'home';

    const validSections = [
      'home', 'about', 'semesters', 'notes', 'pyqs',
      'faculty', 'syllabus', 'announcements', 'resources', 'contact', 'admin'
    ];

    if (!validSections.includes(section)) {
      this.currentSection = 'home';
    } else {
      this.currentSection = section;
    }

    this.activateSection(this.currentSection);
    this.updateNavLinks(this.currentSection);
    this.closeMobileMenu();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title
    const formattedTitle = this.currentSection.charAt(0).toUpperCase() + this.currentSection.slice(1);
    document.title = `${formattedTitle} | BCA Department Portal`;
  }

  activateSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.remove('is-active');
    });

    const activeEl = document.getElementById(`section-${sectionId}`);
    if (activeEl) {
      activeEl.classList.add('is-active');
    }

    // Render data for the active section
    switch (sectionId) {
      case 'home':
        this.renderHome();
        break;
      case 'about':
        this.renderAbout();
        break;
      case 'semesters':
        this.renderSemesters();
        break;
      case 'notes':
        this.renderNotes();
        break;
      case 'pyqs':
        this.renderPYQs();
        break;
      case 'faculty':
        this.renderFaculty();
        break;
      case 'syllabus':
        this.renderSyllabus();
        break;
      case 'announcements':
        this.renderAnnouncements();
        break;
      case 'resources':
        this.renderResources();
        break;
      case 'contact':
        this.renderContact();
        break;
      case 'admin':
        adminController.renderAllPanes();
        break;
    }
  }

  updateNavLinks(activeSection) {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href')?.replace(/^#\/?/, '') || 'home';
      if (href === activeSection) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  refreshCurrentView() {
    this.activateSection(this.currentSection);
  }

  // -----------------------------------------------------------
  // Mobile Menu Drawer
  // -----------------------------------------------------------
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');

    if (!toggleBtn || !drawer || !backdrop) return;

    const openDrawer = () => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    this.closeMobileMenu = closeDrawer;
  }

  // -----------------------------------------------------------
  // SECTION 1: HOME PAGE (Agent 2)
  // -----------------------------------------------------------
  renderHome() {
    const dept = store.getDepartment();

    // Update Hero Department Info
    const deptTitleEl = document.getElementById('hero-dept-name');
    if (deptTitleEl) deptTitleEl.textContent = dept.name;

    const taglineEl = document.getElementById('hero-tagline');
    if (taglineEl) taglineEl.textContent = dept.tagline;

    const introEl = document.getElementById('hero-intro');
    if (introEl) introEl.textContent = dept.intro;

    // Render Home Latest Announcements (Top 3)
    const latestAnnContainer = document.getElementById('home-announcements-list');
    if (latestAnnContainer) {
      const topAnns = store.getAnnouncements().slice(0, 3);
      latestAnnContainer.innerHTML = topAnns.map(a => `
        <div class="announcement-card ${a.isImportant ? 'is-important' : ''}">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="badge ${a.isImportant ? 'badge-amber' : 'badge-blue'}">${a.category}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${a.date}</span>
          </div>
          <h4 style="margin: 0.25rem 0; font-size: 1rem;">${a.title}</h4>
          <p style="font-size: 0.875rem; margin-bottom: 0.5rem; color: var(--text-secondary);">${a.description}</p>
          <div>
            <button class="btn btn-sm btn-outline" data-action="view-ann" data-id="${a.id}">
              Read Details →
            </button>
          </div>
        </div>
      `).join('');

      latestAnnContainer.querySelectorAll('[data-action="view-ann"]').forEach(btn => {
        btn.addEventListener('click', () => this.openAnnouncementModal(btn.dataset.id));
      });
    }
  }

  // -----------------------------------------------------------
  // SECTION 2: ABOUT DEPARTMENT
  // -----------------------------------------------------------
  renderAbout() {
    const dept = store.getDepartment();
    const hod = store.getFaculty()[0];

    const hodContainer = document.getElementById('about-hod-card');
    if (hodContainer && hod) {
      const qualText = Array.isArray(hod.qualifications) ? hod.qualifications.join(' • ') : (hod.qualification || '');
      hodContainer.innerHTML = `
        <div class="card" style="background-color: var(--color-surface);">
          <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
            <div class="faculty-photo-placeholder" style="width: 72px; height: 72px; margin-bottom: 0; flex-shrink: 0; border-radius: var(--radius-full);">
              <svg class="faculty-photo-icon" style="width: 32px; height: 32px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 style="margin-bottom: 0.25rem;">${hod.name}</h3>
              <div style="color: var(--primary-blue); font-size: 0.875rem; font-weight: 600;">${hod.designation}</div>
              <div style="color: var(--text-muted); font-size: 0.75rem;">${qualText}</div>
            </div>
          </div>
          <p style="font-style: italic; font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
            "${hod.description || 'Welcome to the Department of Computer Applications. Our department is committed to delivering quality computer education and fostering a supportive academic learning environment for our students.'}"
          </p>
          <div style="font-size: 0.8125rem; color: var(--text-muted);">
            Department of Computer Applications • BCA Department
          </div>
        </div>
      `;
    }
  }

  // -----------------------------------------------------------
  // SECTION 3: SEMESTERS 1 - 8 (Agent 3)
  // -----------------------------------------------------------
  renderSemesters() {
    const tabsContainer = document.getElementById('semester-tab-buttons');
    const subjectsContainer = document.getElementById('semester-subjects-container');
    if (!tabsContainer || !subjectsContainer) return;

    const semesters = store.getSemesters();

    // Render 1-8 Tab Buttons
    tabsContainer.innerHTML = semesters.map(s => `
      <button class="sem-tab-btn ${s.semNumber === this.activeSemester ? 'is-active' : ''}" data-sem="${s.semNumber}">
        Sem ${s.semNumber}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.sem-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectSemester(parseInt(btn.dataset.sem, 10));
      });
    });

    // Render Active Semester Detail & Subjects
    const currentSem = store.getSemester(this.activeSemester);
    if (!currentSem) return;

    const semMetaContainer = document.getElementById('semester-meta-banner');
    if (semMetaContainer) {
      semMetaContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; padding: 1.25rem; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
          <div>
            <h3 style="margin-bottom: 0.25rem;">${currentSem.name} (${currentSem.academicYear})</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0;">${currentSem.description}</p>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="badge badge-blue">${currentSem.totalCredits} Total Credits</span>
            <span class="badge badge-neutral">${currentSem.subjects.length} Subjects</span>
          </div>
        </div>
      `;
    }

    subjectsContainer.innerHTML = currentSem.subjects.map(sub => `
      <div class="subject-card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span class="subject-code-pill">${sub.code}</span>
          <span class="badge ${sub.type === 'Lab' ? 'badge-amber' : sub.type === 'Project' ? 'badge-indigo' : 'badge-neutral'}">${sub.type} (${sub.credits} Credits)</span>
        </div>
        <h4 style="margin-bottom: 0.5rem; font-size: 1.125rem;">${sub.name}</h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${sub.description}</p>
        
        <!-- Unit Breakdown -->
        <div class="unit-accordion">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Course Syllabus Modules
          </div>
          ${sub.units.map(u => `
            <div class="unit-item">
              <span class="unit-title">${u.unit || u.title}: </span>
              <span class="unit-topics">${u.topics}</span>
            </div>
          `).join('')}
        </div>

        <!-- Action Links -->
        <div style="display: flex; gap: 0.5rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light); flex-wrap: wrap;">
          <a href="#notes" class="btn btn-sm btn-outline" data-action="filter-notes" data-sem="${currentSem.semNumber}" data-sub="${sub.code}">
            Subject Notes
          </a>
          <a href="#pyqs" class="btn btn-sm btn-outline" data-action="filter-pyqs" data-sem="${currentSem.semNumber}" data-sub="${sub.code}">
            Subject PYQs
          </a>
          <button class="btn btn-sm btn-secondary" data-action="view-subject-syllabus" data-code="${sub.code}">
            View Syllabus
          </button>
        </div>
      </div>
    `).join('');

    // Attach subject action listeners
    subjectsContainer.querySelectorAll('[data-action="filter-notes"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = '#notes';
        setTimeout(() => {
          const semSelect = document.getElementById('notes-filter-sem');
          if (semSelect) {
            semSelect.value = btn.dataset.sem;
            semSelect.dispatchEvent(new Event('change'));
          }
        }, 50);
      });
    });

    subjectsContainer.querySelectorAll('[data-action="filter-pyqs"]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = '#pyqs';
        setTimeout(() => {
          const semSelect = document.getElementById('pyq-filter-sem');
          if (semSelect) {
            semSelect.value = btn.dataset.sem;
            semSelect.dispatchEvent(new Event('change'));
          }
        }, 50);
      });
    });

    subjectsContainer.querySelectorAll('[data-action="view-subject-syllabus"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = store.getSubject(btn.dataset.code);
        if (sub) {
          this.openSyllabusModal(sub);
        }
      });
    });
  }

  selectSemester(semNumber) {
    this.activeSemester = semNumber;
    this.renderSemesters();
  }

  // -----------------------------------------------------------
  // SECTION 4: NOTES (Agent 4)
  // -----------------------------------------------------------
  renderNotes() {
    const semFilter = document.getElementById('notes-filter-sem');
    const subFilter = document.getElementById('notes-filter-subject');
    const searchInput = document.getElementById('notes-filter-search');
    const viewToggleCards = document.getElementById('notes-view-cards');
    const viewToggleTable = document.getElementById('notes-view-table');

    if (!semFilter || !subFilter) return;

    // Populate Subjects dynamic dropdown on semester change
    const updateSubjectDropdown = () => {
      const selectedSem = semFilter.value;
      const subjects = store.getSubjects(selectedSem);

      let optionsHtml = '<option value="all">All Subjects</option>';
      subjects.forEach(s => {
        optionsHtml += `<option value="${s.code}">${s.code} - ${s.name}</option>`;
      });
      subFilter.innerHTML = optionsHtml;
    };

    if (!semFilter.dataset.bound) {
      semFilter.dataset.bound = "true";
      semFilter.addEventListener('change', () => {
        updateSubjectDropdown();
        this.fetchAndDisplayNotes();
      });

      subFilter.addEventListener('change', () => {
        this.fetchAndDisplayNotes();
      });

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          this.fetchAndDisplayNotes();
        });
      }

      if (viewToggleCards && viewToggleTable) {
        viewToggleCards.addEventListener('click', () => {
          this.notesViewMode = 'cards';
          viewToggleCards.classList.add('btn-primary');
          viewToggleCards.classList.remove('btn-outline');
          viewToggleTable.classList.remove('btn-primary');
          viewToggleTable.classList.add('btn-outline');
          this.fetchAndDisplayNotes();
        });

        viewToggleTable.addEventListener('click', () => {
          this.notesViewMode = 'table';
          viewToggleTable.classList.add('btn-primary');
          viewToggleTable.classList.remove('btn-outline');
          viewToggleCards.classList.remove('btn-primary');
          viewToggleCards.classList.add('btn-outline');
          this.fetchAndDisplayNotes();
        });
      }

      updateSubjectDropdown();
    }

    this.fetchAndDisplayNotes();
  }

  fetchAndDisplayNotes() {
    const sem = document.getElementById('notes-filter-sem')?.value || 'all';
    const sub = document.getElementById('notes-filter-subject')?.value || 'all';
    const search = document.getElementById('notes-filter-search')?.value || '';

    const notes = store.getNotes({
      semester: sem,
      subjectCode: sub,
      search: search
    });

    const countBadge = document.getElementById('notes-count-badge');
    if (countBadge) countBadge.textContent = `${notes.length} Available`;

    const container = document.getElementById('notes-display-container');
    if (!container) return;

    if (notes.length === 0) {
      container.innerHTML = `
        <div style="padding: 3rem; text-align: center; color: var(--text-muted); background: var(--color-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-medium);">
          <p style="font-weight: 500; margin-bottom: 0.5rem;">No lecture notes match your active filter.</p>
          <p style="font-size: 0.875rem;">Try selecting "All Semesters" or clearing search keywords.</p>
        </div>
      `;
      return;
    }

    if (this.notesViewMode === 'cards') {
      container.innerHTML = `
        <div class="resource-grid">
          ${notes.map(n => `
            <div class="resource-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span class="badge badge-blue">Semester ${n.semester}</span>
                <span class="badge badge-neutral">${n.format || 'PDF'} • ${n.fileSize}</span>
              </div>
              <h4 style="margin-bottom: 0.5rem; font-size: 1.05rem;">${n.title}</h4>
              <div style="font-size: 0.8125rem; font-weight: 600; color: var(--primary-blue); margin-bottom: 0.5rem;">
                ${n.subjectCode} - ${n.subjectName}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                Topic: ${n.topic}
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">
                ${n.summary || 'Comprehensive academic lecture notes prepared by faculty.'}
              </p>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
                <span style="font-size: 0.75rem; color: var(--text-muted);">${n.date}</span>
                <div style="display: flex; gap: 0.375rem;">
                  <button class="btn btn-sm btn-outline" data-action="preview-note" data-id="${n.id}">
                    View Note
                  </button>
                  <button class="btn btn-sm btn-primary" data-action="download-note" data-id="${n.id}">
                    Download
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Table View
      container.innerHTML = `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Sem</th>
                <th>Subject</th>
                <th>Title & Topic</th>
                <th>Added Date</th>
                <th>Size</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${notes.map(n => `
                <tr>
                  <td><span class="badge badge-blue">Sem ${n.semester}</span></td>
                  <td><strong>${n.subjectCode}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${n.subjectName}</span></td>
                  <td><strong>${n.title}</strong><br><span style="font-size: 0.75rem; color: var(--text-secondary);">${n.topic}</span></td>
                  <td>${n.date}</td>
                  <td>${n.fileSize}</td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 0.25rem;">
                      <button class="btn btn-sm btn-outline" data-action="preview-note" data-id="${n.id}">View</button>
                      <button class="btn btn-sm btn-primary" data-action="download-note" data-id="${n.id}">Download</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Attach View and Download triggers
    container.querySelectorAll('[data-action="preview-note"]').forEach(btn => {
      btn.addEventListener('click', () => this.openNotePreview(btn.dataset.id));
    });

    container.querySelectorAll('[data-action="download-note"]').forEach(btn => {
      btn.addEventListener('click', () => this.triggerNoteDownload(btn.dataset.id));
    });
  }

  // -----------------------------------------------------------
  // SECTION 5: PREVIOUS YEAR QUESTIONS (Agent 5)
  // -----------------------------------------------------------
  renderPYQs() {
    const semFilter = document.getElementById('pyq-filter-sem');
    const subFilter = document.getElementById('pyq-filter-subject');
    const yearFilter = document.getElementById('pyq-filter-year');
    const typeFilter = document.getElementById('pyq-filter-type');

    if (!semFilter || !subFilter) return;

    const updateSubjectDropdown = () => {
      const selectedSem = semFilter.value;
      const subjects = store.getSubjects(selectedSem);

      let optionsHtml = '<option value="all">All Subjects</option>';
      subjects.forEach(s => {
        optionsHtml += `<option value="${s.code}">${s.code} - ${s.name}</option>`;
      });
      subFilter.innerHTML = optionsHtml;
    };

    if (!semFilter.dataset.bound) {
      semFilter.dataset.bound = "true";
      semFilter.addEventListener('change', () => {
        updateSubjectDropdown();
        this.fetchAndDisplayPYQs();
      });

      subFilter.addEventListener('change', () => this.fetchAndDisplayPYQs());
      if (yearFilter) yearFilter.addEventListener('change', () => this.fetchAndDisplayPYQs());
      if (typeFilter) typeFilter.addEventListener('change', () => this.fetchAndDisplayPYQs());

      updateSubjectDropdown();
    }

    this.fetchAndDisplayPYQs();
  }

  fetchAndDisplayPYQs() {
    const sem = document.getElementById('pyq-filter-sem')?.value || 'all';
    const sub = document.getElementById('pyq-filter-subject')?.value || 'all';
    const year = document.getElementById('pyq-filter-year')?.value || 'all';
    const type = document.getElementById('pyq-filter-type')?.value || 'all';

    const pyqs = store.getPYQs({
      semester: sem,
      subjectCode: sub,
      year: year,
      examType: type
    });

    const countBadge = document.getElementById('pyq-count-badge');
    if (countBadge) countBadge.textContent = `${pyqs.length} Question Papers`;

    const container = document.getElementById('pyq-display-container');
    if (!container) return;

    if (pyqs.length === 0) {
      container.innerHTML = `
        <div style="padding: 3rem; text-align: center; color: var(--text-muted); background: var(--color-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-medium);">
          <p style="font-weight: 500; margin-bottom: 0.5rem;">No question papers found for the selected criteria.</p>
          <p style="font-size: 0.875rem;">Try selecting "All Years" or "All Exam Types".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="resource-grid">
        ${pyqs.map(p => `
          <div class="resource-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <span class="badge badge-emerald">Year ${p.year}</span>
              <span class="badge badge-neutral">${p.examType}</span>
            </div>
            <h4 style="margin-bottom: 0.5rem; font-size: 1.05rem;">${p.subjectName}</h4>
            <div style="font-size: 0.8125rem; font-weight: 600; color: var(--primary-blue); margin-bottom: 0.5rem;">
              Subject Code: ${p.subjectCode} • Semester ${p.semester}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Max Marks: ${p.totalMarks} • Duration: ${p.duration}
            </div>
            <div style="background: var(--color-surface); border-radius: var(--radius-md); padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1rem;">
              <strong style="display: block; margin-bottom: 0.25rem;">Question Highlights:</strong>
              ${p.questionsOverview.slice(0, 2).map(q => `<div style="margin-bottom: 2px;">• ${q}</div>`).join('')}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">${p.fileSize}</span>
              <div style="display: flex; gap: 0.375rem;">
                <button class="btn btn-sm btn-outline" data-action="preview-pyq" data-id="${p.id}">
                  Preview
                </button>
                <button class="btn btn-sm btn-primary" data-action="download-pyq" data-id="${p.id}">
                  Download
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-action="preview-pyq"]').forEach(btn => {
      btn.addEventListener('click', () => this.openPYQPreview(btn.dataset.id));
    });

    container.querySelectorAll('[data-action="download-pyq"]').forEach(btn => {
      btn.addEventListener('click', () => this.triggerPYQDownload(btn.dataset.id));
    });
  }

  // -----------------------------------------------------------
  // SECTION 6: FACULTY MEMBERS (Agent 6)
  // -----------------------------------------------------------
  renderFaculty() {
    const searchInput = document.getElementById('faculty-search-input');
    const container = document.getElementById('faculty-display-grid');
    if (!container) return;

    const renderList = () => {
      const search = searchInput?.value || '';
      const faculty = store.getFaculty({ search });

      if (faculty.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); background: var(--color-surface); border-radius: var(--radius-lg);">
            <p>No faculty members match your search query.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = faculty.map(f => {
        const qualsList = Array.isArray(f.qualifications)
          ? f.qualifications
          : (f.qualification ? [f.qualification] : []);

        return `
          <div class="faculty-card">
            <div class="faculty-photo-placeholder" aria-label="Faculty Photo">
              <svg class="faculty-photo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span class="faculty-photo-caption">[Faculty Photo]</span>
            </div>

            <h3 class="faculty-name">${f.name}</h3>
            <div class="faculty-designation">${f.designation}</div>
            
            <div class="faculty-qual-block">
              <span class="faculty-qual-label">Qualification</span>
              <ul class="faculty-qual-list">
                ${qualsList.map(q => `<li>${q}</li>`).join('')}
              </ul>
            </div>

            <p class="faculty-description">${f.description || f.bio || ''}</p>
          </div>
        `;
      }).join('');
    };

    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = "true";
      searchInput.addEventListener('input', renderList);
    }

    renderList();
  }

  // -----------------------------------------------------------
  // SECTION 7: SYLLABUS (Agent 7)
  // -----------------------------------------------------------
  renderSyllabus() {
    const tabsContainer = document.getElementById('syllabus-sem-tabs');
    const contentContainer = document.getElementById('syllabus-display-container');
    if (!tabsContainer || !contentContainer) return;

    const semesters = store.getSemesters();

    tabsContainer.innerHTML = semesters.map(s => `
      <button class="sem-tab-btn ${s.semNumber === this.activeSyllabusSemester ? 'is-active' : ''}" data-sem="${s.semNumber}">
        Sem ${s.semNumber}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.sem-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSyllabusSemester = parseInt(btn.dataset.sem, 10);
        this.renderSyllabus();
      });
    });

    const currentSem = store.getSemester(this.activeSyllabusSemester);
    if (!currentSem) return;

    contentContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding: 1.25rem; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
        <div>
          <h3 style="margin-bottom: 0.25rem;">Detailed Curriculum: ${currentSem.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0;">Prescribed as per National Education Policy (NEP) guidelines.</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-print-syllabus">
          🖨 Print / Save Syllabus
        </button>
      </div>

      ${currentSem.subjects.map(sub => `
        <div class="syllabus-subject-block">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
            <div>
              <span class="subject-code-pill" style="margin-right: 0.5rem;">${sub.code}</span>
              <strong style="font-size: 1.125rem;">${sub.name}</strong>
            </div>
            <div style="font-size: 0.8125rem; color: var(--text-muted);">
              Credits: <strong>${sub.credits}</strong> | L-T-P: <strong>${sub.ltp}</strong> | Type: <strong>${sub.type}</strong>
            </div>
          </div>
          <p style="font-size: 0.875rem; margin: 0.75rem 0; color: var(--text-secondary);">${sub.description}</p>
          
          <div class="syllabus-unit-grid">
            ${sub.units.map(u => `
              <div class="syllabus-unit-box">
                <div style="font-weight: 700; font-size: 0.8125rem; color: var(--primary-navy); margin-bottom: 0.25rem;">
                  ${u.unit || u.title}
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">
                  ${u.topics}
                </div>
              </div>
            `).join('')}
          </div>

          ${sub.textbooks && sub.textbooks.length > 0 ? `
            <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px dashed var(--border-light); padding-top: 0.5rem;">
              <strong>Prescribed Textbooks:</strong> ${sub.textbooks.join(' • ')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    `;

    document.getElementById('btn-print-syllabus')?.addEventListener('click', () => {
      window.print();
    });
  }

  // -----------------------------------------------------------
  // SECTION 8: ANNOUNCEMENTS (Agent 8)
  // -----------------------------------------------------------
  renderAnnouncements() {
    const filterCat = document.getElementById('ann-filter-category');
    const filterImportant = document.getElementById('ann-filter-important');
    const container = document.getElementById('announcements-display-list');
    if (!container) return;

    const renderFeed = () => {
      const category = filterCat?.value || 'all';
      const importantOnly = filterImportant?.checked || false;

      const list = store.getAnnouncements({
        category,
        importantOnly
      });

      if (list.length === 0) {
        container.innerHTML = `
          <div style="padding: 3rem; text-align: center; color: var(--text-muted); background: var(--color-surface); border-radius: var(--radius-lg);">
            <p>No announcements found under this filter.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = list.map(a => `
        <div class="announcement-card ${a.isImportant ? 'is-important' : ''}">
          <div class="announcement-meta">
            <span class="badge ${a.isImportant ? 'badge-amber' : 'badge-blue'}">${a.category}</span>
            <span>Date: ${a.date}</span>
            <span>Issued by: ${a.author || 'Department Office'}</span>
          </div>
          <h3 style="font-size: 1.125rem; margin: 0.25rem 0;">${a.title}</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${a.description}</p>
          <div>
            <button class="btn btn-sm btn-outline" data-action="view-ann-detail" data-id="${a.id}">
              Read Full Notice →
            </button>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('[data-action="view-ann-detail"]').forEach(btn => {
        btn.addEventListener('click', () => this.openAnnouncementModal(btn.dataset.id));
      });
    };

    if (filterCat && !filterCat.dataset.bound) {
      filterCat.dataset.bound = "true";
      filterCat.addEventListener('change', renderFeed);
      if (filterImportant) filterImportant.addEventListener('change', renderFeed);
    }

    renderFeed();
  }

  // -----------------------------------------------------------
  // SECTION 9: STUDENT RESOURCES
  // -----------------------------------------------------------
  renderResources() {
    const container = document.getElementById('resources-display-grid');
    if (!container) return;

    const resources = store.getStudentResources();
    container.innerHTML = resources.map(r => `
      <div class="card card-hover">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <span class="badge badge-indigo">${r.category}</span>
          <span class="badge badge-neutral">${r.format} (${r.fileSize})</span>
        </div>
        <h4 style="margin-bottom: 0.5rem; font-size: 1.05rem;">${r.title}</h4>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem; flex-grow: 1;">
          ${r.description}
        </p>
        <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
          <button class="btn btn-sm btn-primary" style="width: 100%;" data-action="download-resource" data-title="${r.title}">
            Download Resource
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-action="download-resource"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        const sampleText = `# ${title}\n\nDepartment of Computer Applications\nState University of Technology\n\nThis academic document has been verified and provided for internal student use.`;
        this.downloadFile(sampleText, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`, 'text/plain');
        adminController.showToast(`Downloading "${title}"`, 'success');
      });
    });
  }

  // -----------------------------------------------------------
  // SECTION 10: CONTACT US
  // -----------------------------------------------------------
  renderContact() {
    const form = document.getElementById('contact-inquiry-form');
    if (form && !form.dataset.bound) {
      form.dataset.bound = "true";
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value;
        form.reset();
        adminController.showToast(`Thank you, ${name || 'student'}. Your inquiry has been routed to the department coordinator.`, 'success');
      });
    }
  }

  // -----------------------------------------------------------
  // MODALS & PREVIEWS
  // -----------------------------------------------------------
  setupModals() {
    // Backdrop clicking closes modals
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('is-open');
        }
      });
      const closeBtn = backdrop.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          backdrop.classList.remove('is-open');
        });
      }
    });

    // ESC closes active modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.is-open').forEach(m => m.classList.remove('is-open'));
      }
    });
  }

  openNotePreview(noteId) {
    const note = store.getNote(noteId);
    if (!note) return;

    const modal = document.getElementById('preview-modal');
    const titleEl = document.getElementById('preview-modal-title');
    const bodyEl = document.getElementById('preview-modal-body');
    const downloadBtn = document.getElementById('preview-modal-download');

    if (!modal || !bodyEl) return;

    titleEl.textContent = note.title;
    bodyEl.innerHTML = `
      <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-light); font-size: 0.875rem;">
        <span class="badge badge-blue" style="margin-right: 0.5rem;">Semester ${note.semester}</span>
        <strong>${note.subjectCode}</strong>: ${note.subjectName} • <em>Author: ${note.author}</em>
      </div>
      <div style="line-height: 1.6; font-size: 0.95rem; color: var(--text-main);">
        <pre style="white-space: pre-wrap; font-family: var(--font-sans); background: var(--color-surface); padding: 1.25rem; border-radius: var(--radius-md);">${note.contentSample || note.summary}</pre>
      </div>
    `;

    if (downloadBtn) {
      downloadBtn.onclick = () => this.triggerNoteDownload(note.id);
    }

    modal.classList.add('is-open');
  }

  openPYQPreview(pyqId) {
    const pyq = store.getPYQ(pyqId);
    if (!pyq) return;

    const modal = document.getElementById('preview-modal');
    const titleEl = document.getElementById('preview-modal-title');
    const bodyEl = document.getElementById('preview-modal-body');
    const downloadBtn = document.getElementById('preview-modal-download');

    if (!modal || !bodyEl) return;

    titleEl.textContent = `${pyq.subjectName} (${pyq.subjectCode}) - ${pyq.year}`;
    bodyEl.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-weight: 700; font-size: 1rem; text-transform: uppercase;">State University of Technology & Sciences</div>
        <div style="font-size: 0.875rem; color: var(--text-muted);">Bachelor of Computer Applications (BCA) — Semester ${pyq.semester}</div>
        <div style="font-weight: 600; font-size: 1.125rem; margin-top: 0.25rem;">${pyq.subjectName} [${pyq.subjectCode}]</div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 0.8125rem; color: var(--text-secondary);">
          <span><strong>Exam:</strong> ${pyq.examType} ${pyq.year}</span>
          <span><strong>Time:</strong> ${pyq.duration}</span>
          <span><strong>Max Marks:</strong> ${pyq.totalMarks}</span>
        </div>
      </div>

      <div style="font-size: 0.9rem; line-height: 1.6;">
        <div style="font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em;">
          Exam Questions & Format
        </div>
        <ol style="padding-left: 1.25rem;">
          ${pyq.questionsOverview.map(q => `<li style="margin-bottom: 0.75rem;">${q}</li>`).join('')}
        </ol>
      </div>
    `;

    if (downloadBtn) {
      downloadBtn.onclick = () => this.triggerPYQDownload(pyq.id);
    }

    modal.classList.add('is-open');
  }

  openSyllabusModal(subject) {
    const modal = document.getElementById('preview-modal');
    const titleEl = document.getElementById('preview-modal-title');
    const bodyEl = document.getElementById('preview-modal-body');
    const downloadBtn = document.getElementById('preview-modal-download');

    if (!modal || !bodyEl) return;

    titleEl.textContent = `Syllabus: ${subject.name} (${subject.code})`;
    bodyEl.innerHTML = `
      <div style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-muted);">
        Credits: <strong>${subject.credits}</strong> | L-T-P: <strong>${subject.ltp}</strong> | Course Type: <strong>${subject.type}</strong>
      </div>
      <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">${subject.description}</p>
      
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${subject.units.map(u => `
          <div style="background: var(--color-surface); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            <strong style="color: var(--primary-navy); font-size: 0.875rem;">${u.unit || u.title}:</strong>
            <div style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.25rem;">${u.topics}</div>
          </div>
        `).join('')}
      </div>

      ${subject.textbooks ? `
        <div style="margin-top: 1.25rem; font-size: 0.8125rem; color: var(--text-muted);">
          <strong>References:</strong> ${subject.textbooks.join('; ')}
        </div>
      ` : ''}
    `;

    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const content = `# Syllabus: ${subject.name} (${subject.code})\n\nCredits: ${subject.credits}\n\nUnits:\n${subject.units.map(u=>`- ${u.unit}: ${u.topics}`).join('\n')}`;
        this.downloadFile(content, `${subject.code}_Syllabus.txt`, 'text/plain');
      };
    }

    modal.classList.add('is-open');
  }

  openAnnouncementModal(annId) {
    const ann = store.getAnnouncement(annId);
    if (!ann) return;

    const modal = document.getElementById('preview-modal');
    const titleEl = document.getElementById('preview-modal-title');
    const bodyEl = document.getElementById('preview-modal-body');
    const downloadBtn = document.getElementById('preview-modal-download');

    if (!modal || !bodyEl) return;

    titleEl.textContent = ann.title;
    bodyEl.innerHTML = `
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light); font-size: 0.8125rem; color: var(--text-muted);">
        <span class="badge ${ann.isImportant ? 'badge-amber' : 'badge-blue'}">${ann.category}</span>
        <span>Issued: <strong>${ann.date}</strong></span>
        <span>By: <strong>${ann.author || 'Department Office'}</strong></span>
      </div>
      <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.25rem;">
        ${ann.fullDetails || ann.description}
      </p>
    `;

    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const text = `ANNOUNCEMENT: ${ann.title}\nDate: ${ann.date}\nCategory: ${ann.category}\n\n${ann.fullDetails || ann.description}`;
        this.downloadFile(text, `Notice_${ann.id}.txt`, 'text/plain');
      };
    }

    modal.classList.add('is-open');
  }

  // -----------------------------------------------------------
  // DOWNLOAD ACTION GENERATORS
  // -----------------------------------------------------------
  triggerNoteDownload(noteId) {
    const note = store.getNote(noteId);
    if (!note) return;

    const fileText = `================================================================================
BCA DEPARTMENT LECTURE NOTES & STUDY MATERIAL
State University of Technology & Sciences
================================================================================

TITLE:       ${note.title}
SEMESTER:    Semester ${note.semester}
SUBJECT:     ${note.subjectCode} - ${note.subjectName}
TOPIC:       ${note.topic}
AUTHOR:      ${note.author}
DATE:        ${note.date}

--------------------------------------------------------------------------------
SUMMARY:
${note.summary}

--------------------------------------------------------------------------------
LECTURE NOTES / CODE EXAMPLES:
${note.contentSample || 'Full study material and exercises.'}

================================================================================
Downloaded from BCA Department Official Portal
================================================================================`;

    this.downloadFile(fileText, `${note.subjectCode}_${note.topic.replace(/[^a-zA-Z0-9]/g, '_')}_Notes.txt`, 'text/plain');
    adminController.showToast(`Downloaded: ${note.title}`, 'success');
  }

  triggerPYQDownload(pyqId) {
    const pyq = store.getPYQ(pyqId);
    if (!pyq) return;

    const fileText = `================================================================================
STATE UNIVERSITY OF TECHNOLOGY & SCIENCES
BCA DEGREE EXAMINATIONS — ${pyq.year}
================================================================================

SEMESTER:     Semester ${pyq.semester}
COURSE:       ${pyq.subjectName} (${pyq.subjectCode})
EXAM TYPE:    ${pyq.examType}
MAX MARKS:    ${pyq.totalMarks}
TIME ALLOWED: ${pyq.duration}

--------------------------------------------------------------------------------
INSTRUCTIONS TO CANDIDATES:
1. All questions in Section A are compulsory.
2. Answer any four questions from Section B.
3. Draw neat labelled architectural diagrams wherever applicable.
--------------------------------------------------------------------------------

QUESTIONS OUTLINE:
${pyq.questionsOverview.map((q, idx) => `[${idx + 1}] ${q}`).join('\n\n')}

================================================================================
End of Examination Question Paper
================================================================================`;

    this.downloadFile(fileText, `${pyq.subjectCode}_${pyq.year}_${pyq.examType}.txt`, 'text/plain');
    adminController.showToast(`Downloaded PYQ: ${pyq.subjectCode} (${pyq.year})`, 'success');
  }

  downloadFile(content, fileName, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Instantiate and initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
