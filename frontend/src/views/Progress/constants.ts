import { ColumnsList } from '@/app/definitions';
import { DateCell, KgPercentageCell, WeightCell } from './cellComponents';
import EventIcon from '@mui/icons-material/Event';
import ScaleIcon from '@mui/icons-material/Scale';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StraightenIcon from '@mui/icons-material/Straighten';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const RECORDS_TABLE_COLUMNS: ColumnsList = [
  {
    key: 'date',
    label: 'Date',
    renderComponent: DateCell,
  },
  {
    key: 'weight',
    label: 'Weight',
    renderComponent: WeightCell,
  },
  {
    key: 'bmi',
    label: 'BMI',
  },
  {
    key: 'bodyFat',
    label: 'Body Fat',
    renderComponent: KgPercentageCell,
  },
  {
    key: 'muscle',
    label: 'Muscle',
    renderComponent: KgPercentageCell,
  },
];

export const RECORD_DETAIL_ITEMS = [
  {
    key: 'date',
    label: 'Date',
    icon: EventIcon,
  },
  {
    key: 'height',
    label: 'Height',
    icon: EmojiPeopleIcon,
    suffix: ' cm',
  },
  {
    key: 'weight',
    label: 'Weight',
    icon: ScaleIcon,
    suffix: ' kg',
  },
  {
    key: 'bodyFat',
    label: 'Body Fat',
    icon: StraightenIcon,
    suffix: '%',
  },
  {
    key: 'muscle',
    label: 'Muscle',
    icon: FitnessCenterIcon,
    suffix: '%',
  },
  {
    key: 'visceral',
    label: 'Visceral',
    icon: AccessibilityIcon,
  },
  {
    key: 'bmi',
    label: 'BMI',
    icon: AnalyticsIcon,
  },
  {
    key: 'metabolicAge',
    label: 'Metabolic Age',
    icon: ElderlyIcon,
    suffix: ' years',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: FastfoodIcon,
    suffix: ' kcal',
  },
];

export const FIELD_IDS = {
  DATE: 'date',
  HEIGHT: 'height',
  WEIGHT: 'weight',
  BMI: 'bmi',
  BODY_FAT: 'bodyFat',
  MUSCLE: 'muscle',
  VISCERAL: 'visceral',
  CALORIES: 'calories',
  METABOLIC_AGE: 'metabolicAge',
};

export const RECORD_FIELDS = [
  {
    id: FIELD_IDS.DATE,
    label: 'Date',
    type: 'date',
    placeholder: 'yyyy-mm-dd',
    required: true,
  },
  {
    id: FIELD_IDS.HEIGHT,
    label: 'Height (cm)',
    type: 'number',
    placeholder: '170.00',
    required: true,
  },
  {
    id: FIELD_IDS.WEIGHT,
    label: 'Weight (kg)',
    type: 'number',
    placeholder: '70.00',
    required: true,
  },
  {
    id: FIELD_IDS.BMI,
    label: 'BMI',
    type: 'number',
    placeholder: '20',
    required: true,
  },
  {
    id: FIELD_IDS.BODY_FAT,
    label: 'Body Fat (%)',
    type: 'number',
    placeholder: '20.00',
    required: true,
  },
  {
    id: FIELD_IDS.MUSCLE,
    label: 'Muscle (%)',
    type: 'number',
    placeholder: '30',
    required: true,
  },
  {
    id: 'visceral',
    label: 'Visceral',
    type: 'number',
    placeholder: '10',
    required: true,
  },
  {
    id: FIELD_IDS.CALORIES,
    label: 'Calories',
    type: 'number',
    placeholder: '2000',
    required: true,
  },
  {
    id: FIELD_IDS.METABOLIC_AGE,
    label: 'Metabolic Age (years)',
    type: 'number',
    placeholder: '24',
    required: true,
  },
];
