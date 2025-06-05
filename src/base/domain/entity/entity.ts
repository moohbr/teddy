export abstract class Entity<T> {
  protected constructor(protected readonly props: T) {}

  public equals(other?: Entity<T>): boolean {
    if (other === null || other === undefined) return false;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }

  public toJSON(): unknown {
    return JSON.parse(JSON.stringify(this.props));
  }

  public toPersistence(): T {
    return this.props;
  }
}
