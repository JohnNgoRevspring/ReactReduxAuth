module.exports = {
    development: {
      client: 'postgresql',
      connection: 'postgres://localhost/appnote'
    },
    production : {
      client: 'postgresql',
      connection: process.env.DATABASE_URL + '?ssl=true'
    }
  
  };