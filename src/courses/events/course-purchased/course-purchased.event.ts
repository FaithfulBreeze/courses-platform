export class CoursePurchasedEvent {
  constructor(
    public readonly courseId: number,
    public readonly userId: number,
  ) {}
}
