export interface CareerMatchDto {
  careerId: string;
  title: string;
  emoji: string;
  score: number;
  percentage: number;
  matchTier: string;
}

export class CreateResultDto {
  answers!: Record<number, string>;
  topCareer!: string;
  topPercentage!: number;
  allMatches!: CareerMatchDto[];
  anonymousToken?: string;
}
