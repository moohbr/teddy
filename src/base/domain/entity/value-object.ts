export abstract class ValueObject<T> {
  protected constructor(protected readonly value: T) {}

  public getValue(): T {
    return this.value;
  }

  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(other.value);
  }

  public toString(): string {
    const stringified = JSON.stringify(this.value);
    return stringified === undefined ? 'undefined' : stringified;
  }

  public toJSON(): T {
    return this.value;
  }

  public toPersistence(): T {
    return this.value;
  }
}
