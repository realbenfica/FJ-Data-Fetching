import axios from 'axios'
import FB from '../fbSetup'

import Campaign, { ICampaign } from '../models/Campaign'
import CampaignInsight, { ICampaignInsight } from '../models/CampaignInsight'
import CampaignAdInsight, { IVideoDetail, IAdInsight, IVideoInsight, ICampaignAdInsight } from '../models/CampaignAdInsight';
import CampaignAd, { IAd } from '../models/CampaignAd'
import AdCreative, { IAdCreative } from '../models/AdCreative'

export default class FacebookFetch {

  private accountId:string = process.env.FB_ACCOUNT_ID

  

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

  private fetchCampaignInsights(campaignId: string):Promise<ICampaignInsight> {
    return new Promise((resolve, reject) => {
      const fields:string[] = [
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
      ]

      FB.api(`${campaignId}/insights`, { 
        fields, date_preset: "lifetime"} , function (respond) {
        if(!respond || respond.error) reject()
        resolve(respond.data[0])
      })
    })
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

      newAd.video_id = ad.video_id
      newAd.creative = ad.creative
      newAd.created_time =  ad.created_time
      newAd.effective_status = ad.effective_status
      newAd.name = ad.name
      newAd.status = ad.status
      newAd.updated_time = ad.updated_time
      await newAd.save()
    }

    return
  }

  public async getCampaignAds():Promise<void> {
    try {
      const campaigns:Campaign[] = await Campaign.find()
      for(let campaign of campaigns) {
        await setTimeout(async () => {
          const ads: IAd[] = await this.fetchCampaignAd(campaign.id)
          await this.saveCampaignAd(ads)
        }, 2000)
      }
    } catch(err) {
      console.log('Error on getting facebook campaign ads',err)
    }
  }

  private async fetchCampaignAd(campaignId):Promise<IAd[]> {
    return new Promise( (resolve, reject) => {
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
        ]} , async (results) => {
  
        if(!results || results.error) {
          reject(results.error)
        }
  
        const ads:IAd[] = []

        for(let ad of results.data) {
          const creative:AdCreative = await AdCreative.findOne({id: ad.creative.id})
          if(creative) {
            ads.push({...ad, creative: ad.creative.id, video_id: creative.video_id})
          }
        }

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

  private async fetchAdInsight(adId:string):Promise<IAdInsight> {
    return new Promise( (resolve, reject) => {
      const fields:string[] = [
        'ad_id',
        'clicks',
        'cpc',
        'cpm',
        'cpp',
        'ctr',
        'frequency',
        'impressions',
        'objective',
        'reach',
        'spend'
      ]

      FB.api(`${adId}/insights`, { 
        fields, date_preset: "lifetime"
      } , async (results) => {
  
        if(!results || results.error) {
          reject(results.error)
        }

        resolve({...results.data[0], ad_id: adId})
      })
    })
  }

  private async fetchVideoInsight(videoId:string):Promise<IVideoInsight> {
    return new Promise( (resolve, reject) => {
      const metric:string[] = [
        'total_video_views_unique'
      ]

      FB.api(`${videoId}/video_insights`, { 
        metric, period: "lifetime", date_preset: "lifetime"
      } , async (results:any) => {
  
        if(!results || results.error) {
          reject(results.error)
        }

        let videoInsight:IVideoInsight = {
          total_video_views_unique: results.data[0].values[0].value,
        }

        resolve(videoInsight)
      })
    })
  }

  private async fetchVideoDetail(videoId:string):Promise<IVideoDetail> {
    return new Promise( (resolve, reject) => {
      const fields:string[] = [
        'id',
        'icon',
        'picture',
        'created_time'
      ]

      FB.api(`${videoId}/`, { 
        fields: fields 
      } , async (results) => {
  
        if(!results || results.error) {
          reject(results.error)
        }

        resolve({...results, id:videoId})
      })
    })
  }

  private async getCampaignAdInsights():Promise<void> {
    const ads:CampaignAd[] = await CampaignAd.find()

    for(let ad of ads) {
      const adInsight:IAdInsight = await this.fetchAdInsight(ad.id)
      const videoDetail:IVideoDetail = await this.fetchVideoDetail(ad.video_id)
      const videoInsight:IVideoInsight =  await this.fetchVideoInsight(ad.video_id)

      const campaignAdInsight:ICampaignAdInsight = {
        ...adInsight,
        ...videoDetail,
        ...videoInsight
      }

      await this.saveCampaignAdInsight(campaignAdInsight)
    }

  }

  private async saveCampaignAdInsight(insight:ICampaignAdInsight):Promise<void> {

    let newAdInsight:CampaignAdInsight = await CampaignAdInsight.findOne({ad_id: insight.ad_id})
    if(!newAdInsight) {
      newAdInsight =  new CampaignAdInsight()
      newAdInsight.ad_id = insight.ad_id
    }

    newAdInsight.clicks = insight.clicks
    newAdInsight.cpc = insight.cpc
    newAdInsight.cpm = insight.cpm
    newAdInsight.cpp = insight.cpp
    newAdInsight.created_time = insight.created_time
    newAdInsight.ctr = insight.ctr
    newAdInsight.frequency = insight.frequency
    newAdInsight.icon = insight.icon
    newAdInsight.impressions = insight.impressions
    newAdInsight.objective = insight.objective
    newAdInsight.picture = insight.picture
    newAdInsight.reach = insight.reach
    newAdInsight.spend = insight.spend
    newAdInsight.total_video_views_unique = insight.total_video_views_unique
    await newAdInsight.save()
  }

  

  public async start() {
    // await this.getCampaigns()
    // await this.getCampaignInsights()
    // await this.getAdCreatives()
    // await this.getCampaignAds()
    // await this.getCampaignAdInsights()
  }
}