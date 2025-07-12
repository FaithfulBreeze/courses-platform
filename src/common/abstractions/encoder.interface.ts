export interface EncoderService {
  encode(value: string): Promise<string>;
  compare(encodedValue: string, plainValue: string): Promise<boolean>;
}
