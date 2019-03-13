import Campaign , { ICampaign, Platform } from './../Campaign/model';
import { ICampaignDetail } from '../CampaignDetail/model';
import { saveCampaign } from '../Campaign/query';
import { saveCampaignDetail } from '../CampaignDetail/query';
import { IVideoAd } from 'src/VideoAd/model';
import { saveVideoAd } from '../VideoAd/query'

export default abstract class SocialFetch {

  private platform:Platform

  constructor(platform: Platform) {
    this.platform = platform
  }

  public start = async () => {
    // await this.getCampaigns()
    // await this.getCampaignDetails()
    await this.getVideoAds()
  }

  private getCampaigns = async () => {
    try {
      const campaigns:ICampaign[] = await this.fetchCampaigns()
      for(let campaign of campaigns) {
        await saveCampaign(campaign)
      }
    } catch(err) {
      console.log(err, this.platform)
    }
  }

  private getCampaignDetails = async () => {
  
      const campaigns = await Campaign.find({platform: this.platform})
      for(let campaign of campaigns) {
        try {
          const campaignDetail:ICampaignDetail = await this.fetchCampaignDetail(campaign.id)
          await saveCampaignDetail(campaignDetail)
        }catch(err) {
          console.log(err, this.platform)
        }
        
      }
  
      
    
  }

  private getVideoAds = async () => {
    const campaigns:Campaign[] = await Campaign.find({platform: this.platform})

    for(let campaign of campaigns) {
      try {
        const videoAds:IVideoAd[] = await this.fetchVideoAds(campaign.id)
        videoAds.forEach((ad) => saveVideoAd(ad))
      } catch(err) {
        console.log(err, this.platform)
      }
    }
  }

  protected abstract fetchVideoAds(campaignId:string):Promise<IVideoAd[]>
  protected abstract fetchCampaigns():Promise<ICampaign[]>
  protected abstract fetchCampaignDetail(campaignId: string):Promise<ICampaignDetail>
}