const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { bones } = require('../data.js');
const chapters = [...require('../data.js').chapters, ...require('../curriculum.js').chapters];
const lessons = chapters.flatMap(chapter => chapter.lessons);
const E = require('../engine.js');

test('all chapter, lesson, bone and question identifiers are unique', () => {
  for (const items of [chapters, lessons, bones, lessons.flatMap(lesson => lesson.questions)]) {
    assert.equal(new Set(items.map(item => item.id)).size, items.length);
  }
});

test('every course has objectives, content, a practice task and valid corrected questions', () => {
  for (const chapter of chapters) {
    assert.ok(chapter.lessons.length);
    assert.ok(chapter.examPerLesson > 0);
    for (const lesson of chapter.lessons) {
      assert.ok(lesson.objectives.length >= 3);
      assert.ok(lesson.sections.length >= 3);
      assert.ok(lesson.practice);
      assert.ok(lesson.duration > 0);
      assert.ok(lesson.questions.length >= chapter.examPerLesson);
      if (lesson.bones.length) assert.ok(lesson.questions.some(question => question.bone));
      for (const id of lesson.bones) assert.ok(bones.some(bone => bone.id === id));
      for (const question of lesson.questions) {
        assert.ok(question.explanation);
        if (question.bone) assert.ok(bones.some(bone => bone.id === question.bone));
        else {
          assert.equal(question.choices.length, 4);
          assert.equal(new Set(question.choices).size, 4);
          assert.ok(Number.isInteger(question.answer));
          assert.ok(question.answer >= 0 && question.answer < question.choices.length);
        }
      }
    }
  }
});

test('the exam samples every lesson with one visual question per lesson and no duplicates', () => {
  for (let run = 0; run < 100; run++) {
    for (const chapter of chapters) {
      const questions = E.examQuestions(chapter);
      assert.equal(questions.length, chapter.lessons.length * chapter.examPerLesson);
      assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
      for (const lesson of chapter.lessons) {
        const subset = questions.filter(question => question.lessonId === lesson.id);
        assert.equal(subset.length, chapter.examPerLesson);
        assert.equal(subset.filter(question => question.bone).length, lesson.bones.length ? 1 : 0);
      }
    }
  }
});

test('shuffle is a non-mutating permutation and supports deterministic randomness', () => {
  const original = [1, 2, 3, 4];
  assert.deepEqual(E.shuffle(original, () => 0), [2, 3, 4, 1]);
  assert.deepEqual(original, [1, 2, 3, 4]);
});

test('scores preserve the best attempt, count attempts and separate exam results', () => {
  const state = E.empty();
  E.record(state, 'quizzes', 'reperes', 80);
  assert.equal(E.mastered(state, 'reperes'), true);
  E.record(state, 'quizzes', 'reperes', 40);
  E.record(state, 'exams', 'squelette', 100);
  assert.deepEqual(state.quizzes.reperes, { best: 80, attempts: 2 });
  assert.deepEqual(state.exams.squelette, { best: 100, attempts: 1 });
  assert.equal(E.mastered(state, 'tete'), false);
  assert.equal(E.percent(0, 0), 0);
  assert.equal(E.percent(4, 5), 80);
  assert.equal(E.percent(15, 18), 83);
});

test('progress survives a storage round trip', () => {
  const values = new Map();
  const storage = { setItem: (key, value) => values.set(key, value), getItem: key => values.get(key) ?? null };
  const state = E.empty();
  state.read.push('reperes');
  E.record(state, 'quizzes', 'reperes', 100);
  assert.equal(E.save(storage, state), true);
  assert.deepEqual(E.load(storage, chapters), { state, available: true });
});

test('unavailable and malformed storage do not crash the course', () => {
  for (const storage of [null, { getItem() { throw new Error('Blocked'); } }, { getItem: () => '{broken' }]) {
    assert.deepEqual(E.load(storage, chapters), { state: E.empty(), available: false });
  }
  assert.equal(E.save(null, E.empty()), false);
  assert.deepEqual(E.load({ getItem: () => null }, chapters), { state: E.empty(), available: true });
});

test('unknown versions and invalid persisted records are discarded', () => {
  assert.deepEqual(E.sanitize({ version: 20 }, chapters), E.empty());
  const sanitized = E.sanitize({ version: 1, read: ['reperes', 'reperes', 'unknown'], quizzes: { reperes: { best: 1000, attempts: 2 }, tete: { best: 80, attempts: -1 }, tronc: { best: 80, attempts: 2 } } }, chapters);
  assert.deepEqual(sanitized.read, ['reperes']);
  assert.deepEqual(sanitized.quizzes, { tronc: { best: 80, attempts: 2 } });
});

test('every bone has interactive SVG geometry, and quiz markup does not disclose names', () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(readFileSync(path.join(__dirname, '../skeleton.js'), 'utf8'), context);
  const markup = context.CampusSkeleton.markup(bones);
  for (const bone of bones) {
    assert.ok(markup.includes(`data-bone="${bone.id}"`));
    assert.ok(markup.includes(`aria-label="${bone.name}"`));
  }
  const quiz = context.CampusSkeleton.markup(bones, { quiz: true, labels: true });
  assert.equal(quiz.includes('class="annotations"'), false);
  for (const bone of bones) assert.equal(quiz.includes(`aria-label="${bone.name}"`), false);
});

test('all application scripts and styles load from local files without dependencies', () => {
  const html = readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(scripts, ['data.js', 'curriculum.js', 'reminders.js', 'engine.js', 'skeleton.js', 'app.js']);
  for (const script of scripts) assert.ok(readFileSync(path.join(__dirname, '..', script)).length);
  assert.equal(/(?:src|href)="https?:/.test(html), false);
});
