import CampaignDetail from "../CampaignDetail/model"
import VideoAd from '../VideoAd/model'
import chalk from 'chalk'

const Campaign = {
  detail: async (ctx, { where, paginate }:any) => {
   const campaignDetail =  await CampaignDetail.findOne({id: ctx.id})
   console.log(campaignDetail)
   return {...campaignDetail, unique_views: campaignDetail.uniqueViews}
  },

  ads: async(ctx) => {
    const videoAd:VideoAd []= await VideoAd.find({campaignId: ctx.id})

    return videoAd.map((video) => {
      return {...video, unique_view: video.uniqueView, video_id: video.videoId}
    })
  }
}

export {
  Campaign
}