import CampaignDetail, { ICampaignDetail } from './model'

export const saveCampaignDetail = async (detail:ICampaignDetail) => {
   
  let campaignDetail = await CampaignDetail.findOne({ id: detail.id})

  if(!campaignDetail) {
    campaignDetail = new CampaignDetail()
    campaignDetail.id = detail.id
  }

  campaignDetail.cpv = detail.cpv
  campaignDetail.ctr = detail.ctr
  campaignDetail.retention = detail.retention
  campaignDetail.uniqueViews = detail.uniqueViews
  await campaignDetail.save()
  
}