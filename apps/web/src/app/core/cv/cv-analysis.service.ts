import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CvAnalysisResult } from 'types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CvAnalysisService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/cv-analysis`;

  uploadCV(file: File): Observable<CvAnalysisResult> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<CvAnalysisResult>(`${this.base}/upload`, form);
  }

  analyseText(text: string): Observable<CvAnalysisResult> {
    return this.http.post<CvAnalysisResult>(`${this.base}/text`, { text });
  }

  analyseLinkedIn(linkedinUrl: string): Observable<CvAnalysisResult> {
    return this.http.post<CvAnalysisResult>(`${this.base}/linkedin`, { linkedinUrl });
  }

  getAnalyses(): Observable<CvAnalysisResult[]> {
    return this.http.get<CvAnalysisResult[]>(this.base);
  }

  getAnalysis(id: string): Observable<CvAnalysisResult> {
    return this.http.get<CvAnalysisResult>(`${this.base}/${id}`);
  }
}
