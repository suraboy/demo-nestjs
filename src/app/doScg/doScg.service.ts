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

  async getApiMap(req) {
    const origin = req.query.origin + ',th';
    const destination = req.query.destination + ',th';
    const params = {
      origin: origin,
      destination: destination,
      key: 'AIzaSyDh_aIUOx5_DqHcAhKl7vW6r4HS_1d0bX0',
    };
    const response = await this.httpService
      .get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: params,
      })
      .toPromise();
    return response.data;
  }
}
