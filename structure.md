Campaign {
  id: String
  title: String
  platform: enum{'FACEBOOK', 'YOUTUBE}
  startDate: Date
  stopDate: Date
  status: String
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