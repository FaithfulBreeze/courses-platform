import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { QueryBus } from '@nestjs/cqrs';
import { FindReviewOwner } from './queries/find-review-owner/find-review-owner.query';

@Injectable()
export class ReviewsService {
  constructor(private readonly queryBus: QueryBus) {}

  create(createReviewInput: CreateReviewInput) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewInput: UpdateReviewInput) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  findReviewOwner(id: number) {
    return this.queryBus.execute(new FindReviewOwner(id));
  }
}
