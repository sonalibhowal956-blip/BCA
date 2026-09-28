/**
 * BCA Department Portal - Admin Dashboard Controller (Agent 11)
 * Provides intuitive management of Faculty, Notes, PYQs, and Announcements.
 */

import { store } from './store.js';

export class AdminController {
  constructor() {
    this.currentTab = 'faculty';
  }

  init() {
    this.bindTabEvents();
    this.renderAllPanes();
    this.bindForms();
    this.bindSystemTools();

    // Subscribe to data changes to keep admin tables fresh
    store.subscribe('all', () => {
      this.renderAllPanes();
    });
  }

  bindTabEvents() {
    const tabs = document.querySelectorAll('.admin-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const target = tab.dataset.pane;
        this.currentTab = target;

        document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('is-active'));
        const pane = document.getElementById(`admin-pane-${target}`);
        if (pane) pane.classList.add('is-active');
      });
    });
  }

  renderAllPanes() {
    this.renderFacultyTable();
    this.renderNotesTable();
    this.renderPYQsTable();
    this.renderAnnouncementsTable();
    this.populateSubjectDropdowns();
  }

  // --- Populate Dynamic Subject Dropdowns in Forms ---
  populateSubjectDropdowns() {
    const semSelects = [
      { semId: 'admin-note-sem', subId: 'admin-note-subject' },
      { semId: 'admin-pyq-sem', subId: 'admin-pyq-subject' }
    ];

    semSelects.forEach(({ semId, subId }) => {
      const semEl = document.getElementById(semId);
      const subEl = document.getElementById(subId);
      if (!semEl || !subEl) return;

      const updateSubs = () => {
        const sem = semEl.value;
        const subjects = store.getSubjects(sem);
        subEl.innerHTML = subjects.map(s => `
          <option value="${s.code}" data-name="${s.name}">
            ${s.code} - ${s.name}
          </option>
        `).join('');
      };

      semEl.removeEventListener('change', updateSubs);
      semEl.addEventListener('change', updateSubs);
      updateSubs();
    });
  }

  // --- 1. Faculty Management ---
  renderFacultyTable() {
    const tbody = document.getElementById('admin-faculty-table-body');
    if (!tbody) return;

    const faculty = store.getFaculty();
    if (faculty.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No faculty members found.</td></tr>`;
      return;
    }

    tbody.innerHTML = faculty.map(f => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 28px; height: 28px; border-radius: 50%; background-color: ${f.avatarColor || '#1E3A8A'}; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">
              ${f.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
            </span>
            <strong>${f.name}</strong>
          </div>
        </td>
        <td>${f.designation}</td>
        <td><small>${Array.isArray(f.qualifications) ? f.qualifications.join('<br>') : (f.qualification || '')}</small></td>
        <td>${f.email || 'bca.department@university.edu'}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="delete-faculty" data-id="${f.id}">
            Delete
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="delete-faculty"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this faculty profile?')) {
          store.deleteFaculty(btn.dataset.id);
          this.showToast('Faculty member removed successfully', 'success');
        }
      });
    });
  }

  // --- 2. Notes Management ---
  renderNotesTable() {
    const tbody = document.getElementById('admin-notes-table-body');
    if (!tbody) return;

    const notes = store.getNotes();
    if (notes.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No notes available.</td></tr>`;
      return;
    }

    tbody.innerHTML = notes.map(n => `
      <tr>
        <td><span class="badge badge-blue">Sem ${n.semester}</span></td>
        <td><strong>${n.subjectCode}</strong></td>
        <td>${n.title}</td>
        <td>${n.topic}</td>
        <td>${n.date}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="delete-note" data-id="${n.id}">
            Delete
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="delete-note"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this lecture note?')) {
          store.deleteNote(btn.dataset.id);
          this.showToast('Note deleted successfully', 'success');
        }
      });
    });
  }

  // --- 3. PYQ Management ---
  renderPYQsTable() {
    const tbody = document.getElementById('admin-pyq-table-body');
    if (!tbody) return;

    const pyqs = store.getPYQs();
    if (pyqs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No question papers uploaded.</td></tr>`;
      return;
    }

    tbody.innerHTML = pyqs.map(p => `
      <tr>
        <td><span class="badge badge-emerald">Sem ${p.semester}</span></td>
        <td><strong>${p.subjectCode}</strong> - ${p.subjectName}</td>
        <td>${p.year}</td>
        <td><span class="badge badge-neutral">${p.examType}</span></td>
        <td>${p.totalMarks} Marks</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="delete-pyq" data-id="${p.id}">
            Delete
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="delete-pyq"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this question paper archive?')) {
          store.deletePYQ(btn.dataset.id);
          this.showToast('Question paper deleted', 'success');
        }
      });
    });
  }

  // --- 4. Announcements Management ---
  renderAnnouncementsTable() {
    const tbody = document.getElementById('admin-ann-table-body');
    if (!tbody) return;

    const anns = store.getAnnouncements();
    if (anns.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No announcements listed.</td></tr>`;
      return;
    }

    tbody.innerHTML = anns.map(a => `
      <tr>
        <td>
          ${a.isImportant ? '<span class="badge badge-amber" style="margin-right: 6px;">Important</span>' : ''}
          <strong>${a.title}</strong>
        </td>
        <td><span class="badge badge-neutral">${a.category}</span></td>
        <td>${a.date}</td>
        <td>${a.author || 'Department'}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="delete-ann" data-id="${a.id}">
            Delete
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="delete-ann"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this announcement?')) {
          store.deleteAnnouncement(btn.dataset.id);
          this.showToast('Announcement removed', 'success');
        }
      });
    });
  }

  // --- Forms Submission Handlers ---
  bindForms() {
    // 1. Add Faculty Form
    const facForm = document.getElementById('admin-add-faculty-form');
    if (facForm) {
      facForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById('fac-input-name').value.trim(),
          designation: document.getElementById('fac-input-designation').value.trim(),
          qualification: document.getElementById('fac-input-qualification').value.trim(),
          specialization: document.getElementById('fac-input-specialization').value.trim(),
          email: document.getElementById('fac-input-email').value.trim(),
          room: document.getElementById('fac-input-room').value.trim() || 'CS Block',
          bio: document.getElementById('fac-input-bio').value.trim() || 'Faculty member in the Department of Computer Applications.'
        };

        if (!data.name || !data.email) {
          alert('Please provide faculty name and email address.');
          return;
        }

        store.addFaculty(data);
        facForm.reset();
        this.showToast(`Faculty member "${data.name}" added successfully!`, 'success');
      });
    }

    // 2. Add Note Form
    const noteForm = document.getElementById('admin-add-note-form');
    if (noteForm) {
      noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sem = parseInt(document.getElementById('admin-note-sem').value, 10);
        const subSelect = document.getElementById('admin-note-subject');
        const subjectCode = subSelect.value;
        const subjectName = subSelect.options[subSelect.selectedIndex]?.dataset.name || subjectCode;

        const data = {
          title: document.getElementById('note-input-title').value.trim(),
          semester: sem,
          subjectCode: subjectCode,
          subjectName: subjectName,
          topic: document.getElementById('note-input-topic').value.trim(),
          author: document.getElementById('note-input-author').value.trim() || 'BCA Faculty',
          fileSize: document.getElementById('note-input-size').value.trim() || '2.0 MB',
          format: 'PDF',
          summary: document.getElementById('note-input-summary').value.trim(),
          contentSample: document.getElementById('note-input-sample').value.trim() || `# ${document.getElementById('note-input-title').value}\n\nLecture notes and study materials.`
        };

        if (!data.title || !data.topic) {
          alert('Please fill out note title and topic.');
          return;
        }

        store.addNote(data);
        noteForm.reset();
        this.populateSubjectDropdowns();
        this.showToast(`Lecture note "${data.title}" added successfully!`, 'success');
      });
    }

    // 3. Add PYQ Form
    const pyqForm = document.getElementById('admin-add-pyq-form');
    if (pyqForm) {
      pyqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sem = parseInt(document.getElementById('admin-pyq-sem').value, 10);
        const subSelect = document.getElementById('admin-pyq-subject');
        const subjectCode = subSelect.value;
        const subjectName = subSelect.options[subSelect.selectedIndex]?.dataset.name || subjectCode;

        const data = {
          semester: sem,
          subjectCode: subjectCode,
          subjectName: subjectName,
          year: parseInt(document.getElementById('pyq-input-year').value, 10),
          examType: document.getElementById('pyq-input-type').value,
          totalMarks: parseInt(document.getElementById('pyq-input-marks').value, 10) || 75,
          duration: document.getElementById('pyq-input-duration').value || '3 Hours',
          fileSize: '1.2 MB',
          questionsOverview: [
            document.getElementById('pyq-input-q1').value || 'Question 1: Conceptual and foundational problem questions.',
            document.getElementById('pyq-input-q2').value || 'Question 2: System design and programming implementation questions.'
          ]
        };

        store.addPYQ(data);
        pyqForm.reset();
        this.populateSubjectDropdowns();
        this.showToast(`PYQ for ${data.subjectCode} (${data.year}) added!`, 'success');
      });
    }

    // 4. Add Announcement Form
    const annForm = document.getElementById('admin-add-ann-form');
    if (annForm) {
      annForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          title: document.getElementById('ann-input-title').value.trim(),
          category: document.getElementById('ann-input-category').value,
          date: document.getElementById('ann-input-date').value || new Date().toISOString().split('T')[0],
          isImportant: document.getElementById('ann-input-important').checked,
          description: document.getElementById('ann-input-desc').value.trim(),
          fullDetails: document.getElementById('ann-input-details').value.trim() || document.getElementById('ann-input-desc').value.trim(),
          author: document.getElementById('ann-input-author').value.trim() || 'Department Office'
        };

        if (!data.title || !data.description) {
          alert('Please enter announcement title and description.');
          return;
        }

        store.addAnnouncement(data);
        annForm.reset();
        this.showToast(`Announcement published!`, 'success');
      });
    }
  }

  // --- System Backup & Factory Reset ---
  bindSystemTools() {
    // Reset Data
    const resetBtn = document.getElementById('admin-reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all portal data back to factory seed dataset? All temporary additions will be removed.')) {
          store.resetToDefaults();
          this.showToast('Data reset to default academic state', 'success');
        }
      });
    }

    // Export Data JSON
    const exportBtn = document.getElementById('admin-export-data-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const json = store.exportDataJSON();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bca_portal_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Data backup downloaded', 'success');
      });
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : 'ℹ'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }
}

export const adminController = new AdminController();
