require('dotenv').config()
import dbSetup from './db'
import facebook from './fetch/facebook'
import google from './fetch/google'
import { Platform } from './Campaign/model';

dbSetup().then(() => {
  // new facebook(Platform.FACEBOOK).start()
  new google(Platform.GOOGLE).start()
})
 


 console.log('Im running')