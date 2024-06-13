import { useAppSelector } from '@/app/hooks';
import { selectStatsData } from '@/services/stats/statsSlice';
import { Box, Grid, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScaleIcon from '@mui/icons-material/Scale';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StraightenIcon from '@mui/icons-material/Straighten';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Card from '@/components/Card';
import ArrowUpDownIcon from '@/components/ArrowUpDownIcon';

const ITEMS = [
  {
    key: 'dateFirst',
    label: 'From',
    icon: EventIcon,
  },
  {
    key: 'dateLast',
    label: 'To',
    icon: EventIcon,
  },
  {
    key: 'daysPassed',
    label: 'Days',
    icon: DateRangeIcon,
  },
  {
    key: 'heightDiff',
    label: 'Height',
    icon: EmojiPeopleIcon,
    suffix: ' cm',
    trackProgress: true,
  },
  {
    key: 'weightDiff',
    label: 'Weight',
    icon: ScaleIcon,
    suffix: ' kg',
    trackProgress: true,
  },
  {
    key: 'caloriesDiff',
    label: 'Calories',
    icon: FastfoodIcon,
    suffix: ' kcal',
  },
  {
    key: 'bmiDiff',
    label: 'BMI',
    icon: AnalyticsIcon,
    trackProgress: true,
  },
  {
    key: 'bodyFatDiff',
    label: 'Body Fat',
    icon: StraightenIcon,
    suffix: '%',
    trackProgress: true,
  },
  {
    key: 'bodyFatKgDiff',
    label: 'Body Fat Kg',
    icon: StraightenIcon,
    suffix: ' kg',
    trackProgress: true,
  },
  {
    key: 'muscleDiff',
    label: 'Muscle',
    icon: FitnessCenterIcon,
    suffix: '%',
    trackProgress: true,
  },
  {
    key: 'muscleKgDiff',
    label: 'Muscle Kg',
    icon: FitnessCenterIcon,
    suffix: ' kg',
    trackProgress: true,
  },
  {
    key: 'visceralDiff',
    label: 'Visceral',
    icon: AccessibilityIcon,
    trackProgress: true,
  },
  {
    key: 'metabolicAgeDiff',
    label: 'Metabolic Age',
    icon: ElderlyIcon,
    suffix: ' years',
    trackProgress: true,
  },
];

const ProgressOverviewCard = () => {
  const stats: any = useAppSelector(selectStatsData);
  if (!stats) {
    return null;
  }
  return (
    <Card className="w-full">
      <Box
        px={3}
        pb={3}
      >
        <Box py={2}>
          <Typography
            variant="h6"
            align="center"
          >
            Progress Overview Variations
          </Typography>
        </Box>
        <Grid
          container
          spacing={5}
        >
          {ITEMS.map(item => {
            const ItemIcon = item.icon;
            const itemValue = stats[item.key];
            console.log(stats);
            return (
              <Grid
                key={item.key}
                item
                xs={4}
                sm={3}
                md={4}
                lg={4}
              >
                <Box
                  display="flex"
                  alignItems="flex-start"
                >
                  <Box mr={1}>
                    <ItemIcon />
                  </Box>
                  <div>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2">
                      <strong>{`${itemValue}${item.suffix ? item.suffix : ''}`}</strong>
                    </Typography>
                  </div>
                  {item.trackProgress && (
                    <ArrowUpDownIcon
                      fontSize="small"
                      shouldBeUp={itemValue >= 0}
                    />
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default ProgressOverviewCard;
