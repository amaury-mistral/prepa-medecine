(function (root) {
  const path = (d, extra = '') => `<path d="${d}" ${extra}/>`;
  const ellipse = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
  const long = (x1, y1, x2, y2, width) => {
    const d = `M ${x1 - width} ${y1} Q ${x1 - width - 5} ${y1 - 10} ${x1} ${y1 - 10} Q ${x1 + width + 5} ${y1 - 10} ${x1 + width} ${y1 + 3} L ${x2 + width * .55} ${y2 - 9} Q ${x2 + width + 5} ${y2 + 5} ${x2} ${y2 + 6} Q ${x2 - width - 5} ${y2 + 5} ${x2 - width * .55} ${y2 - 9} Z`;
    return path(d);
  };
  function markup(bones, options = {}) {
    const { selected = '', region = 'all', labels = false, quiz = false, scope = 'atlas' } = options;
    const nodes = [];
    let index = 0;
    function group(id, shapes, transform = '') {
      const bone = bones.find(item => item.id === id);
      const dim = region !== 'all' && bone.region !== region && bone.division !== region;
      const label = quiz ? `Zone ${++index}` : bone.name;
      nodes.push(`<g class="bone ${bone.division} ${id === selected ? 'selected' : ''} ${dim ? 'dimmed' : ''}" data-bone="${id}" role="button" tabindex="0" aria-label="${label}" aria-pressed="${id === selected}" ${transform ? `transform="${transform}"` : ''}><title>${label}</title>${shapes}</g>`);
    }
    function both(id, shapes) { group(id, shapes); group(id, shapes, 'translate(400 0) scale(-1 1)'); }
    both('scapula', path('M 140 139 Q 127 153 133 179 L 161 205 Q 170 188 164 150 Z'));
    group('cervical', Array.from({ length: 7 }, (_, i) => path(`M 191 ${104 + i * 5} q 9 -3 18 0 v 4 q -9 3 -18 0 Z`)).join(''));
    group('thoracic', Array.from({ length: 12 }, (_, i) => path(`M 190 ${143 + i * 9} q 10 -3 20 0 l 2 6 q -12 4 -24 0 Z`)).join(''));
    group('lumbar', Array.from({ length: 5 }, (_, i) => path(`M 187 ${254 + i * 12} q 13 -4 26 0 l 2 8 q -15 4 -30 0 Z`)).join(''));
    both('ribs', Array.from({ length: 12 }, (_, i) => {
      const y = 150 + i * 9;
      const left = 156 - Math.sin((i + 1) / 13 * Math.PI) * 30;
      const end = i > 9 ? 173 : 194;
      return path(`M 187 ${y} C ${left} ${y - 10}, ${left - 3} ${y + 14}, ${end} ${y + 17} L ${end} ${y + 21} C ${left - 12} ${y + 19}, ${left - 7} ${y - 16}, 188 ${y - 5} Z`);
    }).join(''));
    group('sternum', path('M 191 150 Q 200 143 209 150 L 206 165 L 205 212 L 200 224 L 195 212 L 194 165 Z'));
    both('clavicle', path('M 195 142 Q 178 126 158 139 Q 147 145 137 139 L 133 145 Q 146 152 159 146 Q 178 134 194 148 Z'));
    both('humerus', long(126, 157, 104, 272, 9));
    both('radius', long(94, 294, 73, 383, 5));
    both('ulna', long(108, 291, 87, 381, 5));
    both('carpals', Array.from({ length: 8 }, (_, i) => ellipse(70 + (i % 4) * 6, 398 + Math.floor(i / 4) * 7, 3.3, 3.7)).join(''));
    both('metacarpals', Array.from({ length: 5 }, (_, i) => long(64 + i * 7, 418, 54 + i * 9, 437 + (i === 0 ? -9 : 0), 2.4)).join(''));
    both('hand-phalanges', Array.from({ length: 5 }, (_, i) => Array.from({ length: i === 0 ? 2 : 3 }, (_, j) => long(52 + i * 9 - j, 441 + j * 10 - (i === 0 ? 11 : 0), 51 + i * 9 - j, 445 + j * 10 - (i === 0 ? 11 : 0), 2)).join('')).join(''));
    both('coxal', path('M 184 324 Q 174 307 162 303 Q 146 299 137 314 Q 129 332 146 352 L 141 373 Q 144 400 171 397 L 195 377 L 195 365 L 175 379 Q 158 388 155 373 Q 153 360 169 359 L 181 349 Z'));
    group('sacrum', path('M 183 314 Q 200 309 217 314 L 213 342 L 200 362 L 187 342 Z') + path('M 190 324 h 20 M 192 333 h 16 M 196 343 h 8', 'class="detail"'));
    group('coccyx', path('M 196 363 L 204 363 L 202 376 Q 200 382 198 376 Z'));
    both('femur', path('M 159 379 Q 149 367 140 377 Q 136 384 145 391 L 151 403 L 157 512 Q 147 517 151 528 Q 158 535 166 529 Q 175 535 180 526 Q 184 516 174 511 L 166 402 L 172 389 Q 171 380 164 385 Z'));
    both('tibia', long(171, 549, 169, 678, 8));
    both('fibula', long(150, 551, 147, 682, 3.8));
    both('patella', path('M 156 530 Q 166 522 175 531 Q 177 542 166 550 Q 154 542 156 530 Z'));
    both('tarsals', ellipse(162, 698, 10, 8) + ellipse(147, 700, 6, 7) + ellipse(156, 709, 8, 5) + Array.from({ length: 4 }, (_, i) => ellipse(140 + i * 7, 717, 4, 4)).join(''));
    both('metatarsals', Array.from({ length: 5 }, (_, i) => long(136 + i * 7, 726, 129 + i * 9, 735, 2.2)).join(''));
    both('foot-phalanges', Array.from({ length: 5 }, (_, i) => Array.from({ length: i === 4 ? 2 : 3 }, (_, j) => ellipse(128 + i * 9, 744 + j * 5, i === 4 ? 3.5 : 2.6, 2.4)).join('')).join(''));
    group('cranium', path('M 170 61 C 153 14 182 5 200 5 C 224 5 244 22 230 61 L 222 69 L 178 69 Z') + path('M 175 27 Q 200 20 225 27 M 200 6 v 19', 'class="detail"'));
    group('face', path('M 171 59 Q 181 51 191 59 L 200 57 L 209 59 Q 219 51 229 59 L 225 80 L 213 89 L 187 89 L 175 80 Z') + ellipse(183, 67, 7, 7) + ellipse(217, 67, 7, 7) + path('M 200 69 l -5 11 h 10 Z', 'class="socket"') + path('M 188 84 h 24', 'class="detail"'));
    group('mandible', path('M 172 79 L 179 82 L 181 96 Q 200 112 219 96 L 221 82 L 228 79 L 226 98 Q 201 125 174 98 Z') + path('M 188 98 Q 200 103 212 98', 'class="detail"'));
    group('hyoid', path('M 187 122 Q 200 134 213 122 L 213 128 Q 200 140 187 128 Z'));
    const annotations = labels && !quiz ? `<g class="annotations" aria-hidden="true"><path d="M 233 36 H 290"/><text x="296" y="40">Crâne</text><path d="M 205 190 H 285"/><text x="291" y="194">Sternum</text><path d="M 115 220 H 42"/><text x="5" y="214">Humérus</text><path d="M 238 320 H 294"/><text x="300" y="324">Bassin</text><path d="M 233 469 H 290"/><text x="296" y="473">Fémur</text><path d="M 169 612 H 70"/><text x="29" y="616">Tibia</text></g>` : '';
    return `<svg class="skeleton" viewBox="0 0 400 775" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="${scope}-title ${scope}-desc"><title id="${scope}-title">Squelette humain interactif, vue antérieure</title><desc id="${scope}-desc">Schéma simplifié. Utilisez Tab puis Entrée ou Espace pour sélectionner une zone. Les os pairs peuvent être sélectionnés des deux côtés. Les scapulas et le rachis sont visibles par transparence.</desc>${nodes.join('')}${annotations}</svg>`;
  }
  root.CampusSkeleton = { markup };
})(globalThis);
