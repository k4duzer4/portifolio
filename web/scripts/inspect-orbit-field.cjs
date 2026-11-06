const { chromium } = require('C:/Users/kadus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs/promises')
const output = 'D:/CodexWorkspaces/carlos-franco-orbita-deps/qa'
;(async () => {
  await fs.mkdir(output, { recursive: true })
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5175', { waitUntil: 'networkidle' })
  const interaction = page.getByRole('button', { name: 'Transformar conexões', exact: true })
  await interaction.waitFor()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${output}/clean-orbit-desktop.png` })
  await interaction.click()
  await page.getByText('Forma selecionada: Fluxo.', { exact: true }).waitFor()
  await page.waitForTimeout(1000)
  await page.locator('.kinetic-orbit').screenshot({ path: `${output}/clean-orbit-flow.png` })
  await interaction.focus(); await page.keyboard.press('Enter')
  await page.getByText('Forma selecionada: Conexões.', { exact: true }).waitFor()
  await page.waitForTimeout(1000)
  await page.locator('.kinetic-orbit').screenshot({ path: `${output}/clean-orbit-connections.png` })
  const report = []
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    report.push(await page.evaluate(width => ({ width, overflow: document.documentElement.scrollWidth > innerWidth + 1 }), width))
    if (width === 390) await page.locator('.kinetic-orbit').screenshot({ path: `${output}/clean-orbit-mobile.png` })
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('html[data-motion="off"]').waitFor()
  await interaction.click()
  await page.getByText('Forma selecionada: Órbita.', { exact: true }).waitFor()
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const first = await page.locator('.kinetic-canvas').screenshot()
  await page.waitForTimeout(250)
  const second = await page.locator('.kinetic-canvas').screenshot()
  if (!first.equals(second)) {
    await fs.writeFile(`${output}/field-reduced-first.png`, first)
    await fs.writeFile(`${output}/field-reduced-second.png`, second)
    console.log(await page.evaluate(() => ({ motion: document.documentElement.dataset.motion, scroll: scrollY, canvas: document.querySelector('canvas').getBoundingClientRect().toJSON() })))
    throw new Error('Reduced-motion canvas kept animating')
  }
  console.log(JSON.stringify({ errors, report, interactions: 'click, keyboard, three compositions, reduced motion, responsive layout' }, null, 2))
  await browser.close()
  if (errors.length || report.some(r => r.overflow)) process.exitCode = 1
})().catch(e => { console.error(e); process.exit(1) })
