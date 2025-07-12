import { Test, TestingModule } from '@nestjs/testing';
import { VercelCdnService } from './vercel-cdn.service';

describe('VercelCdnService', () => {
  let service: VercelCdnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VercelCdnService],
    }).compile();

    service = module.get<VercelCdnService>(VercelCdnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
