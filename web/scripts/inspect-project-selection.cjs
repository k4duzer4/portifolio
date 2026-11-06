const { chromium } = require('C:/Users/kadus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const expected = ['Save', 'TripSplit', 'ANADE', 'FilmeFaves', 'GameLog', 'Bazar Solidário Nina']
;(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5175', { waitUntil: 'networkidle' })
  const names = await page.locator('.project-card h3').allTextContents()
  if (JSON.stringify(names) !== JSON.stringify(expected)) throw new Error(`Unexpected order: ${names}`)
  if (/\brpg\b|FlowReserva/i.test(await page.locator('main').innerText())) throw new Error('Removed project or unwanted description remains visible')
  await page.locator('.project-gamelog .project-status').getByText('Em desenvolvimento', { exact: true }).waitFor()
  for (const name of expected) {
    await page.getByRole('button', { name: `Explorar projeto: ${name}`, exact: true }).click()
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('heading', { name, exact: true }).waitFor()
    if (name === 'ANADE' && !/organização suprapartidária/i.test(await dialog.innerText())) throw new Error('ANADE description missing')
    if (/\brpg\b/i.test(await dialog.innerText())) throw new Error('Unwanted case terminology')
    if (name === 'GameLog') await dialog.locator('.case-project-status').getByText('Em desenvolvimento', { exact: true }).waitFor()
    if (name !== 'Save') {
      const href = await dialog.getByRole('link', { name: /Ver código/ }).getAttribute('href')
      if (!href.startsWith('https://github.com/k4duzer4/')) throw new Error(`Invalid repository: ${name}`)
    }
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
  }
  const images = await page.locator('#projetos img').evaluateAll(els => els.map(e => ({ src: e.getAttribute('src'), loaded: e.complete && e.naturalWidth > 0 })))
  if (images.some(e => !e.loaded)) throw new Error('Project image failed to load')
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw new Error(`Horizontal overflow at ${width}`)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.locator('#projetos').screenshot({ path: 'D:/CodexWorkspaces/carlos-franco-orbita-deps/qa/selected-projects.png' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('.project-gamelog').screenshot({ path: 'D:/CodexWorkspaces/carlos-franco-orbita-deps/qa/gamelog-status-mobile.png' })
  console.log(JSON.stringify({ errors, order: names, images, result: 'Six cases, selected order, terminology, status, repositories and responsive layout verified.' }, null, 2))
  await browser.close()
  if (errors.length) process.exitCode = 1
})().catch(e => { console.error(e); process.exit(1) })
