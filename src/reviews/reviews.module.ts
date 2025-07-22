import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Queries } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), CqrsModule.forRoot()],
  providers: [ReviewsResolver, ReviewsService, ...Queries],
})
export class ReviewsModule {}
