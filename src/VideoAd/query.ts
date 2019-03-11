import { IVideoAd } from 'src/VideoAd/model';
import VideoAd from './model'

export const saveVideoAd = async (videoAd:IVideoAd) => {
  let ad:VideoAd = await VideoAd.findOne({id: videoAd.id})

  if(!ad) {
    ad = new VideoAd()
    ad.id = videoAd.id
    ad.campaignId = videoAd.campaignId
    ad.videoId = videoAd.videoId
  }

  ad.cpv = videoAd.cpv
  ad.ctr = videoAd.ctr
  ad.name = videoAd.name
  ad.uniqueView = videoAd.uniqueView
  ad.retention = videoAd.retention
  ad.startDate = videoAd.startDate ? new Date(videoAd.startDate) : null
  ad.stopDate = videoAd.stopDate ? new Date(videoAd.stopDate) : null
  ad.thumbnails = videoAd.thumbnail
  ad.spend = videoAd.spend
  await ad.save()
}