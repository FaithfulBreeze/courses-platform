import { BadRequestException } from '@nestjs/common';

export function validateVideoFormat(mimeType) {
  const supportedMimeTypes = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/webm',
  ];

  if (!supportedMimeTypes.includes(mimeType.toLowerCase()))
    throw new BadRequestException(
      `Unsupported video format, Supported formats: ${supportedMimeTypes.join(', ')}`,
    );
}
