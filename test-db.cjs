const dotenv = require('dotenv')
dotenv.config()

const { neon } = require('@neondatabase/serverless')

const url = process.env.DATABASE_URL
console.log('DB URL:', url ? url.substring(0, 30) + '...' : 'missing')

const sql = neon(url)

sql`SELECT 1 as test`
  .then(rows => {
    console.log('Success! Rows:', JSON.stringify(rows))
    process.exit(0)
  })
  .catch(err => {
    console.log('Full error:', err)
    console.log('Cause:', err.cause)
    process.exit(1)
  })
