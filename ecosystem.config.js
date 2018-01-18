module.exports = {
  apps : [{
    name        : "UPS-Chan",
    script      : "dist/app.js",
    watch       : ["dist"],
    env: {
      "NODE_ENV": "production",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}