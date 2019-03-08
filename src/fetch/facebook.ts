import axios from 'axios'
import FB from '../fbSetup'
import Campaign, { ICampaign } from '../models/Campaign'
import CampaignInsight, { ICampaignInsight } from '../models/CampaignInsight'
import CampaignAd, { IAd } from '../models/CampaignAd'
import AdCreative, { IAdCreative } from '../models/AdCreative'


interface IAdInsights {
  ad_id:string
  adset_id:string
  clicks:string
  cpc:string
  cpm:string
  cpp:string
  ctr:string
  date_start:string
  date_stop:string
  frequency:string
  impressions:string
  objective:string
  reach:string
  spend:string
  unique_clicks:string
  unique_ctr:string
  video_avg_percent_watched_actions:string
  video_avg_time_watched_actions:string
}

export default class FacebookFetch {

  private accountId = process.env.FB_ACCOUNT_ID

  private fetchCampaignInsights(campaignId: string):Promise<ICampaignInsight> {

    return new Promise((resolve, reject) => {
      FB.api(`${campaignId}/insights`, { 
        fields: [
          'campaign_id',
          'clicks',
          'cost_per_unique_click',
          'cpc',
          'cpm',
          'cpp',
          'ctr',
          'date_start',
          'date_stop',
          'frequency',
          'impressions',
          'objective',
          'reach',
          'spend',
          'unique_clicks',
          'unique_ctr',
        ], date_preset: "lifetime"} , function (respond) {
        if(!respond || respond.error) {  
          reject()
        }

        resolve(respond.data[0])
      });
    })
  }

  private async getCampaigns() {
    try {
      const campaigns:ICampaign[] = await this.fetchCampaigns(this.accountId)
      for(let campaign of campaigns) {
        await this.saveCampaigns(campaign)
      }
      
    } catch(err) {
      console.log(err)
    }
    
  }

  public async fetchCampaigns(accountId: string):Promise<ICampaign[]> {
  
    return new Promise((resolve, reject) => {
      FB.api(`${accountId}/campaigns`, { 
        fields: [
          'name', 
          'id', 
          'account_id', 
          'create_time',
          'effective_status',
          'objective',
          'start_time',
          'stop_time', 
        ]} , function (results) {

        if(!results || results.error) {
          reject(results.error)
        }

        const campaigns:ICampaign[] = []
        results.data.forEach(campaign => campaigns.push(campaign))
        resolve(campaigns)
      })
    })
  }

  async saveCampaigns(campaign:ICampaign):Promise<void> {

    let newCampaign:Campaign = await Campaign.findOne({id: campaign.id})
    
    if(!newCampaign) {
      newCampaign = new Campaign()
      newCampaign.id = campaign.id
      newCampaign.account_id = campaign.account_id
      newCampaign.name = campaign.name
    }

    newCampaign.start_time = campaign.start_time
    newCampaign.stop_time = campaign.start_time
    newCampaign.objective = campaign.objective
    newCampaign.effective_status = campaign.effective_status
    await newCampaign.save()
  }

  private async saveCampaignInsights(insight:ICampaignInsight):Promise<void> {
   
    let campaignInsight = await CampaignInsight.findOne({ campaign_id: insight.campaign_id})

    if(!campaignInsight) {
      campaignInsight = new CampaignInsight()
      campaignInsight.campaign_id = insight.campaign_id
    }

    campaignInsight.clicks = insight.clicks
    campaignInsight.cost_per_unique_click = insight.cost_per_unique_click
    campaignInsight.cpc = insight.cpc
    campaignInsight.cpm = insight.cpm
    campaignInsight.cpp = insight.cpp
    campaignInsight.ctr = insight.ctr
    campaignInsight.date_start = insight.date_start
    campaignInsight.date_stop = insight.date_stop
    campaignInsight.frequency = insight.frequency
    campaignInsight.impressions = insight.impressions
    campaignInsight.objective = insight.objective
    campaignInsight.reach = insight.reach
    campaignInsight.spend = insight.spend
    campaignInsight.unique_clicks = insight.unique_clicks
    campaignInsight.unique_ctr = insight.unique_ctr
    await campaignInsight.save()
    
  }

  private async getCampaignInsights():Promise<void> {
    try {
      const campaigns:Campaign[] = await Campaign.find()
      for(let campaign of campaigns) { 
        await setTimeout(async () => {
          const insights:ICampaignInsight = await this.fetchCampaignInsights(campaign.id)
          this.saveCampaignInsights(insights)
        }, 1000)
      }
    } catch(err) {
      console.log('Facebook: Error when fetching the campaign insights')
    }
  }

  private async saveCampaignAd(ads: IAd[]) {
    for(let ad of ads) {
      let newAd:CampaignAd = await CampaignAd.findOne({id: ad.id})

      if(!newAd) {
        newAd = new CampaignAd()
        newAd.campaign_id = ad.campaign_id
        newAd.id = ad.id
      }

      newAd.creative = ad.creative
      newAd.created_time =  ad.created_time
      newAd.effective_status = ad.effective_status
      newAd.name = ad.name
      newAd.status = ad.status
      newAd.updated_time = ad.updated_time
      await newAd.save()
    }
  }

  public async getCampaignAds():Promise<void> {
    try {
      const campaigns:Campaign[] = await Campaign.find()
      for(let campaign of campaigns) {
        await setTimeout(async () => {
          const ads: IAd[] = await this.fetchCampaignAd(campaign.id)
          await this.saveCampaignAd(ads)
        }, 1000)
      }
    } catch(err) {
      console.log('Error on getting facebook campaign ads',err)
    }
  }

  private async fetchCampaignAd(campaignId):Promise<IAd[]> {
    return new Promise((resolve, reject) => {
      FB.api(`${campaignId}/ads`, { 
        fields: [
          'id',
          'campaign_id',
          'created_time',
          'creative',
          'effective_status',
          'name',
          'status',
          'updated_time'
        ]} , function (results) {
  
        if(!results || results.error) {
          reject(results.error)
        }

        console.log(results)
  
        const ads:IAd[] = []
        results.data.forEach(ad => ads.push({...ad, creative: ad.creative.id}))
        resolve(ads)
      })
    })
  }

  private async fetchAdCreative():Promise<IAdCreative[]> {
    return new Promise((resolve, reject) => {
      FB.api(`${this.accountId}/adcreatives`, { 
        fields: [
          'id',
          'video_id',
          'name',
          'status',
          'title',
          'thumbnail_url'
        ], date_preset: "lifetime"} , async (respond) => {
        if(!respond || respond.error) {  
          reject(respond.error)
        }

        const creatives:IAdCreative[] = []
        let next = respond.paging.next
        creatives.push(...respond.data)

        while(next) {
          await axios.get(next).then(({data}) => {
            next = data.paging.next
            creatives.push(...data.data)
          })
        }

        resolve(creatives)
      });
    })

  }

  private async getAdCreatives():Promise<void> {
    try {
      const adCreatives:IAdCreative[] = await this.fetchAdCreative()
      adCreatives.forEach(async (creative) => {
        await this.saveAdCreative(creative)
      })
    } catch(err) {
      console.log('Facebook: Error when fetching adCreatives', err)
    }
  }

  private async saveAdCreative(creative:IAdCreative):Promise<void> {
    if(creative.video_id) {
      let adCreative:AdCreative = await AdCreative.findOne({id: creative.id})

      if(!adCreative) {
        adCreative = new AdCreative()
        adCreative.id = creative.id
      } 

      adCreative.name = creative.name
      adCreative.status = creative.status
      adCreative.thumbnail_url = creative.thumbnail_url
      adCreative.video_id = creative.video_id
      await adCreative.save()
    }
  }

  

  public async start() {
    // await this.getCampaigns()
    // await this.getCampaignInsights()
    // await this.getAdCreatives()
    // await this.getCampaignAds() *
  }
}