/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vitest' {
  export interface Mock<TArgs extends any[] = any[], TRet = any> {
    (...args: TArgs): TRet
    mockResolvedValue(value: any): this
    mockResolvedValueOnce(value: any): this
    mockRejectedValue(error: any): this
    mockRejectedValueOnce(error: any): this
    mockReturnValue(value: any): this
    mockImplementation(fn: (...args: TArgs) => TRet): this
    mockReset(): this
    mockClear(): this
  }

  export const vi: {
    fn<TArgs extends any[] = any[], TRet = any>(impl?: (...args: TArgs) => TRet): Mock<TArgs, TRet>
    spyOn<T extends object, K extends keyof T>(obj: T, method: K): Mock<any[], any>
    clearAllMocks(): void
    mock(moduleName: string, factory: () => any): void
    doMock(moduleName: string, factory: () => any): void
    resetModules(): void
  }

  export function describe(name: string, fn: () => void): void
  export function it(name: string, fn: () => any | Promise<any>): void
  export const test: typeof it
  export function beforeEach(fn: () => any | Promise<any>): void
  export function afterEach(fn: () => any | Promise<any>): void
  export function beforeAll(fn: () => any | Promise<any>): void
  export function afterAll(fn: () => any | Promise<any>): void
  export function expect(value: any): any
}
