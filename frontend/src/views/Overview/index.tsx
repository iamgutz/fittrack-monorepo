import { useAppDispatch } from '@/app/hooks';
import { useAppContext } from '@/contexts/AppContext';
import { fetchStats } from '@/services/stats/statsSlice';
import { useEffect } from 'react';
import ProfileCard from './ProfileCard';
import ProgressChartCard from './ProgressChartCard';
import BodyCompositionCard from './BodyCompositionCard';
import ProgressOverviewCard from './ProgressOverviewCard';

export default function Overview() {
  const dispatch = useAppDispatch();
  const { session, profile } = useAppContext();

  useEffect(() => {
    dispatch(fetchStats({ profileId: session.pid, startDate: '2022-12-03' }));
  }, [dispatch, session.pid]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <ProfileCard profile={profile} />
        <ProgressOverviewCard />
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <ProgressChartCard />
        <BodyCompositionCard />
      </div>
    </>
  );
}
