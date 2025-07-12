import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { del, put } from '@vercel/blob';
import { CdnService } from 'src/common/abstractions/cdn.interface';
import { File } from 'src/common/interfaces/file.interface';

@Injectable()
export class VercelCdnService implements CdnService {
  private token: string;
  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.getOrThrow<string>(
      'COURSE_PLATFORM_STORE_READ_WRITE_TOKEN',
    );
  }

  delete(identifier: string): void {
    del(identifier, { token: this.token });
  }

  async store(file: File): Promise<string> {
    const { url } = await put(file.filename, file.content, {
      addRandomSuffix: true,
      access: 'public',
      token: this.token,
    });

    return url;
  }
}
