(function (root) {
  const KEY = 'osteo-campus.progress.v1';
  const empty = () => ({ version: 1, read: [], quizzes: {}, exams: {} });
  function sanitize(raw, chapters) {
    const state = empty();
    if (!raw || raw.version !== 1) return state;
    const ids = chapters.flatMap(chapter => chapter.lessons.map(lesson => lesson.id));
    state.read = [...new Set(Array.isArray(raw.read) ? raw.read.filter(id => ids.includes(id)) : [])];
    for (const [type, valid] of [['quizzes', ids], ['exams', chapters.map(chapter => chapter.id)]]) {
      for (const id of valid) {
        const record = raw[type]?.[id];
        if (record && Number.isFinite(record.best) && record.best >= 0 && record.best <= 100 && Number.isInteger(record.attempts) && record.attempts > 0) {
          state[type][id] = { best: record.best, attempts: record.attempts };
        }
      }
    }
    return state;
  }
  function load(storage, chapters) {
    try { return { state: sanitize(JSON.parse(storage.getItem(KEY)), chapters), available: true }; }
    catch { return { state: empty(), available: false }; }
  }
  function save(storage, state) {
    try { storage.setItem(KEY, JSON.stringify(state)); return true; }
    catch { return false; }
  }
  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function examQuestions(chapter, random = Math.random) {
    return shuffle(chapter.lessons.flatMap(lesson => {
      const visual = shuffle(lesson.questions.filter(question => question.bone), random).slice(0, 1);
      const text = shuffle(lesson.questions.filter(question => !question.bone), random).slice(0, chapter.examPerLesson - visual.length);
      return [...text, ...visual].map(question => ({ ...question, lessonId: lesson.id }));
    }), random);
  }
  function percent(correct, total) { return total ? Math.round(correct / total * 100) : 0; }
  function record(state, type, id, score) {
    const previous = state[type][id];
    state[type][id] = { best: Math.max(previous?.best || 0, score), attempts: (previous?.attempts || 0) + 1 };
  }
  function mastered(state, id) { return (state.quizzes[id]?.best || 0) >= 80; }
  const engine = { KEY, empty, sanitize, load, save, shuffle, examQuestions, percent, record, mastered };
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  else root.CampusEngine = engine;
})(globalThis);
