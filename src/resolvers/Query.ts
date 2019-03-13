import Campaign from "../Campaign/model";
import TrackedCampaign from "../TrackedCampaign/model"
import CampaignDetail from "../CampaignDetail/model"
import chalk from 'chalk'
import { Any } from 'typeorm'

const Query = {
  getCampaigns: async (_, { where, paginate }:any) => {
    const facebook = await Campaign.find({platform: 'FACEBOOK'})
    const google = await Campaign.find({platform: 'GOOGLE'})
    return {
      google,
      facebook
    }
  },

  getCampaignsDetails: async (_, params) => {
    const campaign:Campaign = await  Campaign.findOne({id: params.id})
    return campaign
  },

  getAllCampaignPerformance: async () => {
    const campaigns: TrackedCampaign[] = await TrackedCampaign.find()
    const comparedCampaigns:IComparedCampaign[] = []

    for(let campaign of campaigns) {
      const comparedCampaign = await getComparedPerformance(campaign.id)
      comparedCampaigns.push(comparedCampaign)
    }

    return comparedCampaigns
  }, 

  getCampaignPerformance: async (ctx, {id}) => {
    const campaign: TrackedCampaign = await TrackedCampaign.findOne({id})
    return await getComparedPerformance(campaign.id)
  }
}

const getComparedPerformance = (id:string):Promise<IComparedCampaign> => {

  return new Promise(async (resolve, reject) => {
    const campaign: TrackedCampaign = await TrackedCampaign.findOne({id})

    const campaignsDetail: CampaignDetail[] = await CampaignDetail.find({id: Any([campaign.facebookCampaignId, campaign.googleCampaignId])})
    
    let unique_views:number = 0
    let ctr:number = 0
    let retention:number = 0
    let cpv:number = 0

   
    for(let campaign of campaignsDetail) {
      unique_views = unique_views + Number(campaign.uniqueViews) || 0
      ctr = ctr + Number(campaign.ctr) || 0
      retention = retention + Number(campaign.retention) || 0
      cpv = Number(campaign.cpv) + cpv
    }
    
    // AVG calculation
    ctr = ctr / 2
    retention = retention / 2
    cpv = cpv / 2

    resolve({id: campaign.id, name: campaign.name, unique_views, ctr, retention, cpv })
  })
}

interface IComparedCampaign {
  id:string
  name:string
  unique_views:number
  ctr:number
  retention:number
  cpv:number
}

export { 
  Query
}