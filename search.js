/**
 * BCA Department Portal - Global Search Engine (Agent 9)
 * Instant search indexing Notes, PYQs, Subjects, Faculty, Syllabus, and Announcements.
 * Supports Ctrl+K and / keyboard shortcuts.
 */

import { store } from './store.js';

class GlobalSearch {
  constructor() {
    this.modal = null;
    this.searchInput = null;
    this.resultsContainer = null;
    this.isOpen = false;
  }

  init() {
    this.modal = document.getElementById('search-modal');
    this.searchInput = document.getElementById('search-modal-input');
    this.resultsContainer = document.getElementById('search-results-list');

    if (!this.modal || !this.searchInput || !this.resultsContainer) {
      console.warn('Search elements not ready yet');
      return;
    }

    // Attach shortcut listeners (Ctrl+K, Cmd+K, /)
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is already typing in an input/textarea
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.open();
      } else if (e.key === '/' && !isInput && !this.isOpen) {
        e.preventDefault();
        this.open();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close button
    const closeBtn = this.modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Click outside backdrop to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Debounced search input handler
    let debounceTimer;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value.trim());
      }, 150);
    });

    // Header search trigger buttons
    document.querySelectorAll('[data-action="open-search"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    this.searchInput.value = '';
    this.performSearch('');
    setTimeout(() => {
      this.searchInput.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
  }

  performSearch(query) {
    if (!this.resultsContainer) return;

    if (!query) {
      this.resultsContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
          <p>Type keywords to search across notes, subjects, PYQs, faculty, syllabus and announcements...</p>
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
            <span class="badge badge-neutral">Python</span>
            <span class="badge badge-neutral">Data Structures</span>
            <span class="badge badge-neutral">DBMS</span>
            <span class="badge badge-neutral">AI & ML</span>
            <span class="badge badge-neutral">Semester 1</span>
          </div>
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();

    // 1. Search Subjects
    const subjects = store.getAllSubjects().filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );

    // 2. Search Notes
    const notes = store.getNotes({ search: q });

    // 3. Search PYQs
    const pyqs = store.getPYQs({ search: q });

    // 4. Search Faculty
    const faculty = store.getFaculty({ search: q });

    // 5. Search Announcements
    const announcements = store.getAnnouncements({ search: q });

    const totalMatches = subjects.length + notes.length + pyqs.length + faculty.length + announcements.length;

    if (totalMatches === 0) {
      this.resultsContainer.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          <p style="font-weight: 500; margin-bottom: 0.5rem;">No results found for "${query}"</p>
          <p style="font-size: 0.875rem;">Check your spelling or try broader keywords like "C", "Algorithms", or "Sem 3".</p>
        </div>
      `;
      return;
    }

    let html = '';

    // Subjects Group
    if (subjects.length > 0) {
      html += `
        <div class="search-group">
          <div class="search-group-title">Courses & Subjects (${subjects.length})</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${subjects.slice(0, 4).map(sub => `
              <a href="#semesters" class="search-result-item" data-action="goto-sem" data-sem="${sub.semester}">
                <div>
                  <span class="subject-code-pill" style="margin-right: 8px;">${sub.code}</span>
                  <strong>${sub.name}</strong>
                </div>
                <span class="badge badge-neutral">Semester ${sub.semester}</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Notes Group
    if (notes.length > 0) {
      html += `
        <div class="search-group">
          <div class="search-group-title">Lecture Notes (${notes.length})</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${notes.slice(0, 4).map(n => `
              <a href="#notes" class="search-result-item" data-action="preview-note" data-id="${n.id}">
                <div>
                  <span class="badge badge-blue" style="margin-right: 8px;">Sem ${n.semester}</span>
                  <strong>${n.title}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${n.subjectCode} • ${n.topic}</div>
                </div>
                <span class="btn btn-sm btn-outline">View Note</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // PYQs Group
    if (pyqs.length > 0) {
      html += `
        <div class="search-group">
          <div class="search-group-title">Previous Year Question Papers (${pyqs.length})</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${pyqs.slice(0, 4).map(p => `
              <a href="#pyqs" class="search-result-item" data-action="preview-pyq" data-id="${p.id}">
                <div>
                  <span class="badge badge-emerald" style="margin-right: 8px;">${p.year}</span>
                  <strong>${p.subjectName} (${p.subjectCode})</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Semester ${p.semester} • ${p.examType}</div>
                </div>
                <span class="btn btn-sm btn-outline">Preview Exam</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Faculty Group
    if (faculty.length > 0) {
      html += `
        <div class="search-group">
          <div class="search-group-title">Faculty Members (${faculty.length})</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${faculty.slice(0, 3).map(f => {
              const quals = Array.isArray(f.qualifications) ? f.qualifications[0] : (f.qualification || '');
              return `
              <a href="#faculty" class="search-result-item" data-action="goto-faculty" data-id="${f.id}">
                <div>
                  <strong>${f.name}</strong>
                  <div style="font-size: 0.75rem; color: var(--primary-blue);">${f.designation}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${quals}</div>
                </div>
                <span class="btn btn-sm btn-outline">View Profile</span>
              </a>
            `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Announcements Group
    if (announcements.length > 0) {
      html += `
        <div class="search-group">
          <div class="search-group-title">Announcements (${announcements.length})</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${announcements.slice(0, 3).map(a => `
              <a href="#announcements" class="search-result-item" data-action="view-announcement" data-id="${a.id}">
                <div>
                  ${a.isImportant ? '<span class="badge badge-amber" style="margin-right: 6px;">Important</span>' : ''}
                  <strong>${a.title}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${a.date} • ${a.category}</div>
                </div>
                <span class="btn btn-sm btn-outline">Read</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    this.resultsContainer.innerHTML = html;

    // Attach click triggers to search results
    this.resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const action = item.dataset.action;
        const id = item.dataset.id;
        const sem = item.dataset.sem;

        this.close();

        // Dispatch custom global event
        window.dispatchEvent(new CustomEvent('search-navigation', {
          detail: { action, id, sem, href: item.getAttribute('href') }
        }));
      });
    });
  }
}

export const globalSearch = new GlobalSearch();
