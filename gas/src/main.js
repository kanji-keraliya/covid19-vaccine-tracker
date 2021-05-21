import { findCenters } from './centers';
import { getData } from './data';
import { sendEmail } from './email';
import { getLocations } from './locations';
import { sendSlackNotification } from './slack';

export const app = () => {
  try {
    if (MailApp.getRemainingDailyQuota() > 1) {
      const data = getData();
      if (data) {
        const { pincode, email, webhookUrl, ...rest } = data;
        const locations = getLocations(pincode)
          .map((centers) => findCenters(centers, rest))
          .filter((centers) => centers.length > 0);

        /* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
        console.log('centers', locations);
        if (locations.length > 0) {
          sendEmail(locations, email);
          try {
            if (webhookUrl) {
              sendSlackNotification(locations, webhookUrl);
            }
          } catch (f) {
            console.log('ERROR while sending slack notifications', f);
          }
        }
      }
    }
  } catch (f) {
    //
  }
};
