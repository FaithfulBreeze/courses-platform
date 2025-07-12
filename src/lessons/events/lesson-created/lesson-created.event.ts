import { Lesson } from '../../entities/lesson.entity';

export class LessonCreatedEvent {
  constructor(
    public readonly lesson: Lesson,
    public readonly userId: number,
  ) {}
}
