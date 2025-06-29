import { expect, test, vi } from 'vitest'
import { createMockCommandContext } from '../../../test/utils.ts'
import decorator from './decorator.ts'
import extension from './extension.ts'

import type { GlobalsCommandContext } from './extension.ts'

test('enable version option', async () => {
  const version = '1.0.0'
  const ctx = await createMockCommandContext<{
    globals: GlobalsCommandContext
  }>({
    version,
    values: { version: true },
    extensions: {
      globals: {
        key: Symbol('globals'),
        factory: extension
      }
    }
  })
  const baseRunner = vi.fn(() => 'command executed')
  const result = await decorator(baseRunner)(ctx)

  expect(result).toBe(version)
  expect(baseRunner).not.toHaveBeenCalled()
})

test('enable help option', async () => {
  const usage = 'Usage: test [options]'
  const ctx = await createMockCommandContext<{
    globals: GlobalsCommandContext
  }>({
    renderUsage: async () => usage,
    values: { help: true },
    extensions: {
      globals: {
        key: Symbol('globals'),
        factory: extension
      }
    }
  })
  const baseRunner = vi.fn(() => 'command executed')
  const result = await decorator(baseRunner)(ctx)

  expect(result).toBe(usage)
  expect(baseRunner).not.toHaveBeenCalled()
})

test('header rendering', async () => {
  const header = 'Welcome to the Test Application'
  const usage = 'Usage: test [options]'
  const ctx = await createMockCommandContext<{
    globals: GlobalsCommandContext
  }>({
    renderHeader: async () => header,
    renderUsage: async () => usage,
    values: { help: true },
    extensions: {
      globals: {
        key: Symbol('globals'),
        factory: extension
      }
    }
  })
  const baseRunner = vi.fn(() => 'command executed')
  const result = await decorator(baseRunner)(ctx)

  expect(result).toBe([header, usage].join('\n'))
  expect(baseRunner).not.toHaveBeenCalled()
})

test('base runner execution', async () => {
  const ctx = await createMockCommandContext<{
    globals: GlobalsCommandContext
  }>({
    values: {},
    extensions: {
      globals: {
        key: Symbol('globals'),
        factory: extension
      }
    }
  })
  const baseRunner = vi.fn(() => 'command executed')
  const result = await decorator(baseRunner)(ctx)

  expect(result).toBe('command executed')
})
