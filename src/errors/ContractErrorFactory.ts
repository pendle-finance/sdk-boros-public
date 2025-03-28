export class ContractErrorFactory<ErrorType extends Error, Fn extends (originalError: Error) => ErrorType | undefined> {
  constructor(readonly createErrorObject: Fn) {}

  makeError(originalError: Error): ErrorType | undefined {
    return this.createErrorObject(originalError);
  }
}
