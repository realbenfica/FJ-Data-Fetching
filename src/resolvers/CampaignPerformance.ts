import TrackedCampaignVideoAd from '../TrackedCampaignVideoAd/model'
import Campaign from '../Campaign/model'
import VideoAd from '../VideoAd/model'

const CampaignPerformance = {
  videoAdPerformance: async ({id}) => {

    const positions:any = await TrackedCampaignVideoAd
        .query(`
        SELECT position 
        FROM tracked_campaign_video_ads 
        WHERE tracked_campaign_id = '${id}' 
        GROUP BY position 
        ORDER BY position ASC`)

    const combinedVideoPerformance:IVideoAdPerformance[] = []

    for(let { position } of positions) {
      const videoPerformance:IVideoAdPerformance = await getVideoPerformance(id, position)
      combinedVideoPerformance.push(videoPerformance)
      // const trackedVideos: TrackedCampaignVideoAd[] = await TrackedCampaignVideoAd.find({trackedCampaignId: id, position})
      
      // let unique_views:number = 0
      // let ctr:number = 0
      // let retention:number = 0
      // let cpv:number = 0
      // let spend: number = 0
      
      // const videos:IVideoAd[] = []

      // for(let video of trackedVideos) {
      //   const videoDetail = await VideoAd.findOne({ id: video.videoAdId })
      //   const campaign:Campaign = await Campaign.findOne({ id: videoDetail.campaignId })

      //   unique_views = unique_views + parseFloat(videoDetail.uniqueView)
      //   ctr = ctr + parseFloat(videoDetail.ctr)
      //   cpv = cpv + parseFloat(videoDetail.cpv)
      //   retention = retention + parseFloat(videoDetail.retention)
      //   spend = spend + parseFloat(videoDetail.spend)

      //   videos.push({
      //     id: videoDetail.id,
      //     name: videoDetail.name,
      //     cpv: videoDetail.cpv,
      //     ctr: videoDetail.ctr,
      //     unique_views: videoDetail.uniqueView,
      //     retention: videoDetail.retention,
      //     thumbnails: videoDetail.thumbnails,
      //     spend: videoDetail.spend,
      //     platform: campaign.platform.toString()
      //   })
      // }

      // // Calculating the average
      // ctr = ctr / trackedVideos.length
      // cpv = cpv / trackedVideos.length
      // retention = retention / trackedVideos.length
      
      
    }

    return combinedVideoPerformance
  }
}

export const getVideoPerformance = async ( trackedCampaignId:string, position:number ):Promise<IVideoAdPerformance> => {
  const trackedVideos: TrackedCampaignVideoAd[] = await TrackedCampaignVideoAd.find({trackedCampaignId, position})
      
  let unique_views:number = 0
  let ctr:number = 0
  let retention:number = 0
  let cpv:number = 0
  let spend: number = 0
      
  const videos:IVideoAd[] = []

  for(let video of trackedVideos) {
    const videoDetail = await VideoAd.findOne({ id: video.videoAdId })
    const campaign:Campaign = await Campaign.findOne({ id: videoDetail.campaignId })

    unique_views = unique_views + parseFloat(videoDetail.uniqueView)
    ctr = ctr + parseFloat(videoDetail.ctr)
    cpv = cpv + parseFloat(videoDetail.cpv)
    retention = retention + parseFloat(videoDetail.retention)
    spend = spend + parseFloat(videoDetail.spend)

    videos.push({
      id: videoDetail.id,
      video_id: videoDetail.videoId,
      name: videoDetail.name,
      cpv: videoDetail.cpv,
      ctr: videoDetail.ctr,
      unique_views: videoDetail.uniqueView,
      retention: videoDetail.retention,
      thumbnails: videoDetail.thumbnails,
      spend: videoDetail.spend,
      platform: campaign.platform.toString()
    })
  }

  // Calculating the average
  ctr = ctr / trackedVideos.length
  cpv = cpv / trackedVideos.length
  retention = retention / trackedVideos.length
      
  return({unique_views, ctr, cpv, retention, spend, videos, position})

}

interface IVideoAdPerformance {
  position:number
  unique_views: Number
  retention: Number
  cpv: Number
  ctr: Number
  spend: Number
  videos: IVideoAd[]
}

interface IVideoAd {
  id: string
  name: string
  cpv: string
  ctr: string
  unique_views:string
  spend: string
  retention: string
  thumbnails: string
  platform: string
  video_id:string
}

export {
  CampaignPerformance
}