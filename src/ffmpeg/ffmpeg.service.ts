import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { tmpdir } from 'os';
import { extname, join } from 'path';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { VercelCdnService } from 'src/vercel-cdn/vercel-cdn.service';
import { randomUUID } from 'crypto';
import { existsSync } from 'fs';

@Injectable()
export class FfmpegService {
  constructor(private readonly cdnService: VercelCdnService) {}

  async uploadAsHls(video: { content: Buffer<ArrayBufferLike>; filename: string }) {
    const tmpId = randomUUID();
    const inputExt = extname(video.filename);

    const tempDir = tmpdir();
    const inputPath = join(tempDir, `${tmpId}${inputExt}`);
    const outputPath = join(tempDir, `${tmpId}`);

    if (!existsSync(outputPath)) {
      await mkdir(outputPath, { recursive: true });
    }

    await writeFile(inputPath, Buffer.from(video.content));

    const m3u8Output = join(outputPath, `${tmpId}.m3u8`);

    const playlist = await new Promise<string>((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-i',
        inputPath,
        '-c:v',
        'copy',
        '-c:a',
        'copy',
        '-start_number',
        '0',
        '-hls_time',
        '10',
        '-hls_list_size',
        '0',
        '-f',
        'hls',
        m3u8Output,
      ]);

      let playlist = '';
      ffmpeg.on('close', async (code) => {
        if (code !== 0) {
          return reject(new Error(`ffmpeg exited with code ${code}`));
        }
        playlist = await readFile(m3u8Output, 'utf-8');
        const segmentFiles = (await readdir(outputPath)).filter((f) => f.endsWith('.ts'));
        for (const segment of segmentFiles) {
          const segmentBuffer = await readFile(join(outputPath, segment));
          const url = await this.cdnService.store({ filename: segment, content: segmentBuffer });
          playlist = playlist.replace(segment, url);
        }

        return resolve(playlist);
      });
    });

    return await this.cdnService.store({
      filename: `${tmpId}.m3u8`,
      content: Buffer.from(playlist),
    });
  }
}
