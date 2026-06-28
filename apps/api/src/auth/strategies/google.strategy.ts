import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env['GOOGLE_CLIENT_ID'] || 'development-client-id',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || 'development-client-secret',
      callbackURL:
        process.env['GOOGLE_CALLBACK_URL'] ||
        'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: {
      id: string;
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: VerifyCallback,
  ): Promise<void> {
    const user = await this.authService.findOrCreateUser({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0]?.value,
    });
    done(null, user);
  }
}
