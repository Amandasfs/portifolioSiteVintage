export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownCardProps {
  value: number;
  label: string;
}