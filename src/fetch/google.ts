import { ICampaign, Platform } from './../Campaign/model';
import { saveCampaign } from '../Campaign/query'

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86?sslmode=require', { dialectOptions: { ssl: true } })

export default class Google {

  
  private fetchCampaigns = ():Promise<ICampaign[]> => {
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
  private getCampaigns = async () => {
    const campaigns:ICampaign[] = await this.fetchCampaigns()
    for(let campaign of campaigns) {
      saveCampaign(campaign)
    }
  }
  public start = async () => {
    // this.getCampaigns()
  }
}