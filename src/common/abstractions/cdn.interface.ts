import { File } from '../interfaces/file.interface';

export interface CdnService {
  store(file: File): Promise<string>;
  delete(identifier: string): void;
}
