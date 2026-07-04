import {
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function isGoogleOAuthConfigured(): boolean {
  return Boolean(
    process.env['GOOGLE_CLIENT_ID'] &&
      process.env['GOOGLE_CLIENT_SECRET'] &&
      process.env['GOOGLE_CALLBACK_URL'],
  );
}

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  override canActivate(context: ExecutionContext) {
    if (!isGoogleOAuthConfigured()) {
      throw new ServiceUnavailableException(
        'Google OAuth is not configured. Use dev login locally or set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL.',
      );
    }

    return super.canActivate(context);
  }
}
