(function (root) {
  const source = 'https://www.univ-angers.fr/_attachment/nouveau-contenu-simple-44/Livret%20PluriPASS%202025-2026.pdf?download=true';
  const units = [
    ['ue1', 'Biochimie, biologie moléculaire et bio-informatique', 1, '18–19', [
      ['molecules', 'Les molécules du vivant', [
        ['Glucides et lipides', 'Les oses sont des unités glucidiques ; leur assemblage forme notamment le glycogène. Les triacylglycérols stockent de l’énergie. Les phospholipides amphiphiles possèdent une tête hydrophile et des queues hydrophobes, ce qui permet la formation de bicouches. Le cholestérol module les membranes et sert de précurseur aux hormones stéroïdes.'],
        ['Protéines', 'La liaison peptidique unit les acides aminés. La séquence définit la structure primaire ; hélices et feuillets relèvent de la structure secondaire. Le repliement et les associations de sous-unités conditionnent la fonction. Une dénaturation ne signifie pas nécessairement rupture des liaisons peptidiques.'],
        ['Enzymes et cofacteurs', 'Une enzyme accélère une réaction en abaissant sa barrière d’activation sans déplacer l’équilibre thermodynamique. Un cofacteur peut être un ion ou une molécule organique, parfois dérivée d’une vitamine. Les lipoprotéines transportent des lipides dans le plasma.']
      ], [
        ['Une bicouche de phospholipides est possible grâce à…', ['Leur caractère amphiphile', 'Leur ADN', 'Leur absence de polarité', 'Leur nature exclusivement hydrophobe'], 0, 'Les têtes interagissent avec l’eau et les queues se regroupent au centre.'],
        ['Une enzyme abaisse principalement…', ['La constante d’équilibre', 'La barrière d’activation', 'Le nombre d’atomes', 'La masse des produits'], 1, 'La catalyse accélère l’atteinte de l’équilibre sans le modifier.'],
        ['La structure primaire d’une protéine correspond à…', ['Sa membrane', 'Sa forme globale', 'Sa séquence d’acides aminés', 'Son nombre de cellules'], 2, 'Il s’agit de l’ordre des acides aminés liés par des liaisons peptidiques.']
      ], 'Classez glucose, glycogène, phospholipide et hémoglobine par famille et justifiez leurs fonctions.'],
      ['genomes', 'ADN, expression et évolution', [
        ['Conserver et copier', 'L’ADN est composé de nucléotides : base, désoxyribose et phosphate. Les brins sont antiparallèles, avec appariements A–T et G–C. La réplication est semi-conservative : chaque molécule fille comporte un brin ancien. Les polymérases synthétisent dans le sens 5′ vers 3′.'],
        ['Exprimer', 'La transcription produit un ARN. Chez les eucaryotes, les ARN messagers subissent notamment coiffage, épissage et polyadénylation. La traduction lit les codons au ribosome et produit un polypeptide. Certains gènes produisent des ARN fonctionnels sans coder de protéine.'],
        ['Comparer', 'Une variante de séquence n’est pas automatiquement pathogène. Les bases de données permettent annotation et comparaison des génomes ; elles ne remplacent pas l’interprétation critique. Mutation, sélection, dérive et migrations contribuent à l’évolution. Une homologie traduit une origine commune, sans garantir une fonction identique.']
      ], [
        ['Le sens de synthèse d’un nouveau brin d’ADN est…', ['3′ vers 5′', '5′ vers 3′', 'Aléatoire', 'Toujours bidirectionnel sur le même brin'], 1, 'Les nucléotides sont ajoutés sur l’extrémité 3′.'],
        ['La traduction produit directement…', ['Un chromosome', 'Un ARN', 'Un polypeptide', 'Un intron'], 2, 'Le ribosome assemble les acides aminés selon les codons.'],
        ['Une variante génétique est…', ['Toujours pathogène', 'Toujours protectrice', 'Toujours acquise', 'Une différence de séquence à interpréter'], 3, 'L’effet dépend du contexte et des preuves disponibles.']
      ], 'Dessinez les liens entre réplication, transcription, épissage et traduction.']
    ]],
    ['ue2', 'Biologie cellulaire, reproduction et anatomie', 1, '20–22', [
      ['organites', 'Compartiments et trafic cellulaire', [
        ['Membrane et cytosol', 'La membrane sépare des milieux tout en permettant des échanges contrôlés. Le noyau contient l’essentiel du génome. Le cytosol est la phase aqueuse du cytoplasme hors organites et accueille notamment la glycolyse. Actine, microtubules et filaments intermédiaires constituent le cytosquelette.'],
        ['Organites', 'Les mitochondries participent à la production d’ATP. Les lysosomes dégradent des constituants dans un milieu acide. Les peroxysomes interviennent dans certaines oxydations et le métabolisme du peroxyde d’hydrogène. Chaque compartiment possède des fonctions et mécanismes d’adressage spécifiques.'],
        ['Trafic protéique', 'Les protéines destinées à la sécrétion empruntent le réticulum endoplasmique, le Golgi et des vésicules. Des signaux orientent les protéines vers leurs destinations. Beaucoup de protéines nucléaires et mitochondriales sont importées après traduction ; elles ne suivent pas la voie sécrétoire.']
      ], [
        ['Quel organite dégrade dans un milieu acide ?', ['Centrosome', 'Noyau', 'Lysosome', 'Nucléole'], 2, 'Les hydrolases lysosomales fonctionnent dans un compartiment acidifié.'],
        ['Une protéine sécrétée passe typiquement par…', ['Réticulum puis Golgi', 'Noyau puis mitochondrie', 'ADN puis lysosome', 'Peroxysome puis chromosome'], 0, 'La voie sécrétoire comprend réticulum, Golgi et vésicules.'],
        ['Le cytosol est…', ['L’ensemble des organites', 'La phase aqueuse hors organites du cytoplasme', 'Le noyau', 'La matrice extracellulaire'], 1, 'Le cytoplasme comprend notamment cytosol et organites, hors noyau.']
      ], 'Reconstituez le trajet d’une hormone peptidique jusqu’à sa sécrétion.'],
      ['developpement', 'Gamètes, embryon et placenta', [
        ['Méiose et premières semaines', 'La méiose associe une réplication à deux divisions : séparation des homologues puis des chromatides. La fécondation rétablit la diploïdie. Segmentation, morula et blastocyste se succèdent ; la nidation commence habituellement à la fin de la première semaine. La gastrulation de la troisième semaine met en place ectoderme, mésoderme et endoderme.'],
        ['Morphogenèse', 'La neurulation forme le tube neural, à l’origine du système nerveux central. Les replis délimitent l’embryon ; les somites organisent le mésoderme para-axial. Prolifération, migration, induction, différenciation et apoptose contribuent à la morphogenèse. Les arcs pharyngés, le tube cardiaque, les bourgeons des membres et leurs transformations demandent une étude détaillée sur les supports universitaires.'],
        ['Annexes', 'Le placenta permet des échanges entre circulations maternelle et fœtale normalement distinctes. Il n’est pas une barrière absolue aux médicaments ou aux infections. Le cordon contient habituellement deux artères et une veine ; cette veine conduit le sang vers le fœtus. Distinguez semaines de développement depuis la fécondation et semaines d’aménorrhée depuis les dernières règles.']
      ], [
        ['La méiose I sépare…', ['Les chromatides sœurs', 'Les chromosomes homologues', 'Les nucléotides', 'Les ribosomes'], 1, 'La première division est réductionnelle ; les chromatides se séparent en méiose II.'],
        ['La gastrulation établit…', ['Le seul placenta', 'Les dents', 'Trois feuillets embryonnaires', 'Le seul tube cardiaque'], 2, 'Ectoderme, mésoderme et endoderme sont les trois feuillets.'],
        ['Le cordon contient habituellement…', ['Deux artères et une veine', 'Deux veines et une artère', 'Une seule artère', 'Quatre veines'], 0, 'Les artères vont vers le placenta et la veine revient vers le fœtus.']
      ], 'Construisez une frise fécondation–morula–blastocyste–nidation–gastrulation. Complétez l’anatomie générale avec le chapitre du squelette.']
    ]],
    ['ue3', 'Chimie générale et mathématiques', 1, '24–25', [
      ['matiere', 'Atomes, liaisons et réactions', [
        ['Structure', 'Le numéro atomique Z est le nombre de protons. Des isotopes partagent Z mais diffèrent par leurs neutrons. La configuration électronique gouverne la réactivité. Une liaison covalente partage des électrons ; sa polarité dépend de l’électronégativité. Une liaison hydrogène ne se confond pas avec la liaison covalente O–H.'],
        ['Thermodynamique', 'ΔG = ΔH − TΔS, avec T en kelvins. À pression et température constantes, ΔG négatif indique un sens thermodynamiquement favorable. À l’équilibre, ΔG est nul. Une réaction favorable peut rester lente si sa barrière d’activation est élevée.'],
        ['Cinétique et eau', 'La vitesse dépend des concentrations, de la température et du mécanisme. Un catalyseur ne change pas la constante d’équilibre. La polarité de l’eau et les liaisons hydrogène expliquent ses propriétés de solvant. Dissolution ne signifie pas nécessairement dissociation en ions.']
      ], [
        ['Des isotopes partagent…', ['Les neutrons', 'Le numéro atomique', 'Le nombre de masse', 'La radioactivité obligatoirement'], 1, 'Ils ont les mêmes protons mais des nombres de neutrons différents.'],
        ['ΔG négatif signifie…', ['Réaction instantanée', 'Réaction impossible', 'Sens thermodynamiquement favorable', 'Absence obligatoire d’enzyme'], 2, 'La thermodynamique ne détermine pas seule la vitesse.'],
        ['Un catalyseur…', ['Déplace nécessairement l’équilibre', 'Crée des atomes', 'Est toujours protéique', 'Accélère l’approche de l’équilibre'], 3, 'Il abaisse la barrière d’activation sans déplacer l’équilibre.']
      ], 'Séparez vitesse et sens thermodynamique dans l’explication d’une réaction favorable mais lente.'],
      ['maths', 'Équations, fonctions et modèles', [
        ['Équations et suites', 'Pour ax²+bx+c=0 avec a non nul, le discriminant vaut b²−4ac. Il y a deux racines réelles distinctes si ce discriminant est positif. Une suite géométrique vérifie u(n)=u(0)qⁿ ; une suite arithmétique ajoute une constante à chaque étape. Distinguez croissance additive et multiplicative.'],
        ['Fonctions et calcul intégral', 'Une dérivée mesure une variation locale. La dérivée de exp(x) est exp(x) ; celle de ln(x) est 1/x pour x positif. Une primitive permet de calculer une intégrale définie. L’intégrale d’une vitesse sur un intervalle donne un déplacement. En trigonométrie, sin²(x)+cos²(x)=1.'],
        ['Modèles différentiels', 'La solution de y′=−ky, k positif, est y(t)=y(0)exp(−kt). La demi-vie est ln(2)/k. Un terme source change l’équilibre à long terme. Vérifiez une solution en la dérivant puis appliquez la condition initiale. Gardez les unités et les hypothèses du modèle.']
      ], [
        ['Pour u(0)=3 et q=2, u(2) vaut…', ['5', '6', '9', '12'], 3, '3 × 2² = 12.'],
        ['La dérivée de ln(x) est…', ['1/x', 'x', 'exp(x)', 'ln(x)/x'], 0, 'Cette identité est valable pour x>0.'],
        ['Pour y′=−ky, la demi-vie vaut…', ['k/2', 'ln(2)/k', '2k', '1/ln(k)'], 1, 'exp(−kt)=1/2 conduit à kt=ln(2).']
      ], 'Un effectif est divisé par deux toutes les quatre heures : calculez la fraction restante après douze heures.']
    ]],
    ['ue4', 'Sciences appliquées à la thérapeutique', 1, '26–27', [
      ['medicament', 'Principe actif, devenir et sécurité', [
        ['Cible et formulation', 'Un principe actif peut être synthétique, naturel ou biotechnologique. Il interagit avec une cible comme un récepteur ou une enzyme. La forme galénique associe principe actif et excipients pour une voie donnée. Naturel ne signifie pas sans risque ; un excipient peut aussi avoir des effets chez certains patients.'],
        ['Pharmacocinétique', 'ADME désigne absorption, distribution, métabolisme et excrétion. La biodisponibilité caractérise notamment la fraction de dose atteignant la circulation générale inchangée. Le premier passage peut réduire cette fraction après administration orale. La clairance est un volume de plasma épuré par unité de temps, non une quantité de médicament.'],
        ['Évaluation', 'Le rapport bénéfice–risque dépend de l’indication et de la population. La surveillance continue après l’autorisation de mise sur le marché. L’éducation thérapeutique vise des compétences utiles pour vivre avec une maladie. Cette fiche n’est pas une recommandation de traitement.']
      ], [
        ['La clairance s’exprime typiquement en…', ['mg', 'mg/L', 'L/h', 'h/L'], 2, 'C’est un débit de volume épuré.'],
        ['Le premier passage peut…', ['Réduire la biodisponibilité orale', 'Garantir 100 % de biodisponibilité', 'Supprimer la distribution', 'Supprimer tout métabolisme'], 0, 'Une partie du principe actif peut être métabolisée avant la circulation générale.'],
        ['Après l’AMM, la sécurité…', ['N’est plus étudiée', 'Reste surveillée', 'Est garantie sans risque', 'Exclut les interactions'], 1, 'La pharmacovigilance continue après commercialisation.']
      ], 'Distinguez dose, concentration et clairance avec leurs unités.'],
      ['organique', 'Fonctions et stéréochimie', [
        ['Fonctions chimiques', 'Alcools, aldéhydes, cétones, acides carboxyliques, amines et amides possèdent des groupes caractéristiques. Les amides ne se comportent pas comme de simples amines : le doublet de l’azote est délocalisé avec le carbonyle. Identifiez les fonctions avant de discuter acidité ou réactivité.'],
        ['Isomérie', 'Des isomères ont la même formule brute. Des énantiomères sont des images miroir non superposables. Un carbone tétraédrique portant quatre substituants différents peut être stéréogène. R/S ne prédit pas le signe du pouvoir rotatoire ; configuration et rotation optique sont distinctes.'],
        ['Électrons', 'L’effet inductif se transmet par les liaisons sigma et décroît avec la distance. La mésomérie décrit une délocalisation. Un nucléophile donne une paire d’électrons ; un électrophile peut l’accepter. Les flèches courbes partent des électrons, pas d’une charge positive.']
      ], [
        ['Deux énantiomères sont…', ['Toujours superposables', 'Des isotopes', 'Des images miroir non superposables', 'De formules brutes différentes'], 2, 'L’énantiomérie est une relation de stéréoisomérie.'],
        ['Un nucléophile est un…', ['Donneur de paire d’électrons', 'Donneur obligatoire de proton', 'Noyau radioactif', 'Accepteur de neutron'], 0, 'Il possède un site susceptible de fournir une paire d’électrons.'],
        ['La configuration R implique un pouvoir rotatoire positif…', ['Toujours', 'Non, pas en général', 'Seulement dans l’eau', 'Seulement à chaud'], 1, 'Les conventions R/S et +/− décrivent des propriétés différentes.']
      ], 'Dessinez un alcool, une cétone et une amide puis identifiez des sites nucléophiles et électrophiles.']
    ]],
    ['ue5', 'Sociologie et histoire', 1, '28–29', [
      ['societes', 'Normes, savoirs et inégalités de santé', [
        ['Sociologie et anthropologie', 'Une norme décrit un comportement attendu ; une valeur ce qui est jugé souhaitable. La socialisation transmet des manières de penser et d’agir tout au long de la vie. Un rôle social est associé à une position. Comprendre une pratique dans son contexte ne revient pas à l’approuver ni à réduire une personne à une culture homogène.'],
        ['Savoirs et histoire', 'Les diagnostics et traitements se transforment dans des contextes scientifiques, techniques et sociaux. Une série de cas peut suggérer une hypothèse mais ne contrôle pas tous les biais. Les savoirs d’expérience des patients éclairent le vécu sans remplacer les études d’efficacité. Les représentations du médicament influencent aussi ses usages.'],
        ['Inégalités et procréation', 'Revenus, travail, logement et accès aux soins influencent la santé. Le gradient social concerne plusieurs niveaux de position sociale. Réduire ces écarts aux seuls choix individuels ignore les contraintes. La maîtrise de la procréation a des dimensions biologiques, sociales, éthiques et juridiques à étudier conjointement.']
      ], [
        ['La socialisation…', ['S’arrête à 18 ans', 'Ne concerne que l’école', 'Peut se poursuivre toute la vie', 'Est uniquement génétique'], 2, 'Des socialisations secondaires surviennent notamment au travail.'],
        ['Une série de cas prouve à elle seule l’efficacité causale…', ['Non, elle reste exposée à des biais', 'Oui toujours', 'Oui si elle est ancienne', 'Oui sans comparateur'], 0, 'Évolution naturelle et facteurs confondants peuvent expliquer les observations.'],
        ['Le gradient social de santé concerne…', ['Uniquement les plus pauvres', 'Plusieurs niveaux de position sociale', 'Seulement le génome', 'Seulement les comportements individuels'], 1, 'Les écarts peuvent s’observer tout au long de l’échelle sociale.']
      ], 'Analysez un obstacle d’accès aux soins aux niveaux individuel, institutionnel et social.']
    ]],
    ['ue6', 'Droit, économie et science politique', 1, '30–31', [
      ['droit-economie', 'Droits, institutions et ressources', [
        ['Personne et responsabilité', 'La personnalité juridique permet d’être titulaire de droits et obligations ; elle diffère de la capacité à les exercer. La responsabilité civile vise principalement la réparation, la responsabilité pénale la sanction d’une infraction. Information et consentement sont centraux dans les droits des patients. Un dommage ne prouve pas à lui seul une faute.'],
        ['État et pouvoir', 'La science politique étudie le pouvoir, sa légitimation, les institutions et les comportements. La légalité désigne la conformité au droit ; la légitimité concerne les justifications et la reconnaissance. Élection, séparation des pouvoirs et garantie des droits sont distinctes : une élection ne résume pas toute la démocratie.'],
        ['Économie', 'Le coût d’opportunité est la valeur de la meilleure option abandonnée. Un raisonnement marginal compare coûts et bénéfices supplémentaires. Externalités, asymétries d’information et pouvoir de marché peuvent perturber les marchés. L’efficacité concerne l’utilisation des ressources, l’équité leur répartition selon des critères de justice.']
      ], [
        ['La responsabilité civile vise principalement…', ['La réparation', 'La notation', 'La création d’infractions', 'La prescription'], 0, 'Elle se distingue de la sanction pénale.'],
        ['Le coût d’opportunité correspond…', ['Au seul prix payé', 'À la meilleure alternative abandonnée', 'À la somme de tous les prix', 'Toujours à zéro'], 1, 'Utiliser une ressource implique de renoncer à une autre utilisation.'],
        ['Efficacité et équité sont…', ['Toujours synonymes', 'Deux unités monétaires', 'Deux dimensions distinctes', 'Toujours incompatibles'], 2, 'Bonne utilisation et juste répartition ne répondent pas à la même question.']
      ], 'Distinguez légalité, légitimité, efficacité et équité dans une décision publique fictive.']
    ]],
    ['ue7', 'Métabolisme, bioénergétique et génétique', 2, '32–33', [
      ['metabolisme', 'Énergie et régulation métabolique', [
        ['Couplage', 'Le catabolisme dégrade et récupère de l’énergie ; l’anabolisme construit et en consomme. L’ATP permet des couplages. NADH et NADPH transportent des équivalents réducteurs mais n’ont pas des rôles identiques. Chaque voie dépend du tissu, du compartiment et de l’état nutritionnel.'],
        ['Respiration', 'La glycolyse cytosolique produit deux pyruvates, deux ATP nets et deux NADH par glucose. Le pyruvate peut contribuer à l’acétyl-CoA mitochondrial et au cycle de Krebs. La chaîne respiratoire établit un gradient de protons exploité par l’ATP synthase. L’oxygène est l’accepteur final d’électrons.'],
        ['Régulation', 'Glycogène et triacylglycérols sont des réserves différentes. Insuline et glucagon coordonnent des flux selon l’état nutritionnel. Le foie peut libérer du glucose ; le muscle utilise son glycogène surtout pour ses propres besoins. Régulation enzymatique et expression génique agissent à des échelles de temps différentes.']
      ], [
        ['La glycolyse se déroule dans…', ['Le noyau', 'Le cytosol', 'Le lysosome', 'Le Golgi'], 1, 'Elle ne se déroule pas dans la matrice mitochondriale.'],
        ['L’accepteur final d’électrons respiratoires est…', ['Le glucose', 'Le sodium', 'L’oxygène', 'Le glycogène'], 2, 'L’oxygène est réduit en eau.'],
        ['Le gain net direct d’ATP de la glycolyse est…', ['2 par glucose', '20 par glucose', '0 toujours', '100 par glucose'], 0, 'Quatre ATP produits moins deux consommés donnent deux ATP nets.']
      ], 'Reliez les voies énergétiques en précisant leurs compartiments.'],
      ['heredite', 'Transmission et interprétation génétique', [
        ['Mendel', 'Deux parents hétérozygotes pour une même maladie autosomique récessive ont, dans le modèle simple, un risque de 1/4 d’enfant atteint à chaque grossesse. Dominant ne signifie ni fréquent ni plus grave. Les transmissions liées au sexe et mitochondriales suivent des règles différentes.'],
        ['Phénotypes', 'La pénétrance est la proportion de porteurs exprimant le phénotype. L’expressivité décrit la variabilité des manifestations. Des anomalies chromosomiques de nombre ou structure se distinguent des variants ponctuels. Un même phénotype peut avoir plusieurs causes génétiques.'],
        ['Tests', 'Un résultat négatif n’exclut pas toutes les causes génétiques. Chaque technique a des limites ; le conseil génétique accompagne l’interprétation. Diagnostic prénatal et préimplantatoire concernent des étapes différentes et sont encadrés. Cette fiche ne détermine pas leurs indications cliniques.']
      ], [
        ['Dans Aa × Aa, la probabilité de aa est…', ['100 %', '75 %', '50 %', '25 %'], 3, 'Le tableau donne 1/4 AA, 1/2 Aa et 1/4 aa.'],
        ['La pénétrance décrit…', ['La proportion de porteurs exprimant le phénotype', 'La longueur du chromosome', 'La gravité seule', 'Le nombre de ribosomes'], 0, 'L’expressivité concerne la variabilité des manifestations.'],
        ['Un test négatif…', ['Exclut toute maladie génétique', 'S’interprète selon les limites techniques', 'Prouve une infection', 'Ne demande aucun contexte'], 1, 'Toutes les causes et tous les types de variants ne sont pas détectés par chaque test.']
      ], 'Construisez un tableau mendélien puis distinguez risque d’être atteint et risque d’être porteur.']
    ]],
    ['ue8', 'Biologie cellulaire et histologie', 2, '34–35', [
      ['cellules-tissus', 'Fonctions cellulaires et organisation tissulaire', [
        ['Échanges et cycle', 'Le transport passif suit un gradient électrochimique. Un transport actif peut aller contre un gradient grâce à un couplage énergétique. Les jonctions serrées limitent les passages paracellulaires ; les communicantes relient les cytoplasmes. L’ADN est répliqué en phase S ; cyclines, CDK et points de contrôle coordonnent le cycle.'],
        ['Tissus', 'Un épithélium est formé de cellules jointives, polarisées, sur une lame basale. Le tissu conjonctif possède une matrice plus abondante. Les muscles squelettique, cardiaque et lisse ont des organisations distinctes. Neurones et glie composent le tissu nerveux ; la myéline centrale vient des oligodendrocytes, la périphérique des cellules de Schwann.'],
        ['Observer et interpréter', 'Grossissement et résolution sont distincts : agrandir ne crée pas de détails. Fixation et coloration peuvent produire des artefacts. Les anticorps servent à des immunomarquages, à l’ELISA et à la cytométrie ; des témoins sont nécessaires. Une cellule souche associe auto-renouvellement et différenciation. Un virus dépend de cellules hôtes pour se multiplier.']
      ], [
        ['La réplication de l’ADN a lieu en…', ['G1', 'S', 'G2 uniquement', 'M uniquement'], 1, 'S désigne la phase de synthèse de l’ADN.'],
        ['La myéline centrale est produite par…', ['Les hématies', 'Les plaquettes', 'Les oligodendrocytes', 'Les ostéoclastes'], 2, 'Les cellules de Schwann assurent la myéline périphérique.'],
        ['Augmenter le grossissement…', ['Ne crée pas forcément de détails résolus', 'Améliore toujours la résolution', 'Supprime les artefacts', 'Remplace les témoins'], 0, 'La résolution est la capacité à distinguer des points proches.']
      ], 'Comparez épithélium et tissu conjonctif selon cellules, matrice et organisation.']
    ]],
    ['ue9', 'Physiologie, anatomie et biophysique', 2, '36–37', [
      ['membres-fonction', 'Membres : muscles, vaisseaux et nerfs', [
        ['Membre supérieur', 'L’épaule combine mobilité et stabilisation musculaire. Le deltoïde participe à l’abduction ; la coiffe contribue au centrage huméral. Le nerf radial intervient notamment dans l’extension. Les nerfs médian et ulnaire desservent des territoires distincts, avec une organisation fonctionnelle à détailler sur les schémas du cours.'],
        ['Membre inférieur', 'Les muscles glutéaux participent aux mouvements et à la stabilité du bassin. Le quadriceps étend le genou, sous l’innervation du nerf fémoral. Les ischio-jambiers contribuent à sa flexion. Nerfs tibial et fibulaire commun proviennent du sciatique. Racine, nerf et territoire ne sont pas des notions interchangeables.'],
        ['Trajets et rapports', 'Une artère conduit le sang depuis le cœur ; une veine le ramène, quelle que soit l’oxygénation. Les membres possèdent des réseaux veineux profonds et superficiels. L’étude complète exige insertions, loges, rapports, vascularisation et innervation : l’atlas actuel reste osseux et ne représente pas ces structures.']
      ], [
        ['Le quadriceps réalise principalement…', ['La flexion du coude', 'L’extension du genou', 'La rotation de la tête', 'La flexion des doigts'], 1, 'Il étend le genou et dépend du nerf fémoral.'],
        ['Le nerf radial participe notamment à…', ['La vision', 'La mastication', 'L’extension du membre supérieur', 'L’olfaction'], 2, 'Il innerve notamment des muscles extenseurs.'],
        ['Une artère est définie par…', ['Son trajet depuis le cœur', 'Un sang toujours oxygéné', 'Une position superficielle', 'Une absence de paroi'], 0, 'Le sens du trajet, non la teneur en oxygène, définit artère et veine.']
      ], 'Reliez chaque muscle étudié en TD à une action, une loge, un nerf et ses insertions.'],
      ['regulation-fluides', 'Homéostasie, perceptions et fluides', [
        ['Régulations', 'Une boucle associe variable, capteur, intégration et effecteur. Un rétrocontrôle négatif s’oppose à une perturbation. Le milieu intérieur comprend plasma et liquide interstitiel. Thermorégulation et système autonome coordonnent des fonctions ; les effets sympathique et parasympathique dépendent des organes et récepteurs.'],
        ['Muscle et perceptions', 'Le calcium régule l’interaction actine–myosine ; l’ATP intervient dans le cycle contractile et la recapture du calcium. Un récepteur sensoriel transforme un stimulus en signal. Vision, audition, toucher, proprioception, goût et odorat ont des mécanismes distincts. La proprioception renseigne sur la position et le mouvement.'],
        ['Diffusion et écoulements', 'La diffusion nette dépend d’un gradient. La tonicité dépend des solutés effectivement non perméants à une membrane ; iso-osmolaire ne signifie pas toujours isotonique. Q=section × vitesse moyenne. Dans le modèle de Poiseuille, la résistance varie comme viscosité × longueur / rayon⁴, sous hypothèses de tube cylindrique et écoulement laminaire.']
      ], [
        ['Un rétrocontrôle négatif…', ['Amplifie toujours une perturbation', 'Détruit le capteur', 'S’oppose à une perturbation', 'Empêche toute variation'], 2, 'Il contribue à stabiliser une variable dans une plage de fonctionnement.'],
        ['Doubler le rayon dans le modèle de Poiseuille divise la résistance par…', ['16', '2', '4', '8'], 0, 'La résistance est inversement proportionnelle à r⁴.'],
        ['La proprioception renseigne sur…', ['La couleur', 'La position et le mouvement', 'Le génome', 'Le pH seul'], 1, 'Elle mobilise notamment des informations musculo-articulaires.']
      ], 'Dessinez une boucle de régulation puis vérifiez les unités de Q=section × vitesse.']
    ]],
    ['ue10', 'Statistiques et biophysique', 2, '38–39', [
      ['statistiques', 'Décrire, estimer et tester', [
        ['Description', 'Une variable qualitative décrit une catégorie ; une quantitative une quantité. La moyenne est sensible aux extrêmes, la médiane moins. Variance et écart-type décrivent la dispersion mais ont des unités différentes. Un grand échantillon n’est pas forcément représentatif.'],
        ['Probabilités et estimation', 'P(A|B) ne vaut généralement pas P(B|A). Une loi binomiale suppose des essais indépendants de même probabilité. Un intervalle de confiance décrit l’incertitude d’une procédure d’estimation ; il ne contient pas nécessairement 95 % des observations individuelles.'],
        ['Tests', 'La p-valeur est calculée sous H0 et le modèle, pas la probabilité que H0 soit vraie. α est le risque de rejeter H0 à tort ; la puissance vaut 1−β. Student, chi-deux et Mann–Whitney répondent à des questions différentes sous conditions. Une corrélation ne prouve pas la causalité.']
      ], [
        ['Quelle mesure est généralement moins sensible aux extrêmes ?', ['Moyenne', 'Médiane', 'Variance', 'Étendue'], 1, 'La médiane dépend du rang central.'],
        ['La p-valeur est…', ['La probabilité de H0', 'La taille d’effet', 'Une probabilité calculée sous H0 et le modèle', 'Le taux de guérison'], 2, 'Elle mesure le caractère extrême des données sous ces hypothèses.'],
        ['La puissance vaut…', ['1−β', 'α+β', '1/α', 'Toujours 95 %'], 0, 'C’est la probabilité de rejeter H0 pour une alternative considérée.']
      ], 'Identifiez population, échantillon, variable et hypothèses avant de choisir un test.'],
      ['rayonnements', 'Ondes, radioactivité et radiobiologie', [
        ['Ondes', 'Célérité = longueur d’onde × fréquence. L’énergie d’un photon vaut hν. Les rayons X et gamma sont des photons distingués par l’origine de leur émission ; les ultrasons sont des ondes mécaniques. Une onde transporte de l’énergie sans transport global de matière.'],
        ['Décroissance', 'N(t)=N0 exp(−λt) décrit une décroissance radioactive simple. L’activité A=λN mesure un nombre de désintégrations par seconde, en becquerels. La période physique vaut ln(2)/λ. Après deux périodes, un quart des noyaux parents subsiste.'],
        ['Interactions', 'Les rayonnements ionisants peuvent produire des lésions directes ou via des radicaux. Le gray mesure l’énergie déposée par masse (J/kg) ; le sievert concerne des grandeurs pondérées de radioprotection. Temps, distance et écrans adaptés réduisent certaines expositions. Les usages médicaux nécessitent des protocoles professionnels.']
      ], [
        ['Le becquerel mesure…', ['Une masse', 'Une dose absorbée', 'Une activité', 'Une longueur'], 2, '1 Bq = une désintégration par seconde.'],
        ['Après deux périodes, il reste…', ['1/4 des noyaux parents', '1/2', '3/4', 'Aucun'], 0, 'La population est divisée par deux à chaque période.'],
        ['Le gray correspond à…', ['Un photon par seconde', 'Un joule par kilogramme', 'Un mètre par seconde', 'Une mole par litre'], 1, 'C’est l’unité de dose absorbée.']
      ], 'Créez un tableau grandeur–unité pour activité, dose, fréquence et période.']
    ]],
    ['ue11', 'Chimie organique et analytique', 2, '40–41', [
      ['equilibres', 'Acides, bases et oxydoréduction', [
        ['Acidité', 'Un acide de Brønsted donne un proton ; une base l’accepte. Le pH est défini à partir de l’activité de H3O+, approchée par sa concentration dans une solution assez diluée. Force et concentration sont distinctes : un acide fort peut être très dilué.'],
        ['Tampons', 'Sous les approximations usuelles, pH=pKa+log([base]/[acide]). Si les concentrations sont égales, pH=pKa. Un tampon limite les variations dans une capacité finie. L’équivalence d’un titrage est stœchiométrique : son pH ne vaut pas toujours 7.'],
        ['Redox', 'Une oxydation perd des électrons ; une réduction en gagne. L’oxydant accepte les électrons et le réducteur les donne. Équilibrez les demi-équations selon le milieu, puis les électrons échangés. Vérifiez conservation des atomes et des charges.']
      ], [
        ['Si [base]=[acide], pH vaut approximativement…', ['0', '14', 'pKa', '2pKa'], 2, 'Le logarithme du rapport 1 vaut zéro.'],
        ['Une oxydation est une…', ['Perte d’électrons', 'Capture obligatoire de protons', 'Création de neutrons', 'Absence de transfert'], 0, 'Le réducteur cède des électrons en s’oxydant.'],
        ['À l’équivalence, le pH…', ['Vaut toujours 7', 'Dépend des espèces et conditions', 'Vaut toujours 0', 'Vaut toujours pKa'], 1, 'Les produits peuvent participer à d’autres équilibres acido-basiques.']
      ], 'Calculez le pH d’un tampon de pKa 6 avec un rapport base/acide de 10.'],
      ['reactivite', 'Mécanismes et hydrocarbures', [
        ['Suivre les électrons', 'Une flèche courbe à deux pointes représente une paire d’électrons. Une rupture hétérolytique attribue cette paire à un fragment ; une homolyse forme des radicaux. Délocalisation et effets électroniques influencent la stabilité des intermédiaires.'],
        ['Transformations', 'Substitution remplace un groupe, addition consomme typiquement une liaison multiple, élimination crée souvent une insaturation. SN1 et SN2 diffèrent par leurs étapes et lois de vitesse. Substrat, solvant, nucléophile et groupe partant orientent la compétition.'],
        ['Aromaticité', 'Alcanes, alcènes et alcynes diffèrent par leurs liaisons carbone–carbone. Un cycle ne suffit pas à rendre une molécule aromatique : conjugaison, géométrie et électrons π comptent. Le benzène favorise souvent des substitutions préservant l’aromaticité. Une prédiction exige les conditions de réaction.']
      ], [
        ['Une flèche courbe à deux pointes suit…', ['Une paire d’électrons', 'Un noyau entier', 'Une cellule', 'Un neutron'], 0, 'Elle part d’un doublet ou d’une liaison.'],
        ['Une addition sur un alcène consomme typiquement…', ['Un proton nucléaire', 'Une liaison π', 'Un chromosome', 'Un noyau aromatique obligatoire'], 1, 'La liaison double est transformée au profit de nouvelles liaisons sigma.'],
        ['Tout composé cyclique est-il aromatique ?', ['Oui', 'Seulement liquide', 'Non', 'Seulement avec oxygène'], 2, 'D’autres conditions électroniques et géométriques sont nécessaires.']
      ], 'Annotez une réaction de TD : donneur, accepteur, transformation et conditions.']
    ]],
    ['ue12', 'Psychologie et droit', 2, '42–43', [
      ['psychologie-droit', 'Approches de la santé et droit public', [
        ['Psychologie', 'La psychologie étudie comportements et processus mentaux par observation, entretien, expérimentation et questionnaires. Les cadres psychodynamique, comportemental, cognitif et humaniste sont distincts. Une approche biopsychosociale articule biologie, vécu et contexte sans rendre le patient responsable de sa maladie.'],
        ['Relation clinique', 'Le coping désigne des stratégies pour faire face ; leur pertinence dépend du contexte. Écoute, reformulation et questions ouvertes favorisent l’expression. Empathie ne signifie pas accord automatique. Un questionnaire nécessite validité et fidélité ; il ne suffit pas seul à poser tout diagnostic.'],
        ['Droit public', 'Le droit public organise notamment l’État et son action. Constitution, traités, lois et règlements ont des statuts distincts. Juridictions administratives et judiciaires ont des compétences différentes. Continuité, égalité et adaptation sont des principes classiques du service public. Les applications exigent des textes à jour, non cette seule fiche.']
      ], [
        ['Une approche biopsychosociale articule…', ['Uniquement les symptômes', 'Biologie, psychologie et contexte social', 'Uniquement le génome', 'Seulement la psychiatrie'], 1, 'Elle évite une explication par une seule dimension.'],
        ['Une question ouverte vise…', ['À imposer une réponse', 'À remplacer tout examen', 'À favoriser une réponse développée', 'À confirmer automatiquement une hypothèse'], 2, 'Elle laisse davantage de place à l’expression de la personne.'],
        ['La continuité est un principe classique…', ['Du service public', 'De la méiose', 'Du code génétique', 'De la réaction chimique'], 0, 'Elle s’articule avec égalité et adaptation.']
      ], 'Reformulez sans jugement un propos fictif, puis distinguez fait, interprétation et règle juridique à vérifier.']
    ]],
    ['transversales', 'Anglais et culture numérique', 0, '44–46', [
      ['anglais-numerique', 'Lire, rechercher et vérifier', [
        ['Anglais', 'Un abstract présente souvent contexte, méthodes, résultats et conclusion. Associated with n’équivaut pas à caused by ; may exprime une possibilité. Evidence signifie des preuves ou données à l’appui, actually signifie en fait. Le niveau B2 demandé couvre aussi des sujets de société, au-delà du seul vocabulaire scientifique.'],
        ['Recherche documentaire', 'Définissez concepts et synonymes. AND combine des concepts ; OR rassemble des alternatives. Vérifiez auteur, date, méthode et conflits d’intérêts. Conservez les références complètes et distinguez source primaire et synthèse. Une référence produite par une IA doit être vérifiée dans le document original.'],
        ['Données et sobriété', 'Minimisez les données collectées et limitez les accès. Pseudonymisé ne signifie pas nécessairement anonyme. Les données de santé sont particulièrement sensibles. Mots de passe uniques, mises à jour et authentification renforcée réduisent certains risques. Allonger la durée de vie des équipements contribue à la sobriété numérique.']
      ], [
        ['Associated with signifie…', ['Cause obligatoirement', 'Est associé à', 'Empêche toujours', 'Est sans rapport avec'], 1, 'Une association ne prouve pas la causalité.'],
        ['Pour rassembler des synonymes, on utilise souvent…', ['AND uniquement', 'Un mot de passe', 'OR', 'Une suppression de date'], 2, 'OR permet des formulations alternatives.'],
        ['Des données pseudonymisées…', ['Peuvent rester réidentifiables', 'Sont toujours anonymes', 'Sont forcément publiques', 'Sont sans risque'], 0, 'Une correspondance ou des recoupements peuvent permettre une réidentification.']
      ], 'Rédigez une recherche avec AND et OR puis résumez un abstract en conservant ses nuances.']
    ]],
    ['orientation', '3PE, communication et préparation aux oraux', 0, '47–50', [
      ['projet', 'Construire et présenter son projet', [
        ['Se connaître', 'Un projet relie intérêts, valeurs, compétences et contraintes. Distinguez représentation d’un métier et activités réelles. Plusieurs pistes permettent de choisir de façon documentée ; elles ne signifient pas renoncer. Les supports 3PE de l’université précisent le travail attendu.'],
        ['Enquêter', 'Interrogez un professionnel sur activités, formation, conditions d’exercice et difficultés. Croisez son témoignage avec les informations institutionnelles : une expérience individuelle n’est pas représentative de tous les exercices. Conservez des traces datées et les points à vérifier.'],
        ['Communiquer', 'Structurez situation, analyse et conclusion. Distinguez fait et opinion. Reconnaître une incertitude est préférable à inventer une réponse. Écoutez les relances. Travaillez les mini-entrevues avec les consignes locales et le tutorat ; aucun scénario d’admission n’est garanti par cette application.']
      ], [
        ['Un témoignage professionnel…', ['Représente tous les exercices', 'Doit être croisé avec d’autres sources', 'Remplace toute enquête', 'Est toujours inutile'], 1, 'Il donne une expérience située.'],
        ['Face à une information inconnue à l’oral, il vaut mieux…', ['Inventer', 'Affirmer une certitude', 'Expliciter la limite et raisonner prudemment', 'Ignorer la question'], 2, 'Une limite reconnue évite de construire sur un fait inventé.'],
        ['Un projet documenté relie…', ['Intérêts, compétences et réalités des formations', 'Uniquement le prestige', 'Une seule note', 'Un témoignage non vérifié'], 0, 'Il croise connaissance de soi et connaissance des parcours.']
      ], 'Préparez trois questions à un professionnel puis présentez votre projet en deux minutes.']
    ]]
  ];
  const chapters = units.map(([id, title, semester, pages, courses]) => ({
    id, title: `${id.startsWith('ue') ? id.toUpperCase() + ' · ' : ''}${title}`,
    subject: semester ? `PluriPASS · Semestre ${semester}` : 'PluriPASS · Transversal', semester, source, sourcePages: pages,
    description: 'Fondations et auto-évaluation. Couverture partielle à approfondir avec les cours et TD de la faculté.',
    coverage: 'foundation', examPerLesson: 2,
    lessons: courses.map(([id, title, sections, checks, practice]) => ({
      id, title, subtitle: 'Fiche de fondation · Angers', duration: 15, icon: '✧', region: 'all', bones: [], sections, practice,
      objectives: sections.map(([heading]) => `Expliquer : ${heading.toLowerCase()}.`),
      questions: checks.map(([prompt, choices, answer, explanation], index) => ({ id: `${id}-q${index + 1}`, prompt, choices, answer, explanation, bone: null }))
    }))
  }));
  const options = ['Activités sportives 1 et 2', 'Adolescence et santé', 'Anglais perfectionnement', 'Biomatériaux dentaires', 'Biodiversanté', 'Chimie : histoire, origines de la vie et applications à la santé', 'Droit et éthique en santé', 'Droit : institutions administratives', 'Imagerie médicale numérique', 'Initiation au droit public : approfondissement', 'Droit : institutions juridictionnelles', 'Introduction à l’économie de la santé', 'Macroéconomie', 'Maïeutique', 'Maladies infectieuses : interaction homme/animal/environnement', 'Management en série', 'Droit : méthodologie juridique', 'Microéconomie', 'Migrations et santé', 'Modélisation mathématique des épidémies', 'Nanosciences et santé', 'Neurosciences appliquées à la santé', 'Précarité et vulnérabilité sociales', 'Prévention des violences sexuelles', 'Réadaptation, inclusion et santé', 'Santé au travail', 'Vulnérabilités psychologiques de l’enfant'];
  const data = { chapters, options, source, academicYear: '2025–2026' };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.CampusCurriculum = data;
})(globalThis);
