/**
 * Initialize Test
 * 
 * Prepare environment and package ready before running tests
 */

import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiHttp from 'chai-http'
import chaiExclude from 'chai-exclude'

chai.use(sinonChai)
chai.use(chaiHttp)
chai.use(chaiExclude)
