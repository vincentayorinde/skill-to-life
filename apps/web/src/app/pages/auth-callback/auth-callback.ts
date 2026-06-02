import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `
    <div class="flex min-h-screen items-center justify-center bg-ns-bg">
      <p class="text-ns-muted text-sm">Signing you in…</p>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    this.auth.handleCallback(token).subscribe(() => {
      this.claimPendingResult();
    });
  }

  private claimPendingResult(): void {
    const raw = sessionStorage.getItem('ns_pending_claim');
    if (!raw) {
      this.router.navigate(['/assessment/results']);
      return;
    }

    const { resultId, anonymousToken } = JSON.parse(raw) as {
      resultId: string;
      anonymousToken: string;
    };

    this.http
      .post(`${environment.apiUrl}/api/results/${resultId}/claim`, {
        anonymousToken,
      })
      .subscribe({
        complete: () => {
          sessionStorage.removeItem('ns_pending_claim');
          this.router.navigate(['/assessment/results']);
        },
        error: () => {
          sessionStorage.removeItem('ns_pending_claim');
          this.router.navigate(['/assessment/results']);
        },
      });
  }
}
