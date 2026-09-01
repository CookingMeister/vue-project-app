/**
 * Renders resume/resume.html to public/resume.pdf.
 *
 * The PDF is a build output, not a source file: edit resume.html and re-run
 * `npm run resume`. Chrome prints it, so the text layer stays real, selectable
 * text - applicant tracking systems parse that, and an exported image would
 * come back to them blank.
 *
 * Chrome is used headless rather than adding Puppeteer, which would pull a
 * second ~150MB browser into devDependencies to do a job the installed one
 * already does.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = join(here, 'resume.html')
const output = resolve(here, '..', 'public', 'resume.pdf')

/** Common install locations, newest-first. CHROME_PATH overrides all of them. */
const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean)

const browser = CANDIDATES.find((path) => existsSync(path))

if (!browser) {
  console.error(
    'No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser and re-run:\n' +
      '  CHROME_PATH="/path/to/chrome" npm run resume'
  )
  process.exit(1)
}

// --user-data-dir is a throwaway: without it Chrome refuses to start headless
// when a normal browser window is already open on the same profile.
const profile = mkdtempSync(join(tmpdir(), 'resume-pdf-'))

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      `--user-data-dir=${profile}`,
      '--no-pdf-header-footer',
      `--print-to-pdf=${output}`,
      `file:///${source.replace(/\\/g, '/')}`
    ],
    { stdio: 'inherit' }
  )
} finally {
  rmSync(profile, { recursive: true, force: true })
}

if (!existsSync(output)) {
  console.error('Chrome exited without writing the PDF.')
  process.exit(1)
}

const kb = (statSync(output).size / 1024).toFixed(1)
console.log(`public/resume.pdf written (${kb} kB)`)
