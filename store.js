/**
 * BCA Department Portal - State & Data Storage Layer
 * Handles LocalStorage persistence, CRUD operations for all entities,
 * reactive change notifications, and reset-to-defaults capabilities.
 */

import { INITIAL_DATA } from './data.js';

const STORAGE_KEY = 'bca_department_portal_v2';

class DataStore {
  constructor() {
    this.subscribers = new Map();
    this.data = this.loadFromStorage();
  }

  /**
   * Load data from LocalStorage or initialize with seed data.
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Quick integrity check: ensure core collections exist
        if (parsed.semesters && parsed.notes && parsed.faculty && parsed.announcements) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored BCA data, falling back to seed data:', e);
    }

    // Default initialization
    const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveToStorage(cloned);
    return cloned;
  }

  /**
   * Commit state to LocalStorage.
   */
  saveToStorage(dataToSave = this.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  }

  /**
   * Reset data back to initial seed data.
   */
  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveToStorage();
    this.notify('all');
    return this.data;
  }

  /**
   * Export all data as JSON string for backup.
   */
  exportDataJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Import data from JSON string.
   */
  importDataJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.semesters && parsed.notes && parsed.faculty) {
        this.data = parsed;
        this.saveToStorage();
        this.notify('all');
        return { success: true };
      }
      return { success: false, error: 'Invalid data format. Missing required fields.' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Event Subscription
   */
  subscribe(entity, callback) {
    if (!this.subscribers.has(entity)) {
      this.subscribers.set(entity, new Set());
    }
    this.subscribers.get(entity).add(callback);
    return () => {
      this.subscribers.get(entity)?.delete(callback);
    };
  }

  notify(entity) {
    // Notify specific entity listeners
    if (this.subscribers.has(entity)) {
      this.subscribers.get(entity).forEach(cb => cb(this.data));
    }
    // Also notify wildcard 'all' listeners
    if (entity !== 'all' && this.subscribers.has('all')) {
      this.subscribers.get('all').forEach(cb => cb(this.data));
    }
  }

  // --- Department Metadata ---
  getDepartment() {
    return this.data.department;
  }

  // --- Semesters & Subjects ---
  getSemesters() {
    return this.data.semesters;
  }

  getSemester(semNumber) {
    const num = parseInt(semNumber, 10);
    return this.data.semesters.find(s => s.semNumber === num);
  }

  getSubjects(semNumber) {
    if (!semNumber || semNumber === 'all') {
      return this.getAllSubjects();
    }
    const sem = this.getSemester(semNumber);
    return sem ? sem.subjects : [];
  }

  getAllSubjects() {
    const all = [];
    this.data.semesters.forEach(s => {
      s.subjects.forEach(sub => {
        all.push({ ...sub, semester: s.semNumber });
      });
    });
    return all;
  }

  getSubject(subjectCode) {
    const all = this.getAllSubjects();
    return all.find(s => s.code.toLowerCase() === subjectCode.toLowerCase());
  }

  // --- Notes Operations ---
  getNotes(filters = {}) {
    let list = [...this.data.notes];

    if (filters.semester && filters.semester !== 'all') {
      const semNum = parseInt(filters.semester, 10);
      list = list.filter(n => n.semester === semNum);
    }

    if (filters.subjectCode && filters.subjectCode !== 'all') {
      list = list.filter(n => n.subjectCode.toLowerCase() === filters.subjectCode.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.subjectName.toLowerCase().includes(q) ||
        n.subjectCode.toLowerCase().includes(q)
      );
    }

    return list;
  }

  getNote(id) {
    return this.data.notes.find(n => n.id === id);
  }

  addNote(noteData) {
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      fileSize: noteData.fileSize || '1.8 MB',
      format: noteData.format || 'PDF',
      ...noteData,
      semester: parseInt(noteData.semester, 10)
    };
    this.data.notes.unshift(newNote);
    this.saveToStorage();
    this.notify('notes');
    return newNote;
  }

  deleteNote(id) {
    const initialLen = this.data.notes.length;
    this.data.notes = this.data.notes.filter(n => n.id !== id);
    if (this.data.notes.length !== initialLen) {
      this.saveToStorage();
      this.notify('notes');
      return true;
    }
    return false;
  }

  // --- PYQ Operations ---
  getPYQs(filters = {}) {
    let list = [...this.data.pyqs];

    if (filters.semester && filters.semester !== 'all') {
      const semNum = parseInt(filters.semester, 10);
      list = list.filter(p => p.semester === semNum);
    }

    if (filters.subjectCode && filters.subjectCode !== 'all') {
      list = list.filter(p => p.subjectCode.toLowerCase() === filters.subjectCode.toLowerCase());
    }

    if (filters.year && filters.year !== 'all') {
      const yr = parseInt(filters.year, 10);
      list = list.filter(p => p.year === yr);
    }

    if (filters.examType && filters.examType !== 'all') {
      list = list.filter(p => p.examType.toLowerCase() === filters.examType.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(p =>
        p.subjectName.toLowerCase().includes(q) ||
        p.subjectCode.toLowerCase().includes(q)
      );
    }

    return list;
  }

  getPYQ(id) {
    return this.data.pyqs.find(p => p.id === id);
  }

  addPYQ(pyqData) {
    const newPYQ = {
      id: `pyq-${Date.now()}`,
      fileSize: pyqData.fileSize || '1.1 MB',
      duration: pyqData.duration || '3 Hours',
      totalMarks: parseInt(pyqData.totalMarks || 75, 10),
      questionsOverview: pyqData.questionsOverview || [
        "Section A: 5 Compulsory theoretical and computational conceptual questions.",
        "Section B: Comprehensive algorithmic and architecture design questions.",
        "Section C: Case study, practical implementation, and code defense."
      ],
      ...pyqData,
      semester: parseInt(pyqData.semester, 10),
      year: parseInt(pyqData.year, 10)
    };
    this.data.pyqs.unshift(newPYQ);
    this.saveToStorage();
    this.notify('pyqs');
    return newPYQ;
  }

  deletePYQ(id) {
    const initialLen = this.data.pyqs.length;
    this.data.pyqs = this.data.pyqs.filter(p => p.id !== id);
    if (this.data.pyqs.length !== initialLen) {
      this.saveToStorage();
      this.notify('pyqs');
      return true;
    }
    return false;
  }

  // --- Faculty Operations ---
  getFaculty(filters = {}) {
    let list = [...this.data.faculty];

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(f => {
        const quals = Array.isArray(f.qualifications) ? f.qualifications.join(' ') : (f.qualification || '');
        return f.name.toLowerCase().includes(q) ||
          f.designation.toLowerCase().includes(q) ||
          quals.toLowerCase().includes(q) ||
          (f.description && f.description.toLowerCase().includes(q));
      });
    }

    if (filters.designation && filters.designation !== 'all') {
      list = list.filter(f => f.designation.toLowerCase().includes(filters.designation.toLowerCase()));
    }

    return list;
  }

  getFacultyMember(id) {
    return this.data.faculty.find(f => f.id === id);
  }

  addFaculty(facultyData) {
    const colors = ['#1E3A8A', '#059669', '#D97706', '#7C3AED', '#DC2626', '#0284C7', '#4F46E5', '#0D9488'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newFaculty = {
      id: `fac-${Date.now()}`,
      avatarColor: facultyData.avatarColor || randomColor,
      ...facultyData
    };
    this.data.faculty.push(newFaculty);
    this.saveToStorage();
    this.notify('faculty');
    return newFaculty;
  }

  updateFaculty(id, updatedFields) {
    const idx = this.data.faculty.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.data.faculty[idx] = { ...this.data.faculty[idx], ...updatedFields };
      this.saveToStorage();
      this.notify('faculty');
      return this.data.faculty[idx];
    }
    return null;
  }

  deleteFaculty(id) {
    const initialLen = this.data.faculty.length;
    this.data.faculty = this.data.faculty.filter(f => f.id !== id);
    if (this.data.faculty.length !== initialLen) {
      this.saveToStorage();
      this.notify('faculty');
      return true;
    }
    return false;
  }

  // --- Announcements Operations ---
  getAnnouncements(filters = {}) {
    let list = [...this.data.announcements];

    if (filters.category && filters.category !== 'all') {
      list = list.filter(a => a.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.importantOnly) {
      list = list.filter(a => a.isImportant);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }

    // Sort: Important first, then newest date first
    return list.sort((a, b) => {
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      return new Date(b.date) - new Date(a.date);
    });
  }

  getAnnouncement(id) {
    return this.data.announcements.find(a => a.id === id);
  }

  addAnnouncement(annData) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      date: annData.date || new Date().toISOString().split('T')[0],
      isImportant: !!annData.isImportant,
      fullDetails: annData.fullDetails || annData.description,
      author: annData.author || "Department Office",
      ...annData
    };
    this.data.announcements.unshift(newAnn);
    this.saveToStorage();
    this.notify('announcements');
    return newAnn;
  }

  updateAnnouncement(id, updatedFields) {
    const idx = this.data.announcements.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.data.announcements[idx] = { ...this.data.announcements[idx], ...updatedFields };
      this.saveToStorage();
      this.notify('announcements');
      return this.data.announcements[idx];
    }
    return null;
  }

  deleteAnnouncement(id) {
    const initialLen = this.data.announcements.length;
    this.data.announcements = this.data.announcements.filter(a => a.id !== id);
    if (this.data.announcements.length !== initialLen) {
      this.saveToStorage();
      this.notify('announcements');
      return true;
    }
    return false;
  }

  // --- Student Resources ---
  getStudentResources() {
    return this.data.studentResources || [];
  }
}

// Global singleton instance
export const store = new DataStore();
