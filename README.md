# Ostéo Campus

Une application francophone de fondations pour PluriPASS à Angers, avec atlas du squelette, quiz et examens. Sans compte, sans serveur, sans dépendance applicative et utilisable hors ligne.

## Angers et Android : état de cette version

- **28 cours/fiches, 15 chapitres et 96 questions** : 6 cours du squelette et 22 fiches supplémentaires, avec quiz et examen dans chaque chapitre.
- Repérage des **12 UE de PluriPASS Angers**, de l’anglais, de la culture numérique, du 3PE et de la communication, fondé sur le **livret officiel 2025–2026**. L’année d’inscription de l’étudiante n’a pas été précisée ; vérifiez sa maquette.
- **Ce n’est pas l’intégralité des cours de première année.** Les fiches sont des fondations originales à couverture partielle. Les 27 UEO sont listées mais leurs cours ne sont pas intégrés ; les supports détaillés Moodle, les TD, les modalités d’évaluation et les choix d’UEO restent nécessaires pour compléter fidèlement le programme.
- Les nouveaux quiz ont 3 QCM à réponse unique ; les examens tirent 2 questions par fiche, sans doublon. Le seuil de 80 % est interne à l’application, pas le barème universitaire.
- **Projet Android natif ajouté** : notifications locales quotidiennes à heure aléatoire, plage configurable, cours tiré parmi les cours lus ou maîtrisés, ouverture du quiz au toucher. Aucun serveur push ni migration de l’interface n’est nécessaire.
- Le fichier HTML reste utilisable sans notifications d’arrière-plan. Pour les rappels, il faut construire et installer l’APK : voir [le guide Android](android/README.md). La CI fournit un APK de développement téléchargeable lorsqu’elle réussit ; les notifications restent à valider sur téléphone.

## Ouvrir l’application

1. Téléchargez le dépôt depuis GitHub avec **Code → Download ZIP** sur la branche contenant l’application.
2. Décompressez entièrement l’archive, en conservant les fichiers dans le même dossier.
3. Ouvrez `index.html` dans un navigateur moderne (Chrome, Edge, Firefox ou Safari).

Aucune installation de Node, aucune commande et aucune connexion Internet ne sont nécessaires pour utiliser les cours. Les liens de références externes nécessitent Internet. Sur téléphone, utilisez un navigateur capable d’ouvrir les fichiers HTML locaux ; les restrictions d’ouverture de fichiers dépendent du système.

La progression est stockée uniquement dans `localStorage`, dans ce navigateur. Les règles de stockage des fichiers locaux dépendent du navigateur ; changer de dossier, de navigateur ou effacer ses données peut faire perdre l’accès à la progression. Si le stockage est bloqué, une alerte apparaît et l’application continue en mémoire pendant la session. Une tentative de quiz ou d’examen en cours n’est pas sauvegardée après rechargement ou changement de page.

## Le premier chapitre : le squelette

| Cours | Objectif | Durée indicative |
| --- | --- | --- |
| Les repères essentiels | Fonctions, divisions et position anatomique | 12 min |
| Le crâne et la face | Neurocrâne, face, mandibule et hyoïde | 15 min |
| Le rachis et le thorax | Étages du rachis, côtes et sternum | 18 min |
| Le membre supérieur | Ceinture scapulaire, bras, avant-bras et main | 18 min |
| Le bassin et le membre inférieur | Transmission du poids, jambe et pied | 18 min |
| Relier les connaissances | Articulations et comparaison fonctionnelle | 12 min |

- Atlas SVG original : 27 os ou groupes, sélection bilatérale, recherche avec synonymes et sans distinction d’accents, filtres, zoom, noms masquables et fiches localisation / fonction / repère.
- Chaque cours : objectifs, explications, exercice de repérage et quiz de 5 questions (4 QCM à réponse unique + 1 repérage sur le squelette).
- Examen : 18 questions, tirées de façon équilibrée dans les banques des cours (2 QCM + 1 repérage par cours), sans doublon. Les corrections apparaissent seulement à la fin.
- Correction expliquée, liens vers les cours à revoir, nouvelles tentatives, meilleur score et progression locale.
- Seuil pédagogique : 80 %. Les cours restent accessibles librement ; « lu » et « maîtrisé » sont deux états distincts.
- Interface adaptative, accès clavier aux zones (Tab puis Entrée ou Espace), état sélectionné accessible, navigation d’évitement et mise en page d’impression des cours.

## Limites pédagogiques et références

Ce parcours est **introductif** et ne constitue pas un programme exhaustif PASS/LAS. Le schéma est une vue antérieure 2D simplifiée, non à l’échelle, avec rachis et scapulas visibles par transparence. Il regroupe certains os et n’inclut ni tous les reliefs, ni les foramens, ni les osselets de l’ouïe. Il ne remplace pas un atlas anatomique détaillé ou les cours de la faculté. L’examen réutilise les banques des quiz : ce n’est pas une certification indépendante.

Les textes, questions et tracés sont rédigés pour cette application. Les références de lecture sont disponibles dans **Sources & méthode**, notamment [OpenStax, Anatomy and Physiology 2e](https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction) (chapitres 7 et 8) et [FIPAT](https://fipat.library.dal.ca/) pour la terminologie. Une relecture par un enseignant d’anatomie est recommandée avant tout usage évaluatif.

## Architecture et enrichissement

- `index.html` : point d’entrée, scripts classiques pour permettre l’ouverture locale.
- `data.js` : chapitre historique du squelette, cours, os et banques de questions.
- `curriculum.js` : 12 UE et transversales Angers, couverture partielle explicitement indiquée, références au livret et liste d’UEO.
- `reminders.js` : sélection des cours appris et interface avec le pont Android.
- `android/` : WebView locale isolée, planificateur, permissions, réception et annulation des notifications.
- `engine.js` : tirage des examens, scores, validation et stockage de la progression.
- `skeleton.js` : géométrie et génération du schéma SVG.
- `app.js` : navigation par fragment, pages et interactions.
- `styles.css` : thème, mises en page adaptatives et impression.
- `tests/` : invariants des contenus, moteur et scénario navigateur.

### Ajouter un cours

Ajoutez un objet à `chapter.lessons` dans `data.js`, avec un `id` unique et stable, `title`, `subtitle`, `duration`, `icon`, `region`, `bones`, `objectives`, `sections`, `practice` et `questions`. Les sections sont des paires `[titre, texte]`. Les identifiants dans `bones` correspondent au catalogue et aux zones définies dans `skeleton.js`.

Une question textuelle possède `id`, `prompt`, `choices` (quatre réponses), `answer` (index commençant à zéro), `explanation` et `bone: null`. Une question visuelle utilise `bone` (identifiant de la zone), `choices: []` et `answer: 0` ; le moteur compare la zone sélectionnée à `bone`. Le nom n’apparaît pas dans les libellés accessibles du schéma pendant l’évaluation.

Chaque cours doit fournir suffisamment de questions pour `examPerLesson`. Les cours du squelette incluent une question visuelle ; les fiches textuelles utilisent `bones: []` et uniquement des QCM. Les cartes, la navigation, les scores et l’examen sont calculés à partir des données. Les identifiants existants ne doivent pas changer si l’on souhaite conserver les résultats locaux.

### Ajouter un chapitre

Ajoutez un objet au catalogue avec `id`, `title`, `subject`, `description`, `lessons` et `examPerLesson`. Pour les nouvelles UE, suivez la structure `units` de `curriculum.js`, avec semestre, pages de référence, fiches, exercices et QCM. L’accueil et la progression affichent les chapitres ; chaque chapitre reçoit son propre examen et ses résultats. Les cours sans os présentent leur référence et leurs limites plutôt qu’un squelette hors sujet. Un autre atlas interactif (muscles, neurologie, etc.) demande un développement spécifique.

## Vérification

Le workflow GitHub Actions **Tests et APK Android** s’exécute sur les pull requests et les changements de la branche principale actuelle (`vibe/anatomie-interactive-479d12`). Il exécute les tests JavaScript, les tests Java du calendrier des rappels, la compilation Android et le lint, puis vérifie le contenu web embarqué. Il ne publie ni sur le Play Store ni sur un serveur.

Pour récupérer l’APK : ouvrez **Actions → Tests et APK Android → une exécution réussie → Artifacts → osteo-campus-debug-…**, téléchargez et décompressez l’archive. Les artefacts sont conservés 14 jours ; une connexion GitHub est nécessaire. Voir [les précautions d’installation Android](android/README.md). Cette CI ne remplace pas les essais sur téléphone et n’exécute pas le scénario navigateur Playwright.

Avec Node.js 22 ou supérieur, sans `npm install` :

```sh
npm test
npm run check
```

Les tests contrôlent les identifiants, références anatomiques internes, réponses, équilibre de l’examen, absence de doublons, seuil de maîtrise, tentatives, persistance et repli en cas de stockage indisponible. Ils ne valident pas scientifiquement le contenu.

Le scénario optionnel `tests/browser_smoke.py` nécessite Python avec Playwright et un navigateur Chromium déjà installés. Il ouvre directement le fichier local, sans serveur :

```sh
python3 tests/browser_smoke.py
```

Ce scénario couvre le lancement hors ligne, les recherches et filtres, le clavier, les quiz et l’examen, la sauvegarde, la réinitialisation, les formats 320/390/768/1440 px, l’absence de requêtes réseau applicatives et le stockage bloqué. Les captures sont temporaires et ne font pas partie du dépôt.
