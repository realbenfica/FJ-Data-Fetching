require('dotenv').config()
import dbSetup from './db'
import facebook from './fetch/facebook'
import google from './fetch/google'

dbSetup().then(() => {
  new facebook().start()
})
 


 console.log('Im running')