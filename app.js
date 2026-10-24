const { bones } = CampusData;
const chapters = [...CampusData.chapters, ...CampusCurriculum.chapters];
let chapterFilter = 'all';
const E = CampusEngine;
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const loaded = E.load(storage, chapters);
let progress = loaded.state;
let storageAvailable = loaded.available;
let selectedBone = 'femur';
let filter = 'all';
let search = '';
let labels = true;
let zoom = 1;
let activeQuiz = null;
let currentRoute = location.hash;
const app = document.querySelector('#app');
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const allLessons = chapters.flatMap(chapter => chapter.lessons);
const chapterOf = lesson => chapters.find(chapter => chapter.lessons.some(item => item.id === lesson.id));
const icon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 3h8v26h-8zM3 12h26v8H3z" fill="currentColor"/><circle cx="16" cy="16" r="4" fill="#234f43"/></svg>';
function persist() {
  storageAvailable = E.save(storage, progress);
  CampusReminders.sync(progress, allLessons);
}
function route() {
  const [page = 'parcours', id] = location.hash.replace(/^#\/?/, '').split('/');
  return { page: page || 'parcours', id };
}
function navLink(page, symbol, label) {
  const active = route().page === page || (page === 'parcours' && ['cours', 'quiz', 'examen'].includes(route().page));
  return `<a href="#/${page}" class="nav-link ${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><span aria-hidden="true">${symbol}</span>${label}${active ? '<i></i>' : ''}</a>`;
}
function render() {
  const { page, id } = route();
  const count = allLessons.filter(lesson => E.mastered(progress, lesson.id)).length;
  app.innerHTML = `<aside class="sidebar"><a class="brand" href="#/parcours"><span class="brand-icon">${icon}</span><span>ostéo<span class="brand-light">campus</span><small>LE CORPS, PAS À PAS.</small></span></a><div class="workspace-tag"><span class="small-dot"></span> Espace d’apprentissage</div><p class="nav-caption">MON ESPACE</p><nav aria-label="Navigation principale">${navLink('parcours', '▦', 'Mon parcours')}${navLink('atlas', '♧', 'Atlas interactif')}${navLink('progression', '↗', 'Ma progression')}${navLink('rappels', '◷', 'Rappels')}</nav><div class="sidebar-course"><span class="nav-caption">EN CE MOMENT</span><p>PluriPASS · Angers</p><div class="mini-track"><span style="width:${E.percent(count, allLessons.length)}%"></span></div><small>${count} / ${allLessons.length} cours maîtrisés</small></div><div class="sidebar-bottom"><div class="tip-icon">✧</div><strong>Un peu, chaque jour.</strong><p>La régularité fait toute la différence. Prenez le temps de comprendre.</p><a href="#/sources">Sources & méthode <span>↗</span></a><div class="profile"><span>É</span><div>Mon espace personnel<small>Premiers pas en médecine</small></div></div></div></aside><div class="main-shell"><header class="topbar"><div><span>PluriPASS Angers</span><span class="breadcrumb-separator">/</span><strong>${page === 'atlas' ? 'Atlas interactif' : page === 'progression' ? 'Ma progression' : page === 'sources' ? 'Sources & méthode' : page === 'rappels' ? 'Rappels' : 'Mon parcours'}</strong></div><span class="local-badge"><span class="small-dot"></span> À votre rythme · Sans compte</span></header><main id="main" tabindex="-1">${!storageAvailable ? '<div class="notice" role="status">La sauvegarde locale est indisponible. Votre progression sera conservée seulement pendant cette session.</div>' : ''}${content(page, id)}</main><footer>Conçu pour comprendre, pas seulement retenir.<span>Initiation à l’anatomie · À compléter avec les cours de votre faculté</span></footer></div>`;
  bind(page, id);
}
function content(page, id) {
  if (page === 'atlas') return atlasPage();
  if (page === 'progression') return progressPage();
  if (page === 'sources') return sourcesPage();
  if (page === 'rappels') return remindersPage();
  if (page === 'cours') {
    const lesson = allLessons.find(item => item.id === id);
    return lesson ? lessonPage(lesson) : notFound();
  }
  if (page === 'quiz' || page === 'examen') {
    const target = page === 'quiz' ? allLessons.find(item => item.id === id) : chapters.find(item => item.id === id);
    if (!target) return notFound();
    if (!activeQuiz || activeQuiz.key !== `${page}/${id}`) activeQuiz = { key: `${page}/${id}`, exam: page === 'examen', target, questions: page === 'examen' ? E.examQuestions(target) : target.questions.map(question => ({ ...question, lessonId: target.id })), index: 0, answers: [], selected: null, revealed: false, done: false };
    return quizPage();
  }
  if (page !== 'parcours') return notFound();
  return homePage();
}
function notFound() { return '<section class="page-heading"><h1>Cette page n’existe pas.</h1><a class="button primary" href="#/parcours">Retrouver mon parcours</a></section>'; }
function homePage() {
  const visible = chapters.filter(chapter => chapterFilter === 'all' || chapter.id === chapterFilter || String(chapter.semester) === chapterFilter);
  return `<section class="welcome"><div><p class="eyebrow">PLURIPASS · UNIVERSITÉ D’ANGERS</p><h1>Préparer son année.<br><em>Un repère à la fois.</em></h1><p>${allLessons.length} cours et fiches · Quiz corrigés · Un examen par chapitre</p></div></section><section class="notice"><strong>Fondations, pas programme intégral.</strong> Les 12 UE et les enseignements transversaux sont repérés d’après le <a href="${CampusCurriculum.source}" target="_blank" rel="noreferrer">livret officiel 2025–2026</a>. Les fiches ne couvrent pas tous les détails, exercices et exigences. L’année de votre inscription et vos supports Moodle restent prioritaires.</section><label for="chapter-filter">Afficher les chapitres</label><select id="chapter-filter">${[['all', 'Tous'], ['squelette', 'Atlas et squelette'], ['1', 'Semestre 1'], ['2', 'Semestre 2'], ['0', 'Transversales']].map(([value, label]) => `<option value="${value}" ${chapterFilter === value ? 'selected' : ''}>${label}</option>`).join('')}</select>${visible.map(chapter => chapter.id === 'squelette' ? chapterCard(chapter) : curriculumCard(chapter)).join('')}<section class="notice"><h2>UE optionnelles · À compléter selon vos choix</h2><p>Une UEO au S1 et deux au S2 dans le livret de référence. Leurs cours ne sont pas intégrés : les intitulés ne valent pas couverture pédagogique.</p><details><summary>Voir les 27 options du livret</summary><ul>${CampusCurriculum.options.map(option => `<li>${esc(option)}</li>`).join('')}</ul></details></section>`;
}
function curriculumCard(chapter) {
  const next = chapter.lessons.find(lesson => !E.mastered(progress, lesson.id)) || chapter.lessons[0];
  return `<section class="curriculum-card"><div class="section-title"><div><p class="eyebrow">${esc(chapter.subject)} · COUVERTURE PARTIELLE</p><h2>${esc(chapter.title)}</h2></div><a class="button outline" href="#/examen/${chapter.id}">Examen · ${chapter.lessons.length * chapter.examPerLesson} questions →</a></div><p class="small-text">${esc(chapter.description)} <a href="${chapter.source}" target="_blank" rel="noreferrer">Référence : pages ${chapter.sourcePages} ↗</a></p><div class="lesson-grid">${chapter.lessons.map((lesson, index) => lessonCard(lesson, index, next.id)).join('')}</div></section>`;
}
function remindersPage() {
  const status = CampusReminders.status();
  const count = CampusReminders.learned(progress, allLessons).length;
  return `<section class="page-heading"><p class="eyebrow">RAPPEL ACTIF</p><h1>Mes rappels de révision.</h1><p>Un cours tiré au hasard parmi les cours lus ou maîtrisés (quiz ≥ 80 %).</p></section><section class="objectives"><p>${count} cours éligible(s). Un rappel quotidien, à une heure aléatoire dans la plage choisie, à partir du lendemain.</p><p>${status.supported ? `Notifications Android : ${status.permission ? 'autorisées' : 'non autorisées'}. Rappels : ${status.enabled ? 'activés' : 'désactivés'}.` : 'Dans un navigateur ou un fichier HTML, les rappels en arrière-plan sont indisponibles. Utilisez la version Android installée ; aucun serveur ni abonnement n’est nécessaire.'}</p><form id="reminder-form"><label><input id="reminder-enabled" type="checkbox" ${status.enabled ? 'checked' : ''} ${status.supported ? '' : 'disabled'}> Activer les rappels quotidiens</label><div class="reminder-hours"><label>À partir de (heure)<input id="reminder-start" type="number" min="0" max="23" required value="${status.start}"></label><label>Avant (heure)<input id="reminder-end" type="number" min="1" max="24" required value="${status.end}"></label></div><button class="button primary" ${status.supported ? '' : 'disabled'}>Enregistrer</button></form><p id="reminder-feedback" role="status"></p>${status.next ? `<p>Prochain créneau prévu : ${esc(new Date(status.next).toLocaleString('fr-FR'))} (heure indicative).</p>` : ''}<p class="small-text">Android peut retarder ou supprimer un rappel (économie de batterie, notifications désactivées, arrêt forcé). Les rappels en retard hors plage sont ignorés. Désactiver annule le prochain rappel. Réinitialiser la progression vide les cours éligibles. Le titre du cours peut apparaître sur l’écran verrouillé.</p></section>`;
}
function chapterCard(chapter) {
  const completed = chapter.lessons.filter(lesson => E.mastered(progress, lesson.id)).length;
  const next = chapter.lessons.find(lesson => !E.mastered(progress, lesson.id)) || chapter.lessons[0];
  const exam = progress.exams[chapter.id];
  return `<section class="chapter-hero"><div class="chapter-copy"><div class="hero-tags"><span class="tag light">CHAPITRE ${String(chapters.indexOf(chapter) + 1).padStart(2, '0')}</span><span>${esc(chapter.subject)} · Fondations</span></div><h2>${esc(chapter.title)}</h2><p>${esc(chapter.description)}</p><div class="hero-meta"><span>▤ ${chapter.lessons.length} cours progressifs</span><span>◷ ${chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} min environ</span><span>✓ 1 examen final</span></div><a class="button cream" href="#/cours/${next.id}">${completed ? 'Continuer mon parcours' : 'Commencer le chapitre'} <span>↗</span></a><div class="hero-progress"><span>${completed} cours maîtrisé${completed > 1 ? 's' : ''} sur ${chapter.lessons.length}</span><div class="mini-track"><span style="width:${E.percent(completed, chapter.lessons.length)}%"></span></div></div></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="art-cross cross-one">+</div><div class="art-cross cross-two">+</div><div class="hero-skeleton">${CampusSkeleton.markup(bones, { scope: `hero-${chapter.id}` }).replace(/tabindex="0"/g, 'tabindex="-1"')}</div><span class="art-label label-one"><i></i>206 os</span><span class="art-label label-two">Une architecture vivante <i></i></span></div></section><div class="section-title"><div><p class="eyebrow">COMPRENDRE, ÉTAPE PAR ÉTAPE</p><h2>Votre parcours d’apprentissage</h2></div><span>${chapter.lessons.length} étapes pour les essentiels</span></div><div class="lesson-grid">${chapter.lessons.map((lesson, index) => lessonCard(lesson, index, next.id)).join('')}</div><section class="exam-banner"><div class="exam-icon">✧</div><div><p class="eyebrow">LE MOMENT DE FAIRE LE POINT</p><h3>L’examen du chapitre</h3><p>${chapter.lessons.length * chapter.examPerLesson} questions · ${chapter.id === 'squelette' ? 'Repérage visuel & QCM' : 'QCM de fondation'} · Correction détaillée</p><small>${exam ? `Meilleur score : ${exam.best} % · ${exam.attempts} tentative(s)` : 'Conseillé après les cours · Accessible à tout moment'}</small></div><a class="button outline" href="#/examen/${chapter.id}">Passer l’examen <span>→</span></a></section>`;
}
function lessonCard(lesson, index, nextId) {
  const mastered = E.mastered(progress, lesson.id);
  const read = progress.read.includes(lesson.id);
  const score = progress.quizzes[lesson.id];
  return `<a class="lesson-card ${lesson.id === nextId ? 'recommended' : ''}" href="#/cours/${lesson.id}"><div class="card-top"><span class="lesson-symbol" aria-hidden="true">${lesson.icon}</span><span class="lesson-status ${mastered ? 'complete' : ''}">${mastered ? '✓ Maîtrisé' : read ? 'À consolider' : lesson.id === nextId ? 'À découvrir' : `${String(index + 1).padStart(2, '0')}`}</span></div><p class="lesson-number">COURS ${String(index + 1).padStart(2, '0')}</p><h3>${esc(lesson.title)}</h3><p class="card-description">${esc(lesson.subtitle)}</p><div class="card-bottom"><span>◷ ${lesson.duration} min <i>·</i> ${score ? `${score.best} % au quiz` : 'Quiz inclus'}</span><span class="card-arrow">↗</span></div></a>`;
}
function lessonPage(lesson) {
  const chapter = chapterOf(lesson);
  const index = chapter.lessons.indexOf(lesson);
  const read = progress.read.includes(lesson.id);
  return `<a class="back-link" href="#/parcours">← ${esc(chapter.title)}</a><section class="page-heading"><p class="eyebrow">COURS ${String(index + 1).padStart(2, '0')} / ${String(chapter.lessons.length).padStart(2, '0')} · ${lesson.duration} MINUTES</p><h1>${esc(lesson.title)}</h1><p>${esc(lesson.subtitle)}</p></section><div class="course-layout ${lesson.bones.length ? '' : 'text-course'}"><article class="course-content"><section class="objectives"><p class="eyebrow">À LA FIN DE CE COURS</p><ul>${lesson.objectives.map(objective => `<li>${esc(objective)}</li>`).join('')}</ul></section>${lesson.sections.map(([title, text], i) => `<section class="reading-section"><span class="section-index">${String(i + 1).padStart(2, '0')}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></section>`).join('')}<section class="practice-box"><span>◎</span><div><h3>À vous de pratiquer</h3><p>${esc(lesson.practice)}</p></div></section><div class="course-actions"><button class="button ${read ? 'outline' : 'primary'}" id="mark-read" ${read ? 'disabled' : ''}>${read ? '✓ Cours lu' : 'Marquer comme lu'}</button><a class="button primary" href="#/quiz/${lesson.id}">Tester mes connaissances →</a></div><p class="small-text">Le cours est « maîtrisé » à partir de 80 % au quiz. Vous pouvez avancer librement.</p><div class="lesson-pagination">${index ? `<a href="#/cours/${chapter.lessons[index - 1].id}">← Cours précédent</a>` : '<span></span>'}${index < chapter.lessons.length - 1 ? `<a href="#/cours/${chapter.lessons[index + 1].id}">Cours suivant →</a>` : `<a href="#/examen/${chapter.id}">Examen du chapitre →</a>`}</div></article>${lesson.bones.length ? `<aside class="course-atlas"><div class="panel-heading"><div><p class="eyebrow">OBSERVER POUR COMPRENDRE</p><h3>Votre atlas de poche</h3></div><a href="#/atlas" aria-label="Ouvrir le grand atlas">↗</a></div><div class="pocket-skeleton">${CampusSkeleton.markup(bones, { selected: selectedBone, region: lesson.region, scope: 'course' })}</div><p class="small-text centered">Vue antérieure · Schéma simplifié par transparence</p><div class="bone-chips">${lesson.bones.map(id => `<button class="chip ${selectedBone === id ? 'active' : ''}" data-select-bone="${id}">${esc(bones.find(bone => bone.id === id).name)}</button>`).join('')}</div><div id="bone-detail" aria-live="polite">${boneDetail()}</div></aside>` : `<aside class="objectives"><h3>Couverture partielle</h3><p>Cette fiche pose les fondations ; elle ne remplace pas les cours et TD universitaires.</p><a href="${chapter.source}" target="_blank" rel="noreferrer">Livret Angers 2025–2026 · pages ${chapter.sourcePages} ↗</a></aside>`}</div>`;
}
function boneDetail() {
  const bone = bones.find(item => item.id === selectedBone);
  return `<section class="bone-detail"><span class="tag ${bone.division}">${bone.division === 'axial' ? 'Squelette axial' : 'Squelette appendiculaire'}</span><h2>${esc(bone.name)}</h2><dl><dt>LOCALISATION</dt><dd>${esc(bone.location)}</dd><dt>FONCTION</dt><dd>${esc(bone.role)}</dd><dt>LE REPÈRE À RETENIR</dt><dd>${esc(bone.note)}</dd></dl></section>`;
}
function atlasPage() {
  return `<section class="page-heading atlas-heading"><div><p class="eyebrow">LA THÉORIE PREND FORME</p><h1>Explorez le squelette.</h1><p>Cliquez sur un os. Découvrez son nom, sa place et son rôle.</p></div><span class="tag neutral">${bones.length} os ou groupes à explorer</span></section><div class="atlas-layout"><section class="atlas-stage"><div class="atlas-toolbar"><div class="segmented" aria-label="Filtrer le squelette">${[['all', 'Tout'], ['axial', 'Axial'], ['appendicular', 'Appendiculaire']].map(([value, label]) => `<button data-filter="${value}" aria-pressed="${filter === value}" class="${filter === value ? 'active' : ''}">${label}</button>`).join('')}</div><label class="toggle"><input id="labels" type="checkbox" ${labels ? 'checked' : ''}> Noms</label></div><div class="atlas-canvas"><span class="orientation left">DROITE DU SUJET</span><span class="orientation right">GAUCHE DU SUJET</span><div id="skeleton-view" style="width:${zoom * 100}%">${CampusSkeleton.markup(bones, { selected: selectedBone, region: filter, labels, scope: 'atlas' })}</div></div><div class="atlas-controls"><span><i class="legend-dot"></i> Axial <i class="legend-dot appendicular"></i> Appendiculaire</span><div><button id="zoom-out" aria-label="Dézoomer" ${zoom <= 1 ? 'disabled' : ''}>−</button><span>${Math.round(zoom * 100)} %</span><button id="zoom-in" aria-label="Zoomer" ${zoom >= 1.8 ? 'disabled' : ''}>+</button></div></div><p class="atlas-caption">Vue antérieure schématique, non à l’échelle. Rachis et scapulas visibles par transparence. Les groupes ne détaillent pas tous les os.</p></section><aside class="atlas-side"><div class="search-box"><span aria-hidden="true">⌕</span><input id="bone-search" type="search" value="${esc(search)}" placeholder="Rechercher un os…" aria-label="Rechercher un os ou une région"></div><label class="region-label" for="region">Région anatomique</label><select id="region">${[['all', 'Toutes les régions'], ['Tête', 'Tête et cou'], ['Tronc', 'Rachis et thorax'], ['Membre supérieur', 'Membre supérieur'], ['Membre inférieur', 'Bassin et membre inférieur'], ['axial', 'Squelette axial'], ['appendicular', 'Squelette appendiculaire']].map(([value, label]) => `<option value="${value}" ${filter === value ? 'selected' : ''}>${label}</option>`).join('')}</select><div id="bone-list" class="bone-list">${boneList()}</div><div id="bone-detail" aria-live="polite">${boneDetail()}</div></aside></div><div class="notice">Astuce : masquez les noms, sélectionnez un os et essayez d’en donner la fonction avant de lire sa fiche. Toutes les zones sont aussi accessibles au clavier (Tab, Entrée).</div>`;
}
function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
function boneList() {
  const result = bones.filter(bone => (filter === 'all' || bone.region === filter || bone.division === filter) && normalize(`${bone.name} ${bone.region} ${bone.note}`).includes(normalize(search)));
  return result.length ? result.map(bone => `<button data-select-bone="${bone.id}" class="bone-list-item ${selectedBone === bone.id ? 'active' : ''}" aria-pressed="${selectedBone === bone.id}"><span class="legend-dot ${bone.division}"></span>${esc(bone.name)}<span>↗</span></button>`).join('') : '<p class="small-text">Aucun os trouvé. Essayez une autre région ou un autre nom.</p>';
}
function quizPage() {
  const quiz = activeQuiz;
  if (quiz.done) return resultsPage();
  const question = quiz.questions[quiz.index];
  const correct = quiz.selected === (question.bone || question.answer);
  return `<a class="back-link" href="${quiz.exam ? '#/parcours' : `#/cours/${quiz.target.id}`}">← ${quiz.exam ? 'Quitter l’examen' : 'Retour au cours'}</a><section class="page-heading"><p class="eyebrow">${quiz.exam ? 'EXAMEN DU CHAPITRE' : 'RAPPEL ACTIF · QUIZ DU COURS'}</p><h1>${esc(quiz.target.title)}</h1><p>${quiz.exam ? 'Une réponse par question. Les corrections apparaîtront à la fin. Sans chronomètre.' : 'Une réponse par question. Comprenez vos erreurs grâce à la correction immédiate.'}</p></section><section class="quiz-panel"><div class="quiz-progress"><span>Question ${quiz.index + 1} <span class="muted">/ ${quiz.questions.length}</span></span><span class="tag neutral">${question.bone ? 'Repérage visuel' : 'Choix unique'}</span></div><div class="mini-track"><span style="width:${E.percent(quiz.index, quiz.questions.length)}%"></span></div><h2 id="question-heading" tabindex="-1">${esc(question.prompt)}</h2>${question.bone ? `<div class="visual-question"><div class="quiz-skeleton">${CampusSkeleton.markup(bones, { selected: quiz.selected || '', quiz: true, scope: 'quiz' })}</div><div><p>Cliquez sur la zone correspondante, puis validez.</p><p class="small-text">Pour les os pairs, les deux côtés sont acceptés. Le rachis et les scapulas sont visibles par transparence.</p><p id="selection-status" class="selection-status" aria-live="polite">${quiz.selected ? 'Une zone est sélectionnée.' : 'Aucune zone sélectionnée.'}</p></div></div>` : `<div class="choices" role="group" aria-labelledby="question-heading">${question.choices.map((choice, i) => `<button class="choice ${quiz.selected === i ? 'selected' : ''} ${quiz.revealed && i === question.answer ? 'correct' : ''} ${quiz.revealed && quiz.selected === i && !correct ? 'incorrect' : ''}" data-choice="${i}" aria-pressed="${quiz.selected === i}" ${quiz.revealed ? 'disabled' : ''}><span>${String.fromCharCode(65 + i)}</span>${esc(choice)}</button>`).join('')}</div>`}${quiz.revealed ? `<div class="feedback ${correct ? 'success' : 'error'}" role="status"><strong>${correct ? '✓ Bien vu !' : 'À retenir pour la prochaine fois'}</strong><p>${esc(question.explanation)}</p>${question.bone ? `<p>Réponse : <strong>${esc(bones.find(bone => bone.id === question.bone).name)}</strong></p>` : ''}</div>` : ''}<div class="quiz-bottom"><span class="small-text">${quiz.exam ? '1 point par réponse correcte · Aucun point négatif' : 'Objectif : au moins 80 % de bonnes réponses'}</span><button id="quiz-submit" class="button primary" ${quiz.selected === null ? 'disabled' : ''}>${quiz.revealed ? quiz.index === quiz.questions.length - 1 ? 'Voir mon résultat →' : 'Question suivante →' : quiz.exam ? quiz.index === quiz.questions.length - 1 ? 'Terminer l’examen →' : 'Confirmer et continuer →' : 'Valider ma réponse'}</button></div></section>`;
}
function submitAnswer() {
  const quiz = activeQuiz;
  if (quiz.selected === null || quiz.done) return;
  if (!quiz.revealed) {
    const question = quiz.questions[quiz.index];
    quiz.answers.push({ selected: quiz.selected, correct: quiz.selected === (question.bone || question.answer) });
    if (!quiz.exam) { quiz.revealed = true; render(); document.querySelector('.feedback')?.scrollIntoView({ block: 'nearest' }); return; }
  }
  if (quiz.index === quiz.questions.length - 1) {
    quiz.done = true;
    E.record(progress, quiz.exam ? 'exams' : 'quizzes', quiz.target.id, E.percent(quiz.answers.filter(answer => answer.correct).length, quiz.questions.length));
    persist();
  } else { quiz.index++; quiz.selected = null; quiz.revealed = false; }
  render();
  const heading = document.querySelector(quiz.done ? '#result-heading' : '#question-heading');
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: 'center' });
}
function resultsPage() {
  const quiz = activeQuiz;
  const score = E.percent(quiz.answers.filter(answer => answer.correct).length, quiz.questions.length);
  const passed = score >= 80;
  const chapter = quiz.exam ? quiz.target : chapterOf(quiz.target);
  const next = !quiz.exam ? chapter.lessons[chapter.lessons.indexOf(quiz.target) + 1] : null;
  const weak = [...new Set(quiz.questions.filter((_, i) => !quiz.answers[i].correct).map(question => question.lessonId))];
  const answerLabel = (question, selected) => question.bone ? bones.find(bone => bone.id === selected).name : question.choices[selected];
  return `<section class="result-hero"><p class="eyebrow">${quiz.exam ? 'EXAMEN TERMINÉ' : 'QUIZ TERMINÉ'}</p><div class="score-circle ${passed ? 'passed' : ''}">${score}<span>%</span></div><h1 id="result-heading" tabindex="-1">${passed ? 'De belles bases se construisent.' : 'Chaque erreur est un repère en plus.'}</h1><p>${quiz.answers.filter(answer => answer.correct).length} bonnes réponses sur ${quiz.questions.length} · ${passed ? quiz.exam ? 'Objectif du chapitre atteint' : 'Cours maîtrisé' : 'Objectif : 80 % — reprenez les points ci-dessous'}</p><div class="result-actions"><button id="retry-quiz" class="button outline">Recommencer ${quiz.exam ? 'l’examen' : 'le quiz'}</button><a class="button primary" href="${next ? `#/cours/${next.id}` : quiz.exam ? '#/progression' : `#/examen/${chapter.id}`}">${next ? 'Cours suivant' : quiz.exam ? 'Voir ma progression' : 'Passer l’examen'} →</a></div></section>${weak.length ? `<section class="review-links"><h2>À revoir en priorité</h2><div class="bone-chips">${weak.map(id => `<a class="chip" href="#/cours/${id}">${esc(allLessons.find(lesson => lesson.id === id).title)} ↗</a>`).join('')}</div></section>` : ''}<section class="corrections"><h2>Votre correction détaillée</h2>${quiz.questions.map((question, i) => `<article class="correction"><span class="correction-icon ${quiz.answers[i].correct ? 'success' : 'error'}">${quiz.answers[i].correct ? '✓' : '×'}</span><div><p class="eyebrow">QUESTION ${i + 1}</p><h3>${esc(question.prompt)}</h3><p>Votre réponse : <strong>${esc(answerLabel(question, quiz.answers[i].selected))}</strong></p>${!quiz.answers[i].correct ? `<p>Réponse attendue : <strong>${esc(answerLabel(question, question.bone || question.answer))}</strong></p>` : ''}<p class="correction-explanation">${esc(question.explanation)}</p></div></article>`).join('')}</section>`;
}
function progressPage() {
  const count = allLessons.filter(lesson => E.mastered(progress, lesson.id)).length;
  const attempts = Object.values(progress.quizzes).reduce((sum, record) => sum + record.attempts, 0);
  return `<section class="page-heading"><p class="eyebrow">CHAQUE PETIT PAS COMPTE</p><h1>Votre progression.</h1><p>Retrouvez vos acquis et les notions à consolider.</p></section><div class="stats-grid"><div><strong>${progress.read.length}<small> / ${allLessons.length}</small></strong><span>Cours lus</span></div><div><strong>${count}<small> / ${allLessons.length}</small></strong><span>Cours maîtrisés (≥ 80 %)</span></div><div><strong>${attempts}</strong><span>Quiz terminés</span></div></div>${chapters.map(chapter => `<section class="progress-chapter"><div class="section-title"><h2>${esc(chapter.title)}</h2><span>${E.percent(chapter.lessons.filter(lesson => E.mastered(progress, lesson.id)).length, chapter.lessons.length)} % maîtrisé</span></div>${chapter.lessons.map((lesson, i) => `<a class="progress-row" href="#/cours/${lesson.id}"><span class="progress-number">${String(i + 1).padStart(2, '0')}</span><div><strong>${esc(lesson.title)}</strong><small>${progress.read.includes(lesson.id) ? 'Cours lu' : 'À lire'} · ${progress.quizzes[lesson.id] ? `${progress.quizzes[lesson.id].attempts} quiz terminé(s)` : 'Quiz à découvrir'}</small></div><span class="tag ${E.mastered(progress, lesson.id) ? 'complete' : 'neutral'}">${progress.quizzes[lesson.id] ? `${progress.quizzes[lesson.id].best} %` : '—'}</span><span>↗</span></a>`).join('')}<div class="progress-exam"><div><h3>Examen du chapitre</h3><p>${progress.exams[chapter.id] ? `Meilleur score : ${progress.exams[chapter.id].best} % · ${progress.exams[chapter.id].attempts} tentative(s)` : 'Un bilan transversal pour relier vos connaissances.'}</p></div><a class="button outline" href="#/examen/${chapter.id}">Passer l’examen →</a></div></section>`).join('')}<section class="notice"><strong>Votre progression reste chez vous.</strong> Elle est enregistrée dans ce navigateur uniquement, sans compte ni envoi de données. Utilisez le même navigateur et la même adresse pour la retrouver. Effacer les données du navigateur la supprime.</section><button id="reset-progress" class="text-button danger">Réinitialiser ma progression</button>`;
}
function sourcesPage() {
  return `<section class="page-heading"><p class="eyebrow">APPRENDRE AVEC DISCERNEMENT</p><h1>Sources & méthode.</h1><p>Un premier socle de repères, à compléter et à approfondir.</p></section><article class="sources-content"><section class="notice"><strong>Angers : PluriPASS.</strong> Catalogue fondé sur le <a href="${CampusCurriculum.source}" target="_blank" rel="noreferrer">livret étudiant 2025–2026, pages 8–9 et 18–50</a>. Les nouveaux textes et QCM sont des synthèses originales de fondation, pas les cours officiels. Chaque UE comporte une couverture partielle ; les UEO ne sont pas enseignées ici. Aucune validation par l’université n’est revendiquée. Les examens de l’application ne reproduisent ni le barème ni toutes les formes d’épreuves locales.</section><h2>Le chapitre du squelette : un parcours introductif</h2><p>Les six cours progressent des repères généraux vers les régions du corps, puis vers une synthèse fonctionnelle. Chaque cours propose quatre QCM à réponse unique et une question de repérage visuel. L’examen tire trois questions par cours, dont une visuelle, dans les mêmes banques : il sert à réviser, pas à certifier un niveau universitaire.</p><h2>Comment utiliser l’atlas ?</h2><p>Les dessins vectoriels originaux sont des schémas pédagogiques simplifiés en vue antérieure, non à l’échelle. Le rachis et les scapulas sont montrés par transparence ; plusieurs petits os sont regroupés. Ce n’est ni un modèle 3D ni un atlas anatomique exhaustif : les reliefs, foramens, osselets de l’ouïe et rapports profonds doivent être étudiés dans un atlas de référence. Les côtés sont ceux du sujet en position anatomique.</p><h2>Des repères de référence</h2><ul class="source-list"><li><a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system" target="_blank" rel="noreferrer">OpenStax — Divisions du squelette ↗</a><p>Pour approfondir les fonctions et la distinction axial / appendiculaire.</p></li><li><a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/7-introduction" target="_blank" rel="noreferrer">OpenStax — Squelette axial (chapitre 7) ↗</a><p>Crâne, colonne vertébrale et cage thoracique.</p></li><li><a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/8-introduction" target="_blank" rel="noreferrer">OpenStax — Squelette appendiculaire (chapitre 8) ↗</a><p>Ceintures, membres supérieurs et membres inférieurs.</p></li><li><a href="https://fipat.library.dal.ca/" target="_blank" rel="noreferrer">FIPAT — Terminologie anatomique internationale ↗</a><p>Référence pour la nomenclature anatomique. Les anciens noms courants sont précisés lorsqu’ils facilitent l’apprentissage.</p></li></ul><h2>Une routine de rappel actif</h2><p>Lisez un cours, localisez les os, puis passez le quiz sans consulter les fiches. Expliquez vos erreurs avec vos propres mots. Revenez après 1, 3 et 7 jours pour renforcer la mémorisation. Le seuil de 80 % est un repère pédagogique propre à cette application.</p><div class="notice">Contenu éducatif général, sans avis médical. Les chiffres correspondent à l’anatomie adulte habituelle et admettent des variations. Faites primer le programme et la terminologie de votre faculté ; une relecture enseignante est recommandée avant un usage évaluatif.</div></article>`;
}
function selectBone(id) {
  if (activeQuiz && ['quiz', 'examen'].includes(route().page) && !activeQuiz.done) {
    if (activeQuiz.revealed) return;
    activeQuiz.selected = id;
    document.querySelector('#selection-status').textContent = 'Une zone est sélectionnée.';
    document.querySelector('#quiz-submit').disabled = false;
  } else {
    selectedBone = id;
    document.querySelector('#bone-detail').innerHTML = boneDetail();
    if (document.querySelector('#bone-list')) document.querySelector('#bone-list').innerHTML = boneList();
    document.querySelectorAll('[data-select-bone]').forEach(button => {
      button.classList.toggle('active', button.dataset.selectBone === id);
      button.setAttribute('aria-pressed', String(button.dataset.selectBone === id));
    });
  }
  document.querySelectorAll('.bone').forEach(bone => {
    bone.classList.toggle('selected', bone.dataset.bone === id);
    bone.setAttribute('aria-pressed', String(bone.dataset.bone === id));
  });
}
function bind(page, id) {
  document.querySelector('#chapter-filter')?.addEventListener('change', event => { chapterFilter = event.target.value; render(); document.querySelector('#chapter-filter').focus(); });
  document.querySelector('#reminder-form')?.addEventListener('submit', event => {
    event.preventDefault();
    try {
      CampusReminders.sync(progress, allLessons);
      CampusReminders.configure(document.querySelector('#reminder-enabled').checked, Number(document.querySelector('#reminder-start').value), Number(document.querySelector('#reminder-end').value));
      render();
      document.querySelector('#reminder-feedback').textContent = 'Réglages transmis à Android. Si une autorisation est demandée, confirmez-la pour recevoir les rappels.';
    } catch (error) { document.querySelector('#reminder-feedback').textContent = error.message; }
  });
  document.querySelector('#mark-read')?.addEventListener('click', () => {
    if (!progress.read.includes(id)) progress.read.push(id);
    persist(); render();
  });
  document.querySelector('#bone-search')?.addEventListener('input', event => { search = event.target.value; document.querySelector('#bone-list').innerHTML = boneList(); });
  document.querySelector('#region')?.addEventListener('change', event => { filter = event.target.value; render(); document.querySelector('#region').focus(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; render(); document.querySelector(`[data-filter="${filter}"]`).focus(); }));
  document.querySelector('#labels')?.addEventListener('change', event => { labels = event.target.checked; render(); document.querySelector('#labels').focus(); });
  for (const [id, delta] of [['zoom-in', .2], ['zoom-out', -.2]]) document.getElementById(id)?.addEventListener('click', () => { zoom = Math.round(Math.min(1.8, Math.max(1, zoom + delta)) * 10) / 10; render(); document.getElementById(id).focus(); });
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    activeQuiz.selected = Number(button.dataset.choice);
    document.querySelectorAll('[data-choice]').forEach(choice => { choice.classList.toggle('selected', choice === button); choice.setAttribute('aria-pressed', String(choice === button)); });
    document.querySelector('#quiz-submit').disabled = false;
  }));
  document.querySelector('#quiz-submit')?.addEventListener('click', submitAnswer);
  document.querySelector('#retry-quiz')?.addEventListener('click', () => { activeQuiz = null; render(); document.querySelector('#main').focus(); });
  document.querySelector('#reset-progress')?.addEventListener('click', () => {
    if (window.confirm('Effacer tous les cours lus, scores de quiz et résultats d’examen de ce navigateur ? Cette action est irréversible.')) { progress = E.empty(); activeQuiz = null; persist(); render(); }
  });
}
app.addEventListener('click', event => {
  const bone = event.target.closest('[data-bone], [data-select-bone]');
  if (bone && !bone.closest('[aria-hidden="true"]')) selectBone(bone.dataset.bone || bone.dataset.selectBone);
  const link = event.target.closest('a[href^="#/"]');
  if (link && activeQuiz && !activeQuiz.done && location.hash !== link.getAttribute('href') && ['quiz', 'examen'].includes(route().page)) {
    if (!window.confirm('Quitter cette évaluation ? Les réponses de cette tentative ne seront pas sauvegardées.')) event.preventDefault();
  }
});
app.addEventListener('keydown', event => {
  const bone = event.target.closest('[data-bone]');
  if (bone && ['Enter', ' '].includes(event.key)) { event.preventDefault(); selectBone(bone.dataset.bone); }
});
window.addEventListener('hashchange', () => {
  if (location.hash !== currentRoute) activeQuiz = null;
  currentRoute = location.hash;
  const lesson = route().page === 'cours' && allLessons.find(item => item.id === route().id);
  if (lesson?.bones?.length) selectedBone = lesson.bones[0];
  render(); window.scrollTo(0, 0); document.querySelector('#main').focus({ preventScroll: true });
});
const initialLesson = route().page === 'cours' && allLessons.find(item => item.id === route().id);
if (initialLesson?.bones?.length) selectedBone = initialLesson.bones[0];
CampusReminders.sync(progress, allLessons);
window.addEventListener('reminders-status', () => { if (route().page === 'rappels') render(); });
render();
