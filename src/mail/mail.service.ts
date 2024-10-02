import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

/**
 *  MailSerivce for sending email for  user activities
 */
@Injectable()
export class MailService {
  /**
   * Creates a instance for  MailService
   * @param {MailerService} mailerService - inject the mail nestjs servics
   */
  constructor(private readonly mailerService: MailerService) {}

  /**
   * sends a email when user sign-up
   * @param {User} user - user instance
   */
  public async sendUserWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Onboarding Team <support@story_pulse.org>`,
      subject: 'welcome to story pulse',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
