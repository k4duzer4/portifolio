import { copyFile, mkdir } from 'node:fs/promises'
await mkdir('dist/curriculo', { recursive: true })
await copyFile('dist/index.html', 'dist/curriculo/index.html')
