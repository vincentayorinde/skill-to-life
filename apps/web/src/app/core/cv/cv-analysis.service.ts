import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CvAnalysisResult } from 'types';
import { environment } from '../../../environments/environment';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({ providedIn: 'root' })
export class CvAnalysisService {
  private readonly http = inject(HttpClient);
  private readonly analytics = inject(AnalyticsService);
  private readonly base = `${environment.apiUrl}/api/cv-analysis`;

  uploadCV(file: File): Observable<CvAnalysisResult> {
    const form = new FormData();
    form.append('file', file);
    this.analytics.trackEvent('cv_upload_started');
    this.analytics.trackEvent('cv_analysis_started', {
      selected_category: 'upload',
    });
    return this.http.post<CvAnalysisResult>(`${this.base}/upload`, form).pipe(
      tap(() => {
        this.analytics.trackEvent('cv_upload_completed');
        this.analytics.trackEvent('cv_analysis_completed', {
          selected_category: 'upload',
        });
      }),
    );
  }

  analyseText(text: string): Observable<CvAnalysisResult> {
    this.analytics.trackEvent('cv_analysis_started', {
      selected_category: 'text',
    });
    return this.http.post<CvAnalysisResult>(`${this.base}/text`, { text }).pipe(
      tap(() =>
        this.analytics.trackEvent('cv_analysis_completed', {
          selected_category: 'text',
        }),
      ),
    );
  }

  analyseLinkedIn(linkedinUrl: string): Observable<CvAnalysisResult> {
    this.analytics.trackEvent('cv_analysis_started', {
      selected_category: 'linkedin',
    });
    return this.http
      .post<CvAnalysisResult>(`${this.base}/linkedin`, {
        linkedinUrl,
      })
      .pipe(
        tap(() =>
          this.analytics.trackEvent('cv_analysis_completed', {
            selected_category: 'linkedin',
          }),
        ),
      );
  }

  getAnalyses(): Observable<CvAnalysisResult[]> {
    return this.http.get<CvAnalysisResult[]>(this.base);
  }

  getAnalysis(id: string): Observable<CvAnalysisResult> {
    return this.http.get<CvAnalysisResult>(`${this.base}/${id}`);
  }
}
