(function (root) {
  function learned(progress, lessons) {
    return lessons.filter(lesson => progress.read.includes(lesson.id) || (progress.quizzes[lesson.id]?.best || 0) >= 80)
      .map(({ id, title }) => ({ id, title }));
  }
  function bridge() { return root.AndroidReminders || null; }
  function status() {
    try { return JSON.parse(bridge().status()); }
    catch { return { supported: false, enabled: false, permission: false, start: 9, end: 20, next: 0, count: 0 }; }
  }
  function sync(progress, lessons) {
    try { bridge()?.syncLearned(JSON.stringify(learned(progress, lessons))); }
    catch { return false; }
    return true;
  }
  function configure(enabled, start, end) {
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > 24 || start >= end) throw new Error('Choisissez une plage valide, sans passage à minuit.');
    if (!bridge()) throw new Error('Les rappels en arrière-plan nécessitent la version Android installée.');
    bridge().configure(enabled, start, end);
  }
  const api = { learned, status, sync, configure };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CampusReminders = api;
})(globalThis);
