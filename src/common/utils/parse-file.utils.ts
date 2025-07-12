import { BadRequestException } from '@nestjs/common';

export const parseFileConfig = (fields: string[]) => ({
  exceptionFactory: () => {
    throw new BadRequestException(
      `Expected file(s) to be uploaded: ${fields.join(', ')}`,
    );
  },
});
