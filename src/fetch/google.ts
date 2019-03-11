import { ICampaignDetail } from './../CampaignDetail/model';
import{ ICampaign, Platform } from './../Campaign/model';
import { IVideoAd } from '../VideoAd/model'

import SocialFetch from './fetch';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86?sslmode=require', { dialectOptions: { ssl: true } })

export default class Google extends SocialFetch {

  protected fetchVideoAds(campaignId: string):Promise<IVideoAd[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT "adID" as id, "campaignID" as "campaignId", AVG(ctr) as ctr, AVG("avgCPV") / 100000 as cpv, SUM(views) as "uniqueView", "videoTitle" as name, "videoId",  AVG("viewRate") as retention, SUM("cost")/100000 as "spend"
        FROM google_ads."VIDEO_PERFORMANCE_REPORT"
        WHERE "campaignID" ='${campaignId}'
        GROUP BY "adID", "campaignID", "videoTitle", "videoId"
      `
      sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
        .then(result => resolve(result))
        .catch((err:any) => reject(err))
    })
  }

  protected fetchCampaignDetail(campaignId: string): Promise<ICampaignDetail> {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT AVG(ctr) as ctr, AVG("avgCPV") / 100000 as cpv, "campaignID", campaign, SUM(views) as views, AVG("viewRate") as retention
      FROM google_ads."CAMPAIGN_PERFORMANCE_REPORT"
      WHERE "campaignID" = '${campaignId}'
      GROUP BY "campaignID", campaign;
    `
      sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(result => {

        const detail: ICampaignDetail = {
          id:campaignId,
          cpv: result[0].cpv,
          ctr: result[0].ctr,
          uniqueViews: result[0].views,
          retention: result[0].retention
        }

        resolve(detail)
      }).catch((err:any) => reject(err))
    })
  }
  
  protected fetchCampaigns = ():Promise<ICampaign[]> => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT "campaignID" as id, campaign as name, "campaignState" as status, "endDate" as stopDate, "startDate"
      FROM google_ads."CAMPAIGN_PERFORMANCE_REPORT"
      GROUP BY "campaignID", "campaign", "campaignState", "endDate", "startDate";
    `
    sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then(result => {

        const campaigns:ICampaign[] = []

        result.forEach(campaign => { 
          campaigns.push({...campaign, platform: Platform.GOOGLE })
        })

        resolve(campaigns)
      }).catch((err:any) => reject(err))
    })
  }

}