import TrackedCampaign from '../TrackedCampaign/model'
import TrackedCampaignVideoAd from '../TrackedCampaignVideoAd/model';

const Mutation = {
  combineCampaign: async (_, params) => {
    const { name, facebookCampaignId, googleCampaignId } = params.campaigns
    const videos = params.videos

    const trackedCampaign = new TrackedCampaign()
    trackedCampaign.facebookCampaignId = facebookCampaignId
    trackedCampaign.googleCampaignId = googleCampaignId
    trackedCampaign.name = name
    await trackedCampaign.save()

    videos.map( async (video) => {
      const trackedVideoAd = new TrackedCampaignVideoAd()
      trackedVideoAd.position = video.position
      trackedVideoAd.trackedCampaignId = trackedCampaign.id
      trackedVideoAd.videoAdId = video.videoAdId
      await trackedVideoAd.save()
    })

    return trackedCampaign.id
  }
}

export {
  Mutation
}