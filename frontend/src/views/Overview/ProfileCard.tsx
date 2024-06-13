import Card from '@/components/Card';
import bgPattern from '@/assets/bg-pattern.svg';
import Avatar from '@/components/Avatar';
import { calculateAge } from '@/app/utils';
import Divider from '@/components/Divider';
import { Profile } from '@/app/definitions';
import ArrowUpDownIcon from '@/components/ArrowUpDownIcon';
import { useAppSelector } from '@/app/hooks';
import { selectStatsData } from '@/services/stats/statsSlice';

interface ProfileCardProps {
  profile: Profile | undefined;
}

const getColor = (condition: boolean) => (condition ? 'text-green-500' : 'text-red-500');

export default function ProfileCard({ profile }: ProfileCardProps) {
  const stats = useAppSelector(selectStatsData);
  const muscleVariation = stats?.latestVariations?.muscleKg || 0;
  const muscleColor = getColor(muscleVariation >= 0);
  const bodyFatVariation = stats?.latestVariations?.bodyFatKg || 0;
  const bodyFatColor = getColor(bodyFatVariation <= 0);
  const weightVariation = stats?.latestVariations?.weight || 0;

  return (
    <Card className="overflow-hidden w-full md:w-1/3 md:min-w-fit">
      <img
        src={bgPattern}
        width="100%"
        height="50%"
        style={{
          overflow: 'hidden',
        }}
      />
      <div className="flex justify-center -mt-11">
        <Avatar
          stringAvatar={profile?.name}
          size="xl"
          outline
        />
      </div>
      <div className="flex flex-col gap-3 items-center p-3">
        <h6>{profile?.name}</h6>
        <p className="body2">{profile?.gender}</p>
        <p className="body2">{calculateAge(profile?.birthdate)}</p>
        <Divider />
        <p>Latest Variations</p>
        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-center">
            <h6 className={muscleColor}>
              <strong>{`${muscleVariation} kg`}</strong>
              {muscleVariation !== 0 && <ArrowUpDownIcon shouldBeUp={muscleVariation >= 0} />}
            </h6>
            <p className="body2 text-gray-600">Muscle</p>
          </div>
          <div className="flex flex-col items-center">
            <h6 className={bodyFatColor}>
              <strong>{`${bodyFatVariation} kg`}</strong>
              {bodyFatVariation !== 0 && <ArrowUpDownIcon shouldBeUp={bodyFatVariation >= 0} />}
            </h6>
            <p className="body2 text-gray-600">Body Fat</p>
          </div>
          <div className="flex flex-col items-center">
            <h6>
              <strong>{`${weightVariation} kg`}</strong>
              {weightVariation !== 0 && <ArrowUpDownIcon shouldBeUp={weightVariation >= 0} />}
            </h6>
            <p className="body2 text-gray-600">Weight</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
