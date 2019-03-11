Campaign {
  id: String
  title: String
  platform: enum{'FACEBOOK', 'YOUTUBE}
  startDate: Date
  stopDate: Date
  status: String
}

CampaignDetail {
  id: String
  campaignId: String
  uniqueViews: Int
  ctr: Int
  cpv:Float
  retention: Float!
  softConversion: Int!
  budget: Float!
}

VideoAds {
  id: String!
  title: String!
  campaignId: String!
  picture: String
  views: Int!
  uniqueViews: Int!
  retention: Float!
  clicks: Int
}

FACEBOOK {
  id = id (ads)
  title = name (ads)
  views = impression
  uniqueViews = reach
}