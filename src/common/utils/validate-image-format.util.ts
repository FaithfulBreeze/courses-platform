import { BadRequestException } from '@nestjs/common';

export function validateImageFormat(mimeType) {
  const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];

  if (!supportedMimeTypes.includes(mimeType.toLowerCase()))
    throw new BadRequestException(
      `Unsupported image format, Supported formats: ${supportedMimeTypes.join(', ')}`,
    );
}
