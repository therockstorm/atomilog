export type Field = boolean | string | number | object | undefined
export type Fields = { [key: string]: Field }

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export const debug = (msg: string, args?: Fields | Error): void =>
  log(LogLevel.DEBUG, msg, args)

export const info = (msg: string, args?: Fields | Error): void =>
  log(LogLevel.INFO, msg, args)

export const warn = (msg: string, args?: Fields | Error): void =>
  log(LogLevel.WARN, msg, args)

export const error = (msg: string, args?: Fields | Error): void =>
  log(LogLevel.ERROR, msg, args)

export const addFields = (fields: Fields): void => {
  ;(global as Global).fields = {
    ...((global as Global).fields || {}),
    ...fields
  }
}

export const enableDebug = (): (() => void) => {
  const oldLevel = process.env.LOG_LEVEL
  process.env.LOG_LEVEL = "DEBUG"
  return (): void => {
    process.env.LOG_LEVEL = oldLevel
  }
}

const log = (level: LogLevel, message: string, args?: Fields | Error): void => {
  const isEnabled = (level: LogLevel): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    level >= ((LogLevel as any)[process.env.LOG_LEVEL || ""] || LogLevel.DEBUG)

  const parseError = (err: Error): Fields => {
    const msg = err.message
    const stack = err.stack
    delete err.message
    delete err.stack
    return {
      errorName: err.name,
      errorMessage: msg,
      errorStack: stack,
      errorFields: Object.keys(err).length ? err : undefined
    }
  }

  if (!isEnabled(level)) return

  const msg: Fields = {
    level: LogLevel[level],
    message,
    ...((global as Global).fields || {}),
    ...(args instanceof Error ? parseError(args) : args || {})
  }

  console.log(JSON.stringify(msg, null, msg.prettify ? 2 : 0))
}

interface Global extends NodeJS.Global {
  fields: Fields
}
