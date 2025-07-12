export interface File {
  filename: string;
  content: Blob | Buffer;
  mimetype?: string;
}
