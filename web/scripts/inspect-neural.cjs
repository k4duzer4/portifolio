const { chromium } = require('C:/Users/kadus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs/promises')
const output = 'D:/CodexWorkspaces/carlos-franco-orbita-deps/qa'
;(async () => {
  await fs.mkdir(output, { recursive: true })
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  page.on('console', e => { if (e.type() === 'error' && /shader|webgl|THREE|React/i.test(e.text())) errors.push(e.text()) })
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5175', { waitUntil: 'networkidle' })
  await page.locator('.neural-ready').waitFor()
  await page.waitForTimeout(2300)
  await page.screenshot({ path: `${output}/neural-desktop.png` })
  for (const name of ['Partículas', 'Galáxia', 'Escultura']) {
    const button = page.getByRole('button', { name, exact: true })
    await button.click()
    if (await button.getAttribute('aria-pressed') !== 'true') throw new Error(`${name} was not selected`)
    await page.waitForTimeout(1400)
    await page.locator('.neural-experiment').screenshot({ path: `${output}/neural-${name === 'Galáxia' ? 'galaxy' : name === 'Partículas' ? 'particles' : 'surface'}.png` })
  }
  const slider = page.getByRole('slider')
  await slider.fill('0.95')
  await page.getByText('95%', { exact: true }).waitFor()
  await page.getByRole('button', { name: 'Emitir pulso', exact: true }).click()
  await page.getByText('PULSO ATIVO', { exact: true }).waitFor()
  await page.waitForTimeout(650)
  await page.locator('.neural-experiment').screenshot({ path: `${output}/neural-pulse.png` })
  await page.getByText('INTERATIVO', { exact: true }).waitFor()
  const canvas = page.locator('.neural-canvas'), bounds = await canvas.boundingBox()
  await page.getByRole('button', { name: 'Pausar animações' }).click()
  await page.waitForTimeout(500)
  const first = await canvas.screenshot()
  await page.mouse.move(bounds.x + bounds.width * .4, bounds.y + bounds.height * .5)
  await page.mouse.down()
  await page.mouse.move(bounds.x + bounds.width * .75, bounds.y + bounds.height * .55, { steps: 15 })
  await page.mouse.up()
  await page.waitForTimeout(250)
  const second = await canvas.screenshot()
  if (first.equals(second)) throw new Error('Manual rotation did not affect the sculpture')
  await page.getByRole('button', { name: 'Restaurar orientação' }).click()
  const report = []
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    const details = await page.evaluate(width => {
      const deck = document.querySelector('.neural-control-deck').getBoundingClientRect()
      const outside = [...document.querySelectorAll('.neural-control-deck button,.neural-control-deck input')].filter(el => { const r = el.getBoundingClientRect(); return r.left < deck.left - 1 || r.right > deck.right + 1 })
      return { width, overflow: document.documentElement.scrollWidth > innerWidth + 1, clippedControls: outside.length }
    }, width)
    report.push(details)
    if (width === 390) await page.locator('.neural-experiment').screenshot({ path: `${output}/neural-mobile.png` })
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('button', { name: 'Galáxia', exact: true }).click()
  await page.getByRole('button', { name: 'Galáxia', exact: true, pressed: true }).waitFor()
  console.log(JSON.stringify({ errors, report, interaction: 'three modes, energy, pulse, manual drag while paused, orientation reset, reduced motion' }, null, 2))
  await browser.close()
  if (errors.length || report.some(r => r.overflow || r.clippedControls)) process.exitCode = 1
})().catch(e => { console.error(e); process.exit(1) })
