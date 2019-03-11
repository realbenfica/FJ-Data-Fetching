import Campaign, { ICampaign } from './model'
export const saveCampaign = async (campaign:ICampaign):Promise<void>  =>{

  let newCampaign:Campaign = await Campaign.findOne({id: campaign.id})
  
  if(!newCampaign) {
    newCampaign = new Campaign()
    newCampaign.id = campaign.id
    newCampaign.name = campaign.name
    newCampaign.startDate = campaign.startDate
    newCampaign.platform = campaign.platform
    newCampaign.status = campaign.status
  }

  newCampaign.stopDate = campaign.stopDate
  await newCampaign.save()
}