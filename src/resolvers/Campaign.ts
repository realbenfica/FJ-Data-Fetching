import CampaignDetail from "../CampaignDetail/model"
import VideoAd from '../VideoAd/model'

const Campaign = {
  detail: async (ctx, { where, paginate }:any) => {
   console.log(ctx, 'CTX')
   return await CampaignDetail.findOne({id: ctx.id})
  },

  ads: async(ctx) => {
    return await VideoAd.find({campaignId: ctx.id})
  }
}

export {
  Campaign
}