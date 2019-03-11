

import FB from '../fbSetup'
import  { ICampaign, Platform } from '../Campaign/model'
import { ICampaignDetail} from '../CampaignDetail/model'
import SocialFetch from './fetch'
import { IVideoAd } from '../VideoAd/model'

interface ICreative {
  video_id:string,
  thumbnail_url:string
}

interface IVideoInsight {
  uniqueView:string, 
  cpv:string, 
  ctr:string, 
  retention:string
  spend:string
  startDate: string,
  stopDate: string
}

export default class Facebook extends SocialFetch {
  
  private accountId:string = process.env.FB_ACCOUNT_ID

  protected fetchVideoAds(campaignId: string): Promise<IVideoAd[]> {
    return new Promise( (resolve, reject) => {
      FB.api(`${campaignId}/ads`, { 
        fields: [
          'id',
          'creative',
          'name',
        ]} , async (results) => {
  
        if(!results || results.error) {
          reject(results.error)
        }
  
        const ads:IVideoAd[] = []
        
        for(let ad of results.data) {

          try {
            const id = ad.id
            const name = ad.name

            const { video_id, thumbnail_url }:ICreative = await this.fetchAdCreative(ad.creative.id)

            const insight:IVideoInsight = await this.fetchAdVideoDetail(id)

            const videoAd:IVideoAd = {
              id,
              name,
              campaignId,
              videoId: video_id,
              thumbnail: thumbnail_url,
              ctr: insight.ctr,
              startDate: insight.startDate,
              stopDate: insight.stopDate,
              uniqueView: insight.uniqueView,
              spend: insight.spend,
              retention: insight.retention,
              cpv: insight.cpv
            
            }

            ads.push(videoAd)
          } catch(err) {

          }
          
        }

        resolve(ads)
        
      })
    })
  }

  private async fetchAdCreative(creativeId:string):Promise<ICreative> {
    return new Promise((resolve, reject) => {
      FB.api(`${creativeId}`, { 
        fields: [
          'video_id',
          'thumbnail_url'
        ], date_preset: "lifetime"} , async (respond) => {
        if(!respond || respond.error) {  
          reject(respond.error)
        }
        resolve(respond)
      });
    })

  }

  private async fetchAdVideoDetail(adId:string):Promise<IVideoInsight> {
    return new Promise( (resolve, reject) => {
      const fields:string[] = [
        'cpm',
        'ctr',
        'reach', 
        'spend', 
        'video_avg_percent_watched_actions', 
        'date_start',
        'date_stop',
      ]

      FB.api(`${adId}/insights`, { 
        fields, date_preset: "lifetime"
      } , async (results) => {
  
        if(!results || results.error) {
          reject(results.error)
        }

        const result = results.data[0]
        
        if(result) {
          resolve({
            cpv: result.cpm,
            uniqueView: result.reach,
            ctr: result.ctr,
            spend: result.spend,
            retention: result.video_avg_percent_watched_actions[0].value,
            startDate: result.date_start,
            stopDate: result.date_stop
          })
        }

        reject()

        
      })
    })
  }

  protected fetchCampaigns(): Promise<ICampaign[]> {
    return new Promise((resolve, reject) => {
      FB.api(`${this.accountId}/campaigns`, { 
        fields: [
          'name', 
          'id', 
          'effective_status',
          'start_time',
          'stop_time', 
        ]} , function (results) {

        if(!results || results.error) {
          reject(results.error)
        }

        const campaigns:ICampaign[] = []

        results.data.forEach(campaign => { 
          campaigns.push({
            id: campaign.id,
            name: campaign.name, 
            status: campaign.effective_status,
            startDate: campaign.start_time,
            stopDate: campaign.stop_time,
            platform: Platform.FACEBOOK
          })
        })

        resolve(campaigns)
      })
    })
  }

  protected fetchCampaignDetail(campaignId: string): Promise<ICampaignDetail> {
    return new Promise((resolve, reject) => {
      const fields:string[] = [
        'campaign_id',
        'reach',
        'ctr',
        'cpm', //Cost per view *
        'video_avg_percent_watched_actions', //retention
      ]

      FB.api(`${campaignId}/insights`, { 
        fields, date_preset:"lifetime"} , function (respond) {
        if(!respond || respond.error) reject(respond.error)

        if(respond && respond.data.length === 1) {
          const detail:ICampaignDetail = {
            id: campaignId,
            retention: respond.data[0].video_avg_percent_watched_actions && respond.data[0].video_avg_percent_watched_actions[0].value,
            ctr: respond.data[0].ctr,
            cpv: respond.data[0].cpm,
            uniqueViews: respond.data[0].reach
          }
          resolve(detail)
        }

        reject()
      })
    })
  }

}