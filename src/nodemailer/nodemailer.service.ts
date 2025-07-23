import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { MailerService } from '../common/abstractions/mailer.interface';
import { MailArgs } from '../common/interfaces/mail.interface';

@Injectable()
export class NodemailerService implements MailerService {
  private transporter: Transporter;
  private transporterConfig: {
    service: string;
    email: string;
    password: string;
  };

  constructor(private readonly configService: ConfigService) {
    this.transporterConfig = {
      service: this.configService.getOrThrow<string>('NODEMAILER_SERVICE'),
      email: this.configService.getOrThrow<string>('NODEMAILER_EMAIL'),
      password: this.configService.getOrThrow<string>('NODEMAILER_PASSWORD'),
    };
    this.transporter = createTransport({
      service: this.transporterConfig.service,
      auth: {
        user: this.transporterConfig.email,
        pass: this.transporterConfig.password,
      },
    });
  }

  sendMail(mailArgs: MailArgs): void {
    this.transporter.sendMail({
      from: this.transporterConfig.email,
      to: mailArgs.addressee,
      subject: mailArgs.subject,
      text: mailArgs.content,
    });
  }
}
