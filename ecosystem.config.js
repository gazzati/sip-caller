module.exports = {
  apps: [
    {
      name: "CONSUMER",
      namespace: "sip",
      script: "build/processes/consumer/index.js",
      instances: "1",
      exec_mode: "cluster",
      watch: false
    },
    {
      name: "PROCESSOR",
      namespace: "sip",
      script: "build/processes/processor/index.js",
      instances: "6",
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      }
      name: "METRIC",
      namespace: "core",
      script: "build/processes/metric.js",
      watch: false
    }
  ]
}
