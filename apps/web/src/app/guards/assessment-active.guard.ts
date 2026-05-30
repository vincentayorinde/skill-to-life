import { CanDeactivateFn } from '@angular/router';
import { AssessmentComponent } from '../pages/assessment/assessment';

export const assessmentActiveGuard: CanDeactivateFn<AssessmentComponent> = (
  component,
) => {
  if (!component.hasAnswers() || component.isComplete) return true;
  return confirm('Your progress will be lost. Are you sure you want to leave?');
};
