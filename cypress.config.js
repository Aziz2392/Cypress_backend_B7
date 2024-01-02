const { defineConfig } = require('cypress')
const oracledb = require('oracledb')

module.exports = defineConfig({
  env: {
    'baseUrl' : 'https://tech-global-training.com/students',
   
    'oracleDb' : {
      'user': 'techglobaldev',
      'password': '$techglobaldev123!',
      'connectString': 'techglobal.cup7q3kvh5as.us-east-2.rds.amazonaws.com:1521/TGDEVQA'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        async runQuery(query) {
          let connection

          try{
            // Establish connection to the Oracle Database
            connection = await oracledb.getConnection(config.env.oracleDb)
            const result = await connection.execute(query)
            return result.rows
          } catch(err) {
            throw new Error(err)
          } finally {
            if (connection) {
              // Ensure the connection is closed after the execution
              await connection.close()
            }
          }
        }
      })
    },
  },
})