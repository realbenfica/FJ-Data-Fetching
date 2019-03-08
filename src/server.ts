require('dotenv').config()
import dbSetup from './db'
import facebook from './fetch/facebook'

dbSetup().then(() => {
  new facebook().start()
})
 


 console.log('Im running')