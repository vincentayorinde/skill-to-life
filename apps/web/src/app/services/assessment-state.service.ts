import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssessmentStateService {
  private readonly _answers = signal<Record<number, string>>({});
  readonly answers = this._answers.asReadonly();

  save(answers: Record<number, string>): void {
    this._answers.set({ ...answers });
  }

  reset(): void {
    this._answers.set({});
  }

  hasResults(): boolean {
    return Object.keys(this._answers()).length > 0;
  }
}
