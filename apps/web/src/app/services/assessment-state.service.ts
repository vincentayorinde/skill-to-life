import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssessmentStateService {
  private readonly storageKey = 'skill_to_life_assessment_answers';
  private readonly localStorageKey = 'skilltolife_pending_assessment_result';
  private readonly _answers = signal<Record<number, string>>({});
  readonly answers = this._answers.asReadonly();

  constructor() {
    const fromSession = this.loadFromSession();
    if (Object.keys(fromSession).length > 0) {
      this._answers.set(fromSession);
    } else {
      this._answers.set(this.loadFromLocalStorage());
    }
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

  saveToLocalStorage(): void {
    try {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify({ answers: this._answers(), savedAt: new Date().toISOString() }),
      );
    } catch {
      // localStorage may be unavailable in privacy modes.
    }
  }

  clearLocalStorage(): void {
    try {
      localStorage.removeItem(this.localStorageKey);
    } catch {
      // localStorage may be unavailable in privacy modes.
    }
  }

  reset(): void {
    this._answers.set({});
    try {
      sessionStorage.removeItem(this.storageKey);
    } catch {
      // Session storage may be unavailable in tests or privacy modes.
    }
    this.clearLocalStorage();
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

  private loadFromLocalStorage(): Record<number, string> {
    try {
      const raw = localStorage.getItem(this.localStorageKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as { answers?: Record<number, string>; savedAt?: string };
      if (!parsed?.answers || typeof parsed.answers !== 'object' || Array.isArray(parsed.answers)) {
        return {};
      }
      return Object.fromEntries(
        Object.entries(parsed.answers).filter(
          ([key, value]) =>
            Number.isInteger(Number(key)) && typeof value === 'string',
        ),
      ) as Record<number, string>;
    } catch {
      return {};
    }
  }
}
