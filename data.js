(function (root) {
  const bones = [
    ['cranium', 'Neurocrâne', 'axial', 'Tête', 'Partie supérieure et postérieure du crâne.', 'Enveloppe protectrice de l’encéphale.', '8 os : frontal, occipital, sphénoïde, ethmoïde, deux pariétaux et deux temporaux. Le schéma les regroupe.'],
    ['face', 'Massif facial', 'axial', 'Tête', 'Partie antérieure du crâne, autour des orbites, du nez et de la bouche.', 'Forme les cavités de la face et soutient les dents supérieures.', 'Le squelette facial compte 14 os, mandibule comprise. Les maxillaires et les zygomatiques sont pairs.'],
    ['mandible', 'Mandibule', 'axial', 'Tête', 'Mâchoire inférieure, articulée avec les os temporaux.', 'Porte les dents inférieures et participe à la mastication.', 'Un os impair. Son articulation avec le temporal est l’articulation temporo-mandibulaire.'],
    ['hyoid', 'Os hyoïde', 'axial', 'Tête', 'Dans le cou, sous la mandibule et au-dessus du larynx.', 'Point d’ancrage pour des muscles de la langue et de la déglutition.', 'Il ne s’articule directement avec aucun autre os.'],
    ['cervical', 'Vertèbres cervicales', 'axial', 'Tronc', 'Dans le cou, entre le crâne et le thorax.', 'Soutiennent la tête, permettent sa mobilité et protègent la moelle spinale.', '7 vertèbres : C1 (atlas) porte le crâne ; C2 (axis) participe à la rotation de la tête.'],
    ['thoracic', 'Vertèbres thoraciques', 'axial', 'Tronc', 'Dans le dos, en regard du thorax.', 'Participent au soutien du tronc et s’articulent avec les côtes.', '12 vertèbres, de T1 à T12.'],
    ['lumbar', 'Vertèbres lombaires', 'axial', 'Tronc', 'Dans le bas du dos, entre le thorax et le sacrum.', 'Supportent une part importante du poids du tronc.', '5 vertèbres, de L1 à L5, à corps vertébral volumineux.'],
    ['sacrum', 'Sacrum', 'axial', 'Tronc', 'À la base du rachis, entre les deux os coxaux.', 'Transmet les charges du rachis à la ceinture pelvienne.', 'Résulte habituellement de la fusion de 5 vertèbres sacrales ; appartient au squelette axial.'],
    ['coccyx', 'Coccyx', 'axial', 'Tronc', 'À l’extrémité inférieure du rachis, sous le sacrum.', 'Zone d’insertion de ligaments et de muscles du plancher pelvien.', 'Généralement 4 vertèbres fusionnées, avec des variations individuelles.'],
    ['ribs', 'Côtes', 'axial', 'Tronc', 'De chaque côté du thorax, reliées en arrière aux vertèbres thoraciques.', 'Protègent les viscères thoraciques et participent aux mouvements respiratoires.', '12 paires : 1–7 vraies, 8–10 à attache sternale indirecte, 11–12 flottantes. Les cartilages costaux ne sont pas des os.'],
    ['sternum', 'Sternum', 'axial', 'Tronc', 'Sur la ligne médiane, à l’avant du thorax.', 'Protège le thorax et reçoit les cartilages costaux ainsi que les clavicules.', 'Comprend le manubrium, le corps et le processus xiphoïde.'],
    ['clavicle', 'Clavicule', 'appendicular', 'Membre supérieur', 'À la base du cou, entre sternum et scapula.', 'Maintient l’épaule à distance du thorax et transmet les forces du membre supérieur.', 'Os pair de la ceinture scapulaire, avec une forme en S.'],
    ['scapula', 'Scapula', 'appendicular', 'Membre supérieur', 'À la face postérieure du thorax ; partiellement visible ici par transparence.', 'Offre des insertions musculaires et une cavité glénoïdale pour l’humérus.', 'Ancien nom : omoplate. La clavicule et la scapula forment la ceinture scapulaire.'],
    ['humerus', 'Humérus', 'appendicular', 'Membre supérieur', 'Dans le bras, entre épaule et coude.', 'Levier du bras ; participe aux articulations de l’épaule et du coude.', 'Ne pas confondre bras (un os) et avant-bras (deux os).'],
    ['radius', 'Radius', 'appendicular', 'Membre supérieur', 'Dans l’avant-bras, du côté du pouce en position anatomique.', 'Participe à la prono-supination et transmet les charges de la main.', 'Latéral en position anatomique ; tourne autour de l’ulna lors de la pronation.'],
    ['ulna', 'Ulna', 'appendicular', 'Membre supérieur', 'Dans l’avant-bras, du côté de l’auriculaire en position anatomique.', 'Stabilise le coude et participe à la prono-supination.', 'Ancien nom : cubitus. L’olécrâne forme la saillie postérieure du coude.'],
    ['carpals', 'Os du carpe', 'appendicular', 'Membre supérieur', 'Au poignet, entre avant-bras et métacarpe.', 'Associent mobilité du poignet et transmission des forces.', '8 os par main : scaphoïde, lunatum, triquétrum, pisiforme, trapèze, trapézoïde, capitatum et hamatum.'],
    ['metacarpals', 'Métacarpiens', 'appendicular', 'Membre supérieur', 'Dans la paume, entre carpe et phalanges.', 'Constituent l’armature de la paume.', '5 par main, numérotés de I à V du pouce à l’auriculaire.'],
    ['hand-phalanges', 'Phalanges de la main', 'appendicular', 'Membre supérieur', 'Dans les doigts, au-delà des métacarpiens.', 'Permettent la préhension et la motricité fine.', '14 par main : 2 pour le pouce, 3 pour chacun des autres doigts.'],
    ['coxal', 'Os coxal', 'appendicular', 'Membre inférieur', 'De chaque côté du bassin, entre sacrum et fémur.', 'Transmet le poids vers les membres inférieurs et protège les organes pelviens.', 'Chaque os coxal réunit ilium, ischium et pubis. L’acétabulum reçoit la tête du fémur.'],
    ['femur', 'Fémur', 'appendicular', 'Membre inférieur', 'Dans la cuisse, entre hanche et genou.', 'Supporte le poids et sert de levier à la marche.', 'Le plus long os du corps. Sa tête s’articule avec l’acétabulum de l’os coxal.'],
    ['patella', 'Patella', 'appendicular', 'Membre inférieur', 'À l’avant du genou, dans le tendon du quadriceps.', 'Augmente le bras de levier du quadriceps pour l’extension du genou.', 'Ancien nom : rotule. C’est un os sésamoïde.'],
    ['tibia', 'Tibia', 'appendicular', 'Membre inférieur', 'Du côté médial de la jambe, entre genou et cheville.', 'Principal os porteur de la jambe.', 'Sa partie distale forme la malléole médiale. La jambe désigne le segment genou–cheville.'],
    ['fibula', 'Fibula', 'appendicular', 'Membre inférieur', 'Du côté latéral de la jambe, parallèle au tibia.', 'Sert aux insertions musculaires et contribue à la stabilité de la cheville.', 'Ancien nom : péroné. Forme la malléole latérale et ne s’articule pas avec le fémur.'],
    ['tarsals', 'Os du tarse', 'appendicular', 'Membre inférieur', 'À l’arrière du pied et dans sa partie moyenne.', 'Transmettent le poids et participent aux arches du pied.', '7 par pied : talus, calcanéus, naviculaire, cuboïde et 3 cunéiformes. Le talus reçoit le tibia ; le calcanéus forme le talon.'],
    ['metatarsals', 'Métatarsiens', 'appendicular', 'Membre inférieur', 'Entre tarse et phalanges des orteils.', 'Participent à l’appui et à la propulsion du pied.', '5 par pied, numérotés de I à V du gros orteil vers le petit.'],
    ['foot-phalanges', 'Phalanges du pied', 'appendicular', 'Membre inférieur', 'Dans les orteils.', 'Participent à l’équilibre et à la propulsion.', '14 par pied : 2 pour l’hallux (gros orteil), 3 pour chacun des autres orteils.']
  ].map(([id, name, division, region, location, role, note]) => ({ id, name, division, region, location, role, note }));

  const q = (id, prompt, choices, answer, explanation, bone = null) => ({ id, prompt, choices, answer, explanation, bone });
  const lessons = [
    {
      id: 'reperes', title: 'Les repères essentiels', subtitle: 'Comprendre avant de mémoriser', duration: 12, icon: '◎', region: 'all', bones: ['cranium', 'sternum', 'coxal', 'femur'],
      objectives: ['Distinguer squelette axial et appendiculaire.', 'S’orienter en position anatomique.', 'Relier la structure osseuse à ses fonctions.'],
      sections: [
        ['Une charpente vivante', 'Le squelette adulte compte classiquement 206 os, avec des variations individuelles. Il soutient le corps, protège des organes et fournit des leviers aux muscles. Le tissu osseux constitue aussi une réserve de calcium et de phosphate ; la moelle rouge assure la production des cellules sanguines.'],
        ['Deux ensembles complémentaires', 'Le squelette axial (80 os) comprend le crâne, les osselets de l’ouïe, l’os hyoïde, le rachis et la cage thoracique. Le squelette appendiculaire (126 os) comprend les ceintures scapulaire et pelvienne et les membres. Attention : le sacrum est axial, les os coxaux sont appendiculaires.'],
        ['S’orienter sans ambiguïté', 'En position anatomique, le sujet est debout, face à l’observateur, bras le long du corps et paumes vers l’avant. Droite et gauche sont celles du sujet : sa droite est à votre gauche. Médial signifie proche du plan médian ; latéral, éloigné de celui-ci. Proximal et distal indiquent la proximité ou l’éloignement de l’attache du membre.'],
        ['Quatre formes à reconnaître', 'Un os long, comme le fémur, possède une diaphyse et deux épiphyses. Les os courts, comme ceux du carpe, ont des dimensions comparables. Les os plats, comme le sternum, offrent protection et insertions. Les vertèbres sont des os irréguliers. La patella est un os sésamoïde inclus dans un tendon.']
      ],
      practice: 'Sélectionnez le sternum puis l’os coxal. Comparez leur appartenance et leur fonction.',
      questions: [
        q('r1', 'Quel ensemble appartient au squelette axial ?', ['Les os coxaux', 'Le rachis', 'Les clavicules', 'Les fémurs'], 1, 'Le rachis appartient à l’axe central du corps ; les ceintures et les membres sont appendiculaires.'),
        q('r2', 'En position anatomique, les paumes sont orientées…', ['Vers l’arrière', 'Vers les cuisses', 'Vers l’avant', 'Vers le sol'], 2, 'La position anatomique de référence place les paumes vers l’avant.'),
        q('r3', 'Quelle fonction est assurée par la moelle osseuse rouge ?', ['La production de cellules sanguines', 'La contraction musculaire', 'La sécrétion de bile', 'La filtration du sang'], 0, 'L’hématopoïèse est la production des cellules sanguines par la moelle rouge.'),
        q('r4', 'Le terme « distal » désigne une structure…', ['Proche du plan médian', 'Vers l’avant', 'Proche du tronc', 'Éloignée de l’attache du membre'], 3, 'Le poignet est distal par rapport au coude ; le coude est proximal par rapport au poignet.'),
        q('r5', 'Repérez le sternum sur le schéma.', [], 0, 'Le sternum est l’os médian situé à l’avant du thorax.', 'sternum')
      ]
    },
    {
      id: 'tete', title: 'Le crâne et la face', subtitle: 'Protéger, percevoir, mastiquer', duration: 15, icon: '◉', region: 'Tête', bones: ['cranium', 'face', 'mandible', 'hyoid'],
      objectives: ['Distinguer neurocrâne et squelette facial.', 'Localiser la mandibule et l’os hyoïde.', 'Associer les os de la tête à leurs rôles.'],
      sections: [
        ['La boîte crânienne', 'Les 8 os du neurocrâne entourent l’encéphale : frontal, occipital, sphénoïde, ethmoïde, deux pariétaux et deux temporaux. Les sutures sont des articulations fibreuses entre les os crâniens. Le schéma global regroupe ces os : il ne permet pas d’étudier les foramens ou la base du crâne.'],
        ['Le squelette de la face', 'Les 14 os de la face comprennent notamment les deux maxillaires, les deux zygomatiques et la mandibule. Les maxillaires portent les dents supérieures et participent au palais osseux. Les zygomatiques forment le relief des pommettes. La mandibule porte les dents inférieures et se mobilise lors de la mastication.'],
        ['Deux compléments à connaître', 'L’os hyoïde est situé dans le cou et suspendu par des muscles et ligaments : il ne s’articule avec aucun autre os. Chaque oreille moyenne contient trois osselets (marteau, enclume, étrier) qui transmettent les vibrations. Ils ne sont pas représentés sur cet atlas simplifié.']
      ],
      practice: 'Repérez le neurocrâne, le massif facial, puis la mandibule. Terminez par l’os hyoïde dans le cou.',
      questions: [
        q('h1', 'Combien d’os constituent classiquement le neurocrâne ?', ['8', '14', '22', '26'], 0, 'Le neurocrâne comprend 8 os. Avec les 14 os de la face, le crâne en compte 22.'),
        q('h2', 'Quel os porte les dents inférieures ?', ['Le frontal', 'Le maxillaire', 'La mandibule', 'Le zygomatique'], 2, 'La mandibule forme la mâchoire inférieure ; les maxillaires portent les dents supérieures.'),
        q('h3', 'Quelle particularité caractérise l’os hyoïde ?', ['Il forme une pommette', 'Il ne s’articule avec aucun autre os', 'Il appartient au carpe', 'Il entoure l’encéphale'], 1, 'L’os hyoïde est suspendu dans le cou par des muscles et des ligaments.'),
        q('h4', 'Quel est le rôle principal des osselets de l’ouïe ?', ['Protéger la moelle spinale', 'Porter les dents', 'Mobiliser la langue', 'Transmettre les vibrations sonores'], 3, 'Le marteau, l’enclume et l’étrier transmettent les vibrations dans l’oreille moyenne.'),
        q('h5', 'Repérez la mandibule sur le schéma.', [], 0, 'La mandibule se trouve sous le massif facial et forme la mâchoire inférieure.', 'mandible')
      ]
    },
    {
      id: 'tronc', title: 'Le rachis et le thorax', subtitle: 'L’axe protecteur du corps', duration: 18, icon: '≋', region: 'Tronc', bones: ['cervical', 'thoracic', 'lumbar', 'sacrum', 'coccyx', 'ribs', 'sternum'],
      objectives: ['Nommer les étages du rachis.', 'Comprendre la transmission des charges.', 'Distinguer les catégories de côtes.'],
      sections: [
        ['Du crâne au bassin', 'Le rachis comprend 7 vertèbres cervicales, 12 thoraciques et 5 lombaires, puis le sacrum et le coccyx. Chez l’adulte, les vertèbres sacrales et coccygiennes sont fusionnées : on compte classiquement 26 os pour la colonne, et non 33 os séparés. Le nombre de vertèbres coccygiennes varie.'],
        ['Mobilité et protection', 'C1, l’atlas, reçoit le crâne ; C2, l’axis, participe à sa rotation. Les vertèbres délimitent le canal vertébral qui protège la moelle spinale. Les disques intervertébraux, faits de fibrocartilage et d’un noyau gélatineux, contribuent à amortir les contraintes : ce ne sont pas des os. Les lombaires supportent de fortes charges.'],
        ['Une cage mobile', 'La cage thoracique comprend 12 paires de côtes, le sternum et les vertèbres thoraciques. Les côtes 1 à 7 rejoignent le sternum par leur propre cartilage ; les 8 à 10 par une attache cartilagineuse indirecte. Les 11 et 12 sont flottantes, sans attache antérieure au sternum. Cette cage protège notamment cœur et poumons tout en permettant la ventilation.']
      ],
      practice: 'Suivez le rachis de haut en bas, puis comparez les côtes au sternum. Les vertèbres sont montrées par transparence.',
      questions: [
        q('t1', 'Quelle succession décrit les vertèbres mobiles ?', ['12 cervicales, 7 thoraciques, 5 lombaires', '7 cervicales, 12 thoraciques, 5 lombaires', '5 cervicales, 12 thoraciques, 7 lombaires', '7 cervicales, 5 thoraciques, 12 lombaires'], 1, 'Le repère est 7–12–5, de haut en bas.'),
        q('t2', 'Quelles côtes sont dites flottantes ?', ['1 et 2', '6 et 7', '8 et 9', '11 et 12'], 3, 'Les deux dernières paires n’ont pas d’attache antérieure au sternum.'),
        q('t3', 'Le sacrum appartient…', ['Au squelette axial', 'Au squelette appendiculaire', 'Au membre supérieur', 'Au neurocrâne'], 0, 'Malgré sa position dans le bassin, le sacrum est une partie du rachis, donc du squelette axial.'),
        q('t4', 'Un disque intervertébral est…', ['Un os court', 'Une côte rudimentaire', 'Une structure non osseuse amortissant les contraintes', 'Une partie du sternum'], 2, 'Le disque intervertébral n’est pas un os ; il contribue à la mobilité et à l’amortissement entre les corps vertébraux.'),
        q('t5', 'Repérez le sacrum sur le schéma.', [], 0, 'Le sacrum est l’os triangulaire à la base du rachis, entre les os coxaux.', 'sacrum')
      ]
    },
    {
      id: 'superieur', title: 'Le membre supérieur', subtitle: 'De l’épaule au bout des doigts', duration: 18, icon: '↗', region: 'Membre supérieur', bones: ['clavicle', 'scapula', 'humerus', 'radius', 'ulna', 'carpals', 'metacarpals', 'hand-phalanges'],
      objectives: ['Suivre la chaîne osseuse du membre supérieur.', 'Distinguer radius et ulna.', 'Comprendre mobilité et préhension.'],
      sections: [
        ['Une ceinture pour la mobilité', 'La clavicule et la scapula (omoplate) constituent la ceinture scapulaire. La cavité glénoïdale de la scapula reçoit la tête de l’humérus. L’épaule privilégie une grande amplitude de mouvement, qui nécessite une stabilisation musculaire importante.'],
        ['Bras et avant-bras', 'Le bras contient l’humérus. L’avant-bras comprend le radius, latéral du côté du pouce, et l’ulna, médial du côté de l’auriculaire, en position anatomique. Pendant la pronation, le radius croise l’ulna ; pendant la supination, ils redeviennent parallèles. L’olécrâne appartient à l’ulna et forme la pointe du coude.'],
        ['Une main, 27 os', 'Le carpe contient 8 os, le métacarpe 5 et les doigts 14 phalanges. Le pouce a deux phalanges, contre trois pour chaque autre doigt. Les 8 os du carpe sont le scaphoïde, le lunatum, le triquétrum, le pisiforme, le trapèze, le trapézoïde, le capitatum et l’hamatum. Leur détail dépasse le schéma global ; retenez d’abord carpe → métacarpe → phalanges.']
      ],
      practice: 'Partez de la clavicule, descendez jusqu’à la main. Repérez le radius du côté du pouce, vers l’extérieur du schéma.',
      questions: [
        q('u1', 'En position anatomique, le radius est situé…', ['Du côté de l’auriculaire', 'Dans le bras', 'Du côté du pouce', 'À la face postérieure du thorax'], 2, 'Le radius est latéral, du côté du pouce ; l’ulna est médial.'),
        q('u2', 'Quels os constituent la ceinture scapulaire ?', ['Clavicule et scapula', 'Humérus et ulna', 'Radius et ulna', 'Sternum et côtes'], 0, 'La ceinture scapulaire comprend une clavicule et une scapula de chaque côté.'),
        q('u3', 'Combien d’os trouve-t-on dans un carpe ?', ['5', '7', '14', '8'], 3, 'Chaque carpe comprend 8 os courts.'),
        q('u4', 'Combien de phalanges possède normalement un pouce ?', ['3', '2', '4', '1'], 1, 'Le pouce possède une phalange proximale et une distale, sans phalange moyenne.'),
        q('u5', 'Repérez l’humérus sur le schéma.', [], 0, 'L’humérus est le seul os du bras, entre l’épaule et le coude.', 'humerus')
      ]
    },
    {
      id: 'inferieur', title: 'Le bassin et le membre inférieur', subtitle: 'Porter, équilibrer, avancer', duration: 18, icon: '↘', region: 'Membre inférieur', bones: ['coxal', 'femur', 'patella', 'tibia', 'fibula', 'tarsals', 'metatarsals', 'foot-phalanges'],
      objectives: ['Relier le bassin au membre inférieur.', 'Distinguer tibia et fibula.', 'Identifier les groupes osseux du pied.'],
      sections: [
        ['Le relais du bassin', 'Les deux os coxaux forment la ceinture pelvienne. Avec le sacrum et le coccyx, ils constituent le bassin osseux. Chaque os coxal résulte de la fusion de l’ilium, de l’ischium et du pubis. L’acétabulum reçoit la tête du fémur. La hanche est une articulation mobile, mais plus stable que l’épaule pour porter le poids du corps.'],
        ['Cuisse, genou, jambe', 'Le fémur est l’os de la cuisse. La patella (rotule), dans le tendon du quadriceps, augmente l’efficacité de l’extension du genou. Dans la jambe, le tibia est médial et transmet l’essentiel du poids ; la fibula (péroné) est latérale et contribue surtout aux insertions musculaires et à la stabilité de la cheville.'],
        ['Un pied, 26 os', 'Le tarse comprend 7 os, dont le talus qui reçoit le tibia et le calcanéus qui forme le talon. Il est suivi de 5 métatarsiens et de 14 phalanges. L’hallux possède deux phalanges. Les arches du pied répartissent les charges et contribuent à la propulsion. Le schéma regroupe les os du tarse pour privilégier les repères globaux.']
      ],
      practice: 'Suivez le trajet du poids : sacrum → os coxal → fémur → tibia → tarse. Comparez tibia et fibula.',
      questions: [
        q('l1', 'Quel os supporte l’essentiel du poids dans la jambe ?', ['La fibula', 'Le tibia', 'La patella', 'L’ulna'], 1, 'Le tibia est l’os porteur médial de la jambe.'),
        q('l2', 'L’acétabulum reçoit…', ['La tête de l’humérus', 'La patella', 'Le talus', 'La tête du fémur'], 3, 'L’acétabulum de l’os coxal forme avec la tête fémorale l’articulation de la hanche.'),
        q('l3', 'Quel os forme le talon ?', ['Le calcanéus', 'Le talus', 'Le naviculaire', 'Le cuboïde'], 0, 'Le calcanéus est l’os postérieur et inférieur du tarse qui constitue le talon.'),
        q('l4', 'La patella est…', ['Un os de la cheville', 'Un os du bassin', 'Un os sésamoïde du tendon du quadriceps', 'Un os de la main'], 2, 'La patella est un os sésamoïde ; elle améliore le bras de levier du quadriceps.'),
        q('l5', 'Repérez la fibula sur le schéma.', [], 0, 'La fibula est le fin os latéral de la jambe, à l’extérieur du tibia.', 'fibula')
      ]
    },
    {
      id: 'synthese', title: 'Relier les connaissances', subtitle: 'De l’os isolé au mouvement', duration: 12, icon: '✧', region: 'all', bones: ['scapula', 'humerus', 'coxal', 'femur', 'tibia', 'radius'],
      objectives: ['Comparer membre supérieur et membre inférieur.', 'Reconnaître les grandes articulations.', 'Réutiliser les repères sans aide.'],
      sections: [
        ['Le même plan, deux priorités', 'Les membres partagent un plan : une ceinture, un os proximal, deux os dans le segment suivant, puis une extrémité organisée en trois groupes. L’humérus correspond au fémur, l’avant-bras à la jambe, et la main au pied. Le membre supérieur privilégie manipulation et mobilité ; le membre inférieur, appui et locomotion.'],
        ['L’os ne bouge pas seul', 'Une articulation unit des éléments osseux. Les articulations synoviales, comme l’épaule, la hanche et le genou, associent cartilage articulaire, capsule et cavité contenant le liquide synovial. Les ligaments relient les os entre eux ; les tendons transmettent la force des muscles aux os. Toutes les articulations ne sont pas librement mobiles : les sutures du crâne en sont un exemple.'],
        ['Réviser par rappel actif', 'Cachez les noms dans l’atlas. Pour chaque région, nommez un os, situez-le et dites sa fonction avant d’ouvrir sa fiche. Reprenez les questions ratées, puis refaites le parcours après 1 jour, 3 jours et 7 jours. Le score indique une réussite à ce parcours introductif, pas une validation du programme de votre faculté.']
      ],
      practice: 'Sans les noms, identifiez le radius, le tibia et la scapula. Expliquez à voix haute leur localisation et leur rôle.',
      questions: [
        q('s1', 'Quelle paire correspond au même niveau dans les deux membres ?', ['Radius et fémur', 'Humérus et fémur', 'Scapula et tibia', 'Carpe et patella'], 1, 'Humérus et fémur occupent le segment proximal libre de leurs membres respectifs.'),
        q('s2', 'Un tendon relie habituellement…', ['Deux os', 'Deux cartilages', 'Un nerf à la peau', 'Un muscle à un os'], 3, 'Le tendon transmet la force musculaire à l’os ; le ligament relie les os entre eux.'),
        q('s3', 'Quelle affirmation est correcte ?', ['Toutes les articulations sont très mobiles', 'Les sutures sont des articulations synoviales', 'La hanche unit le fémur à l’os coxal', 'Le genou unit le fémur à l’ulna'], 2, 'La hanche unit la tête du fémur à l’acétabulum de l’os coxal.'),
        q('s4', 'Quel trajet décrit correctement la transmission principale du poids ?', ['Sacrum → os coxal → fémur → tibia', 'Sacrum → humérus → radius → carpe', 'Sternum → fibula → fémur → tibia', 'Os coxal → ulna → talus → tibia'], 0, 'Le poids passe du rachis au bassin, puis au fémur, au tibia et au pied.'),
        q('s5', 'Repérez la scapula sur le schéma.', [], 0, 'La scapula est située derrière le thorax. Elle est montrée ici partiellement par transparence.', 'scapula')
      ]
    }
  ];
  const chapters = [{ id: 'squelette', title: 'Le squelette humain', subject: 'Anatomie', description: 'Des premiers repères aux mouvements : explorez la charpente du corps humain, un os à la fois.', lessons, examPerLesson: 3 }];
  const data = { bones, chapters, lessons };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else root.CampusData = data;
})(globalThis);
