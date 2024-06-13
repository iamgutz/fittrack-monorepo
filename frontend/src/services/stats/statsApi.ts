import { gql } from '@apollo/client';
import BaseApi from '../../api/baseApi';

interface LatestVariationsType {
    muscle: number;
    bodyFat: number;
    muscleKg: number;
    bodyFatKg: number;
    weight: number;
}
interface PieChartType {
    name: string;
    value: string;
}
interface LineChartType {
    date: string;
    weight: string;
}
export interface StatsType {
    dateFirst: string;
    dateLast: string;
    latestVariations: LatestVariationsType;
    pieChart: PieChartType[];
    lineChart: LineChartType[];
}

export interface FetchParams {
    profileId: string;
    startDate?: string;
    endDate?: string;
}

class StatsApi extends BaseApi {
    async fetchStats(params: FetchParams): Promise<StatsType> {
        const response = await this.query(
            gql`
            query($pId: ID!, $sDate: String, $eDate: String) { 
                stats (profileId: $pId, startDate: $sDate, endDate: $eDate) { 
                    dateFirst,
                    dateLast,
                    daysPassed,
                    heightDiff,
                    weightDiff,
                    muscleDiff,
                    muscleKgDiff,
                    bodyFatDiff,
                    bodyFatKgDiff,
                    visceralDiff,
                    bmiDiff,
                    metabolicAgeDiff,
                    caloriesDiff,
                    latestVariations {
                        muscleKg,
                        bodyFatKg,
                        weight
                    },
                    pieChart {
                        name,
                        value
                    },
                    lineChart {
                        date,
                        weight
                    }
                } 
            }
        `,
            { pId: params.profileId, sDate: params.startDate, eDate: params.endDate },
        );

        return response.data.stats;
    }
}

export default StatsApi;
