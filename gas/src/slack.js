import { getBody } from './body';

export const sendSlackNotification = (centers, slackIncomingUrl) => {
  const { length } = centers;
  if (length > 0) {
    const { count, body } = getBody(centers);
    const slackObj = {
      text: `Vaccines are available in ${count} centers`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${body}`,
          },
        },
      ],
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(slackObj),
    };
    UrlFetchApp.fetch(slackIncomingUrl, options);
  }
};
