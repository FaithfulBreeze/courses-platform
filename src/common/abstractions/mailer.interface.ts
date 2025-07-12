import { MailArgs } from '../interfaces/mail.interface';

export interface MailerService {
  sendMail(mailArgs: MailArgs): void;
}
