const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function application(hash = '#/parcours', storageBlocked = false) {
  const values = new Map();
  const app = { innerHTML: '', addEventListener() {} };
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const context = {
    location: { hash },
    document: { querySelector: selector => selector === '#app' ? app : null, querySelectorAll: () => [], getElementById: () => null },
    window: { localStorage: storageBlocked ? null : storage, addEventListener() {}, scrollTo() {} }
  };
  vm.createContext(context);
  for (const file of ['data.js', 'engine.js', 'skeleton.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return { app, context, run: code => vm.runInContext(code, context) };
}

test('every application route renders without a DOM library or backend', () => {
  const routes = ['parcours', 'atlas', 'progression', 'sources', 'inconnue', 'cours/inconnu', 'quiz/inconnu', 'examen/inconnu', 'examen/squelette'];
  for (const id of ['reperes', 'tete', 'tronc', 'superieur', 'inferieur', 'synthese']) routes.push(`cours/${id}`, `quiz/${id}`);
  for (const route of routes) {
    const { app } = application(`#/${route}`);
    assert.ok(app.innerHTML.includes('<main id="main"'));
    assert.ok(app.innerHTML.includes('<h1'));
    assert.equal(app.innerHTML.includes('undefined'), false, route);
  }
});

test('course quiz exposes immediate feedback, records only completed attempts and preserves the best score', () => {
  const { run, app } = application('#/quiz/reperes');
  for (let i = 0; i < 5; i++) {
    run('activeQuiz.selected = activeQuiz.questions[activeQuiz.index].bone || activeQuiz.questions[activeQuiz.index].answer; submitAnswer()');
    assert.ok(app.innerHTML.includes('feedback success'));
    assert.equal(run('progress.quizzes.reperes'), undefined);
    run('submitAnswer()');
  }
  assert.equal(run('progress.quizzes.reperes.best'), 100);
  assert.equal(run('progress.quizzes.reperes.attempts'), 1);
  assert.equal(run('activeQuiz.done'), true);
  run('submitAnswer()');
  assert.equal(run('progress.quizzes.reperes.attempts'), 1);
  assert.equal((app.innerHTML.match(/class="correction"/g) || []).length, 5);
});

test('exam defers feedback until completion and creates revision links for wrong answers', () => {
  const { run, app } = application('#/examen/squelette');
  for (let i = 0; i < 18; i++) {
    assert.equal(app.innerHTML.includes('class="feedback'), false);
    run('activeQuiz.selected = activeQuiz.questions[activeQuiz.index].bone ? "femur" : (activeQuiz.questions[activeQuiz.index].answer + 1) % 4; submitAnswer()');
    if (i < 17) assert.equal(run('progress.exams.squelette'), undefined);
  }
  assert.equal(run('activeQuiz.done'), true);
  assert.equal(run('progress.exams.squelette.attempts'), 1);
  assert.ok(run('progress.exams.squelette.best') < 80);
  assert.ok(app.innerHTML.includes('À revoir en priorité'));
  assert.ok(app.innerHTML.includes('Réponse attendue'));
  assert.equal((app.innerHTML.match(/class="correction"/g) || []).length, 18);
});

test('missing storage shows a warning while all course cards remain usable', () => {
  const { app } = application('#/parcours', true);
  assert.ok(app.innerHTML.includes('La sauvegarde locale est indisponible'));
  assert.equal((app.innerHTML.match(/class="lesson-card/g) || []).length, 6);
});
