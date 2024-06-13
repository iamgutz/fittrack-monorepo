import { ElementType } from 'react';

export type Profile = {
  id: string;
  name: string;
  gender: string;
  birthdate: string;
};

export type User = {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type ColumnItem = {
  key: string;
  label: string;
  renderComponent?: ElementType;
};

export type ColumnsList = ColumnItem[];

export interface ProgressRecord {
  id: string;
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bodyFat: string;
  bodyFatKg: string;
  muscle: string;
  muscleKg: string;
  visceral: number;
  calories: number;
  metabolicAge: number;
  [key: string]: any;
}
