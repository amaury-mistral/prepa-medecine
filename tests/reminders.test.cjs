const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const R = require('../reminders.js');
const C = require('../curriculum.js');
const E = require('../engine.js');

test('only read or mastered lessons are eligible, without duplicates or unknown IDs', () => {
  const lessons = [{ id: 'read', title: 'Lu' }, { id: 'mastered', title: 'Acquis' }, { id: 'failed', title: 'Échec' }, { id: 'new', title: 'Nouveau' }];
  const state = { read: ['read', 'read', 'unknown'], quizzes: { read: { best: 100 }, mastered: { best: 80 }, failed: { best: 79 } } };
  assert.deepEqual(R.learned(state, lessons).map(item => item.id), ['read', 'mastered']);
  assert.deepEqual(R.learned(E.empty(), lessons), []);
});

test('browser explicitly reports no background notification support', () => {
  assert.equal(R.status().supported, false);
  assert.throws(() => R.configure(true, 9, 20), /Android/);
  assert.doesNotThrow(() => R.sync(E.empty(), []));
});

test('native bridge receives validated configuration and empty progress on reset', () => {
  const calls = [];
  const context = { AndroidReminders: {
    configure: (...args) => calls.push(args),
    syncLearned: value => calls.push(JSON.parse(value)),
    status: () => JSON.stringify({ supported: true, enabled: false })
  } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../reminders.js'), 'utf8'), context);
  const api = context.CampusReminders;
  assert.equal(api.status().supported, true);
  for (const [start, end] of [[20, 9], [9, 9], [-1, 20], [9, 25], [1.5, 20], [NaN, 20]]) assert.throws(() => api.configure(true, start, end));
  assert.equal(calls.length, 0);
  api.configure(true, 9, 20);
  api.configure(false, 9, 20);
  api.sync(E.empty(), []);
  assert.deepEqual(calls, [[true, 9, 20], [false, 9, 20], []]);
});

test('Angers catalogue accounts for 12 UEs, transversals and explicitly unimplemented options', () => {
  for (let number = 1; number <= 12; number++) {
    const chapter = C.chapters.find(item => item.id === `ue${number}`);
    assert.ok(chapter);
    assert.equal(chapter.semester, number <= 6 ? 1 : 2);
    assert.equal(chapter.coverage, 'foundation');
    assert.ok(chapter.sourcePages);
    assert.equal(chapter.source, C.source);
  }
  assert.equal(C.options.length, 27);
  assert.equal(C.academicYear, '2025–2026');
  assert.ok(C.chapters.find(item => item.id === 'orientation'));
  assert.ok(C.chapters.find(item => item.id === 'transversales'));
});

test('native manifest does not permit network or exact alarms and receivers are private', () => {
  const manifest = fs.readFileSync(path.join(__dirname, '../android/app/src/main/AndroidManifest.xml'), 'utf8');
  assert.equal(manifest.includes('android.permission.INTERNET'), false);
  assert.equal(manifest.includes('SCHEDULE_EXACT_ALARM'), false);
  assert.equal((manifest.match(/<receiver[^>]+android:exported="false"/g) || []).length, 2);
});
