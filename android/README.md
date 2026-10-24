# Android : application locale et rappels

Ce projet conserve l’interface HTML et ajoute une enveloppe Android native Java, sans bibliothèque applicative supplémentaire. **Un APK de développement est produit par chaque CI réussie ; il n’est pas validé sur appareil par ces tests.** Android 8 (API 26) minimum.

## Télécharger l’APK de la CI

Dans GitHub, ouvrez **Actions → Tests et APK Android**, choisissez une exécution réussie correspondant à la révision souhaitée, puis téléchargez l’artefact **osteo-campus-debug-…**. Décompressez-le pour obtenir `app-debug.apk`. Les artefacts expirent après 14 jours et leur téléchargement nécessite une connexion GitHub. Les rapports lint sont joints séparément.

Cet APK est signé avec une clé de développement éphémère du runner, **pas une signature de production stable**. Deux exécutions peuvent produire des signatures différentes : Android peut alors refuser une mise à jour directe. Désinstaller pour réinstaller efface la progression ; ne le faites pas sans accepter cette perte. L’APK sert aux essais, pas à une distribution durable. La CI ne publie pas de version Play Store, n’utilise pas de secret de signature et ne teste pas les notifications sur appareil.

## Construire et installer

Prérequis : Android Studio, JDK 17, Android SDK 35 et Gradle 8.9 (compatible avec Android Gradle Plugin 8.7.3). Aucun wrapper binaire Gradle n’est enregistré dans ce dépôt. Configurez l’installation locale de Gradle dans Android Studio ou utilisez votre Gradle installé.

Ouvrez le dossier `android` dans Android Studio. Avec les outils installés :

```sh
cd android
gradle :app:assembleDebug
```

La tâche copie automatiquement les seuls fichiers web nécessaires dans les assets de l’application. L’APK de développement se trouve dans `app/build/outputs/apk/debug/app-debug.apk`. Transférez cet APK sur votre téléphone, autorisez l’installation pour la source de confiance utilisée et ouvrez-le. Aucun déploiement, publication Play Store ou signature de production n’est effectué par ce dépôt. Ne partagez jamais de clé de signature dans Git.

Pour une distribution durable, conservez une signature stable et préparez une version de diffusion après les tests sur appareil. Désinstaller l’application supprime ses données. Les scores du fichier HTML ouvert dans Chrome ne sont pas automatiquement transférés : le stockage Android est séparé.

## Utiliser les rappels

1. Lisez un cours et marquez-le comme lu, ou obtenez au moins 80 % à son quiz.
2. Ouvrez **Rappels**, choisissez une plage (par défaut 9 h–20 h) et activez.
3. Accordez l’autorisation de notification demandée sur Android 13 et versions suivantes.
4. Un horaire est choisi aléatoirement pour le lendemain. Au déclenchement, un cours est choisi au hasard parmi les cours éligibles actuellement enregistrés.
5. Touchez la notification pour ouvrir son quiz.

Un seul rappel par jour est planifié, sans heure exacte garantie, avec `AlarmManager.setAndAllowWhileIdle`. Il ne nécessite pas l’autorisation d’alarme exacte. Un rappel reçu après la fin de la plage ou un autre jour est ignoré et replanifié pour le lendemain ; aucun rattrapage massif. Les changements de fuseau ou d’heure replanifient pour le lendemain. Le redémarrage et la mise à jour réinstallent l’alarme. Désactiver annule l’alarme et retire la notification. Vider la progression supprime les cours éligibles et annule les rappels tant qu’aucun cours n’est appris.

Les restrictions batterie, la mise en veille, l’arrêt forcé ou la révocation des autorisations peuvent retarder ou empêcher les notifications. Après un arrêt forcé, rouvrez l’application. Si les notifications ou leur canal ont été désactivés dans les réglages Android, réactivez-les et rouvrez l’application. Le titre du cours peut être visible selon les réglages de confidentialité de l’écran verrouillé.

## Isolation et confidentialité

- Aucune permission Internet, aucun service distant, aucun compte, aucune télémétrie.
- Les assets sont interceptés dans la WebView sous une origine HTTPS synthétique `.invalid`, sans résolution réseau ni serveur. Ce n’est pas une adresse accessible ou un hébergement.
- Les accès fichiers et contenus arbitraires sont désactivés. Les ressources hors origine sont bloquées ; les références HTTPS se consultent dans le navigateur externe, sans pont JavaScript.
- Le pont ne reçoit que des identifiants/titres de cours éligibles et des réglages ; les scores détaillés restent dans le stockage local de la WebView.
- Receivers privés, intents de notification explicites et immuables, identifiants filtrés avant navigation.
- Autorisation demandée uniquement à l’activation volontaire ; rappels désactivés par défaut.

## Vérification

Le test de calcul de dates ne dépend pas du SDK Android :

```sh
mkdir -p /tmp/campus-java-tests
javac -d /tmp/campus-java-tests app/src/main/java/fr/osteocampus/ReminderSchedule.java tests/ReminderScheduleTest.java
java -cp /tmp/campus-java-tests ReminderScheduleTest
```

Puis :

```sh
gradle :app:assembleDebug :app:lintDebug
```

Tests manuels indispensables avant distribution : API 26 et 33+, acceptation/refus de permission, canal désactivé, application fermée, écran verrouillé, redémarrage, changement d’heure/fuseau, annulation, progression vide, nouveaux cours appris, ouverture du bon quiz depuis la notification et liens externes sans accès au pont. Contrôlez aussi l’affichage avec navigation gestuelle et grandes tailles de police.

Le workflow `.github/workflows/ci.yml` installe JDK 17, Gradle 8.9 et le SDK Android 35 sur un runner Ubuntu, exécute le test Java ci-dessus, compile et lance le lint. Il vérifie que chaque fichier web attendu est identique dans l’APK et dans la révision testée. Le résultat de chaque exécution fait foi ; les tests de réception réelle restent manuels. Dans l’environnement local de réalisation, Java/Gradle et le SDK Android ne sont pas disponibles. Le scénario navigateur est également bloqué par la bibliothèque système `libglib-2.0.so.0` manquante. Les tests Node contrôlent les données, pages, scores et échanges JavaScript du pont, pas la livraison effective d’une notification Android.
