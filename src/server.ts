require('dotenv').config()
import dbSetup from './db'
import facebook from './fetch/facebook'
import google from './fetch/google'
import { Platform } from './Campaign/model'
import { GraphQLServer } from 'graphql-yoga'
import { Query, Campaign, Mutation, CampaignPerformance } from './resolvers'


const resolvers = {
  Query,
  Campaign,
  Mutation,
  CampaignPerformance
}






dbSetup().then(() => {
  // new facebook(Platform.FACEBOOK).start()

  const server = new GraphQLServer({ 
    typeDefs: './src/schema.graphql', 
    resolvers
  })

  server.start(() => console.log('Server is running on localhost:4000'))
})
 


 console.log('Im running')