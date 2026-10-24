from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
URL = (ROOT / 'index.html').as_uri()

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    context = browser.new_context(viewport={'width': 1440, 'height': 1100})
    page = context.new_page()
    errors = []
    requests = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('request', lambda request: requests.append(request.url))
    page.goto(URL)
    assert page.locator('.lesson-card').count() == 6
    page.screenshot(path='/tmp/osteo-home.png', full_page=True)
    page.locator('.chapter-copy .button').click()
    assert 'Les repères essentiels' in page.locator('h1').inner_text()
    page.locator('#mark-read').click()
    assert page.locator('#mark-read').is_disabled()
    page.reload()
    assert page.locator('#mark-read').is_disabled()
    page.goto(URL + '#/atlas')
    page.locator('#bone-search').fill('perone')
    assert page.locator('.bone-list-item').count() == 1
    page.locator('.bone-list-item').click()
    assert page.locator('#bone-detail h2').inner_text() == 'Fibula'
    page.locator('#bone-search').fill('aucun os de ce nom')
    assert 'Aucun os trouvé' in page.locator('#bone-list').inner_text()
    page.locator('#bone-search').fill('')
    page.locator('#region').select_option('Membre supérieur')
    assert page.locator('.bone-list-item').count() == 8
    page.locator('[data-filter="all"]').click()
    page.locator('#labels').uncheck()
    assert page.locator('.annotations').count() == 0
    bone = page.locator('[data-bone="femur"]').first
    bone.focus()
    bone.press('Enter')
    assert page.locator('#bone-detail h2').inner_text() == 'Fémur'
    page.locator('#zoom-in').click()
    assert '120 %' in page.locator('.atlas-controls').inner_text()
    page.screenshot(path='/tmp/osteo-atlas.png', full_page=True)
    page.goto(URL + '#/quiz/reperes')
    for index, answer in enumerate([1, 2, 0, 3, 'sternum']):
        assert page.locator('#quiz-submit').is_disabled()
        if isinstance(answer, str):
            page.locator(f'[data-bone="{answer}"]').first.focus()
            page.keyboard.press('Enter')
            assert page.locator('[aria-label="Sternum"]').count() == 0
        else:
            page.locator(f'[data-choice="{answer}"]').click()
        page.locator('#quiz-submit').click()
        assert page.locator('.feedback.success').count() == 1
        page.locator('#quiz-submit').click()
    assert '100' in page.locator('.score-circle').inner_text()
    assert page.locator('.correction').count() == 5
    page.goto(URL + '#/progression')
    assert '100 %' in page.locator('.progress-row').first.inner_text()
    page.reload()
    assert '1 quiz terminé' in page.locator('.progress-row').first.inner_text()
    page.goto(URL + '#/examen/squelette')
    for index in range(18):
        question = page.evaluate('activeQuiz.questions[activeQuiz.index]')
        if question['bone']:
            page.locator(f'[data-bone="{question["bone"]}"]').first.focus()
            page.keyboard.press('Space')
        else:
            answer = (question['answer'] + 1) % 4 if index == 0 else question['answer']
            page.locator(f'[data-choice="{answer}"]').click()
        page.locator('#quiz-submit').click()
        assert page.locator('.feedback').count() == 0
    assert page.locator('.correction').count() == 18
    assert page.locator('.score-circle').inner_text().startswith(('94', '100'))
    assert page.evaluate('progress.exams.squelette.attempts') == 1
    page.locator('#retry-quiz').click()
    assert page.locator('.quiz-progress').inner_text().startswith('Question 1')
    assert page.evaluate('progress.exams.squelette.attempts') == 1
    for width in [390, 320, 768, 1440]:
        page.set_viewport_size({'width': width, 'height': 900})
        for route in ['parcours', 'atlas', 'cours/superieur', 'quiz/tete', 'progression', 'sources']:
            page.goto(URL + '#/' + route)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, route)
        if width == 390:
            page.goto(URL + '#/parcours')
            page.screenshot(path='/tmp/osteo-mobile.png', full_page=True)
    page.goto(URL + '#/progression')
    page.once('dialog', lambda dialog: dialog.dismiss())
    page.locator('#reset-progress').click()
    assert page.evaluate('progress.read.length') == 1
    page.once('dialog', lambda dialog: dialog.accept())
    page.locator('#reset-progress').click()
    assert page.evaluate('progress.read.length') == 0
    assert page.evaluate('Object.keys(progress.quizzes).length') == 0
    page.goto(URL + '#/inconnue')
    assert 'n’existe pas' in page.locator('h1').inner_text()
    assert not errors, errors
    assert not any(url.startswith(('http:', 'https:')) for url in requests), requests
    blocked = browser.new_context()
    blocked.add_init_script("Object.defineProperty(window, 'localStorage', {get() {throw new Error('blocked')}})")
    fallback = blocked.new_page()
    fallback.goto(URL)
    assert 'sauvegarde locale est indisponible' in fallback.locator('[role="status"]').inner_text()
    assert fallback.locator('.lesson-card').count() == 6
    blocked.close()
    browser.close()
    print('Browser smoke passed: offline launch, atlas, keyboard, quiz, exam, persistence, reset, responsive layouts, storage fallback; zero browser errors or network requests.')
