import { gql } from '@apollo/client';
import BaseApi from '../../api/baseApi';
import { ProgressRecord } from '@/app/definitions';

class RecordsApi extends BaseApi {
  async fetchRecordsByProfileId(
    pid: string,
    sortBy?: string,
    order?: string,
  ): Promise<ProgressRecord[]> {
    const response = await this.query(
      gql`
            query($pid: ID!, $sortBy: String, $order: String) { 
                records (profileId: $pid, sortBy: $sortBy, order: $order) { 
                    id,
                    date,
                    height,
                    weight,
                    bmi,
                    bodyFat,
                    bodyFatKg,
                    muscle,
                    muscleKg,
                    visceral,
                    calories,
                    metabolicAge,
                    createdAt,
                    updatedAt,
                } 
            }
        `,
      { pid, sortBy, order },
      { fetchPolicy: 'network-only' },
    );
    return response.data.records;
  }

  async createRecord(data: any): Promise<ProgressRecord> {
    const response = await this.mutate(
      gql`
            mutation(
                    $profileId: ID!
                    $date: Date!
                    $height: Decimal!
                    $weight: Decimal!
                    $bmi: Decimal
                    $bodyFat: Decimal
                    $muscle: Decimal
                    $visceral: Int
                    $calories: Int
                    $metabolicAge: Int
                ){
                createRecord(
                    profileId: $profileId,
                    date: $date,
                    height: $height,
                    weight: $weight,
                    bmi: $bmi,
                    bodyFat: $bodyFat,
                    muscle: $muscle,
                    visceral: $visceral,
                    calories: $calories,
                    metabolicAge: $metabolicAge,
                )
                {
                    record {
                        id,
                        date,
                        height,
                        weight,
                        bmi,
                        bodyFat,
                        muscle,
                        visceral,
                        calories,
                        metabolicAge,
                        createdAt,
                        updatedAt,
                    }
                }
            }
        `,
      {
        profileId: data.profileId,
        date: data.date,
        height: data.height,
        weight: data.weight,
        bmi: data.bmi,
        bodyFat: data.bodyFat,
        muscle: data.muscle,
        visceral: data.visceral,
        calories: data.calories,
        metabolicAge: data.metabolicAge,
      },
    );

    return response?.data?.createRecord;
  }

  async updateRecord(data: any): Promise<ProgressRecord> {
    const response = await this.mutate(
      gql`
            mutation(
                    $id: ID!
                    $date: Date
                    $height: Decimal
                    $weight: Decimal
                    $bmi: Decimal
                    $bodyFat: Decimal
                    $muscle: Decimal
                    $visceral: Int
                    $calories: Int
                    $metabolicAge: Int
                ){
                updateRecord(
                    id: $id,
                    date: $date,
                    height: $height,
                    weight: $weight,
                    bmi: $bmi,
                    bodyFat: $bodyFat,
                    muscle: $muscle,
                    visceral: $visceral,
                    calories: $calories,
                    metabolicAge: $metabolicAge,
                )
                {
                    record {
                        id,
                        date,
                        height,
                        weight,
                        bmi,
                        bodyFat,
                        muscle,
                        visceral,
                        calories,
                        metabolicAge,
                        createdAt,
                        updatedAt,
                    }
                }
            }
        `,
      {
        id: data.id,
        date: data.date,
        height: data.height,
        weight: data.weight,
        bmi: data.bmi,
        bodyFat: data.bodyFat,
        muscle: data.muscle,
        visceral: data.visceral,
        calories: data.calories,
        metabolicAge: data.metabolicAge,
      },
    );

    return response?.data?.updateRecord;
  }

  async deleteRecord(id: string): Promise<ProgressRecord> {
    const response = await this.mutate(
      gql`
            mutation($id: ID!){
                deleteRecord(id: $id)
                {
                    success
                }
            }
        `,
      { id },
    );

    return response?.data?.deleteRecord;
  }
}

export default RecordsApi;
