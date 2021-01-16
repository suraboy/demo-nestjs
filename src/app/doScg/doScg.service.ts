import { Injectable, HttpService } from '@nestjs/common';
import line from '@line/bot-sdk';
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

  async replyNotificationLine(req) {
    console.log(req.body);
    return Promise.all(req.body.events.map(this.handleEvent))
      .then((result) => result)
      .catch((err) => {
        return err;
      });
  }

  async handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }

    // create a echoing text message
    const msg = { type: 'text', text: event.message.text };

    // use reply API
    const config = {
      port: '3000',
      channelAccessToken:
        'xtIfH3QvXevzWsAx1ZuVpX6ZOumnotpATBwRIynlTxFaHZjkELd7E5+O9ZT4P8Ie9nowsUesQPXwMf809xP8dL36XH01GOrfw6VTzW+CiT+k11EJ7mOImFU+PysBj0r8anMjVYeKiRXPUCO0WyVn/QdB04t89/1O/w1cDnyilFU=',
      channelSecret: 'c15860620551e807c13c988bd5014f5d',
    };

    const client = new line.Client(config);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return client.replyMessage(event.replyToken, msg);
  }
}
