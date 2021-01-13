import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class DoScgService {
  constructor(private httpService: HttpService) {}

  async checkValue(i, j, action) {
    if (action === 'plus') {
      return i + (j + 2);
    } else {
      return i - (j - 2);
    }
  }

  async getApiMap() {
    const response = await this.httpService
      .get(
        'https://maps.googleapis.com/maps/api/directions/json?origin=CentralWorld,th&destination=SCG Bangsue,th&key=AIzaSyDh_aIUOx5_DqHcAhKl7vW6r4HS_1d0bX0',
      )
      .toPromise();
    return response.data;
  }
}
