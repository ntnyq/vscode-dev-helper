/**
 * @file Types
 */

export interface ICommandRegistry {
  command: string
  callback: (...args: any[]) => any
}

export abstract class IConfiguration<T> {
  public abstract identifier: string

  public abstract defaultConfig: T

  public abstract read(): T

  public abstract write(input: T): void
}
