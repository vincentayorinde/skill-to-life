import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssessmentStateService {
  private readonly storageKey = 'nextskill_assessment_answers';
  private readonly _answers = signal<Record<number, string>>({});
  readonly answers = this._answers.asReadonly();

  constructor() {
    this._answers.set(this.loadFromSession());
  }

  save(answers: Record<number, string>): void {
    const next = { ...answers };
    this._answers.set(next);

    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(next));
    } catch {
      // Session storage may be unavailable in tests or privacy modes.
    }
  }

  reset(): void {
    this._answers.set({});
    try {
      sessionStorage.removeItem(this.storageKey);
    } catch {
      // Session storage may be unavailable in tests or privacy modes.
    }
  }

  hasResults(): boolean {
    return Object.keys(this._answers()).length > 0;
  }

  private loadFromSession(): Record<number, string> {
    try {
      const raw = sessionStorage.getItem(this.storageKey);
      if (!raw) return {};

      const parsed = JSON.parse(raw) as unknown;
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(parsed).filter(
          ([key, value]) =>
            Number.isInteger(Number(key)) && typeof value === 'string',
        ),
      ) as Record<number, string>;
    } catch {
      return {};
    }
  }
}
