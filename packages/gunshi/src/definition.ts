/**
 * The entry for command definition.
 *
 * @example
 * ```js
 * import { define } from 'gunshi/definition'
 * ```
 *
 * @module
 */

/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import type { Args } from 'args-tokens'
import type {
  Awaitable,
  Command,
  CommandContext,
  CommandContextExt,
  CommandContextExtension,
  CommandLoader,
  ExtendedCommand,
  LazyCommand
} from './types.ts'

export type { Args, ArgSchema, ArgValues } from 'args-tokens'

/**
 * Define a {@link Command | command}
 * @param definition A {@link Command | command} definition
 */
export function define<A extends Args = Args>(
  definition: Command<A> & { extensions?: never }
): Command<A>

/**
 * Define an {@link ExtendedCommand | extended command} with extensions
 * @param definition An {@link ExtendedCommand | extended command} definition with extensions
 */
export function define<
  A extends Args = Args,
  E extends Record<string, CommandContextExtension> = Record<string, CommandContextExtension>
>(
  definition: Omit<Command<A>, 'run'> & {
    extensions: E
    run?: (ctx: Readonly<CommandContext<A> & CommandContextExt<E>>) => Awaitable<void | string>
  }
): ExtendedCommand<A, E>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function define(definition: any): any {
  if ('extensions' in definition && definition.extensions) {
    const { extensions, run, ...rest } = definition
    return {
      ...rest,
      run,
      _extensions: extensions
    }
  }
  return definition
}

/**
 * Define a {@link LazyCommand | lazy command} without definition
 * @param loader A {@link CommandLoader | command loader}
 * @returns A {@link LazyCommand | lazy command} loader
 */
export function lazy<A extends Args = Args>(
  loader: CommandLoader<A>
): LazyCommand<A> & { _extensions?: never }

/**
 * Define a {@link LazyCommand | lazy command} with command loader, which is attached with command definition as usage metadata.
 * @param loader A {@link CommandLoader | command loader}
 * @param definition A {@link Command | command} definition
 * @returns A {@link LazyCommand | lazy command} loader
 */
export function lazy<A extends Args = Args>(
  loader: CommandLoader<A>,
  definition: Omit<Command<A>, 'run'>
): LazyCommand<A> & { _extensions?: never }

/**
 * Define a {@link LazyCommand | lazy command} with extension support (extensions property)
 * @param loader A {@link CommandLoader | command loader}
 * @param definition An {@link ExtendedCommand | extended command} definition with extensions
 * @returns A {@link LazyCommand | lazy command} loader with extension support
 */
export function lazy<
  A extends Args = Args,
  E extends Record<string, CommandContextExtension> = Record<string, CommandContextExtension>
>(
  loader: CommandLoader<A>,
  definition: Omit<Command<A>, 'run'> & { extensions: E }
): LazyCommand<A> & { _extensions: E }

/**
 * Define a {@link LazyCommand | lazy command} with extension support (_extensions property)
 * @param loader A {@link CommandLoader | command loader}
 * @param definition An {@link ExtendedCommand | extended command} definition with _extensions
 * @returns A {@link LazyCommand | lazy command} loader with extension support
 */
export function lazy<
  A extends Args = Args,
  E extends Record<string, CommandContextExtension> = Record<string, CommandContextExtension>
>(
  loader: CommandLoader<A>,
  definition: Omit<Command<A>, 'run'> & { _extensions: E }
): LazyCommand<A> & { _extensions: E }

/**
 * Define a {@link LazyCommand | lazy command} with or without definition.
 * @param loader A {@link CommandLoader | command loader} function that returns a command definition
 * @param definition An optional {@link Command | command} definition that can include extensions
 * @returns A {@link LazyCommand | lazy command} that can be executed later
 */
export function lazy<
  A extends Args = Args,
  E extends Record<string, CommandContextExtension> = Record<string, CommandContextExtension>
>(
  loader: CommandLoader<A>,
  definition?: Omit<Command<A>, 'run'> & ({ extensions?: E } | { _extensions?: E })
): LazyCommand<A> & { _extensions?: E | never } {
  const lazyCommand = loader as LazyCommand<A> & { _extensions?: E | never }

  if (definition != null) {
    // copy existing properties
    lazyCommand.commandName = definition.name
    lazyCommand.description = definition.description
    lazyCommand.args = definition.args
    lazyCommand.examples = definition.examples
    lazyCommand.resource = definition.resource
    lazyCommand.toKebab = definition.toKebab

    // handle extensions
    if ('extensions' in definition && definition.extensions) {
      lazyCommand._extensions = definition.extensions
    } else if ('_extensions' in definition && definition._extensions) {
      lazyCommand._extensions = definition._extensions
    }
  }

  return lazyCommand
}
