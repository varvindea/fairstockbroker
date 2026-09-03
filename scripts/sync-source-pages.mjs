import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = resolve(projectRoot, '..')
const outputRoot = resolve(projectRoot, 'public', 'source-pages')
const pages = []

async function collectPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === 'fairstockbroker') continue

    const fullPath = resolve(directory, entry.name)
    if (entry.isDirectory()) {
      await collectPages(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const path = relative(sourceRoot, fullPath).split(sep).join('/')
      const segments = path.split('/')
      pages.push({
        path,
        category: segments[0],
        title: entry.name
          .replace(/\.html$/i, '')
          .replace(/[_-]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      })
    }
  }
}

await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputRoot, { recursive: true })
const rootEntries = await readdir(sourceRoot, { withFileTypes: true })
for (const entry of rootEntries) {
  if (entry.name === 'fairstockbroker') continue
  await cp(resolve(sourceRoot, entry.name), resolve(outputRoot, entry.name), { recursive: true })
}
await collectPages(sourceRoot)
pages.sort((left, right) => left.path.localeCompare(right.path))
await writeFile(resolve(outputRoot, 'manifest.json'), JSON.stringify({ pages }, null, 2))