import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { EncoderService } from '../common/abstractions/encoder.interface';

@Injectable()
export class BcryptService implements EncoderService {
  async encode(value: string) {
    return hash(value, 2);
  }
  async compare(encodedValue: string, plainValue: string) {
    return compare(plainValue, encodedValue);
  }
}
