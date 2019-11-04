export type Field = boolean | string | number | object | undefined
export type Fields = { [key: string]: Field }
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}
interface Options {
  prettify: boolean
}
type CtorReq = { options: Options; fields: Fields }

export class Atomilog {
  private options: Options
  private fields: Fields

  constructor(
    { options, fields }: CtorReq = {
      options: { prettify: false },
      fields: {}
    }
  ) {
    this.options = options
    this.fields = fields
  }

  public debug = (msg: string, args?: Fields | Error): void =>
    this.log(LogLevel.DEBUG, msg, args)

  public info = (msg: string, args?: Fields | Error): void =>
    this.log(LogLevel.INFO, msg, args)

  public warn = (msg: string, args?: Fields | Error): void =>
    this.log(LogLevel.WARN, msg, args)

  public error = (msg: string, args?: Fields | Error): void =>
    this.log(LogLevel.ERROR, msg, args)

  public addFields = (fields: Fields): void => {
    this.fields = {
      ...this.fields,
      ...fields
    }
  }

  public enableDebug = (): (() => void) => {
    const oldLevel = process.env.LOG_LEVEL
    process.env.LOG_LEVEL = "DEBUG"
    return (): void => {
      process.env.LOG_LEVEL = oldLevel
    }
  }

  private log = (
    level: LogLevel,
    message: string,
    args?: Fields | Error
  ): void => {
    const isEnabled = (level: LogLevel): boolean =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      level >=
      ((LogLevel as any)[process.env.LOG_LEVEL || ""] || LogLevel.DEBUG)

    const parseError = (err: Error): Fields => {
      const msg = err.message
      const stack = err.stack
      delete err.message
      delete err.stack
      return {
        errorMessage: msg,
        errorStack: stack,
        errorFields: Object.keys(err).length ? err : undefined
      }
    }

    if (!isEnabled(level)) return

    const msg: Fields = {
      level: LogLevel[level],
      message,
      ...this.fields,
      ...(args instanceof Error ? parseError(args) : args || {})
    }

    console.log(JSON.stringify(msg, null, this.options.prettify ? 2 : 0))
  }
}
