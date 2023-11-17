module.exports = {
  apps: [
    {
      name: "CONSUMER",
      namespace: "sip",
      script: "build/processes/consumer.js",
      instances: "1",
      exec_mode: "cluster",
      watch: false
    },
    {
      name: "PROCESSOR",
      namespace: "sip",
      script: "build/processes/processor.js",
      instances: "1",
      exec_mode: "cluster",
      watch: false,
    },
    {
      name: "API",
      namespace: "sip",
      script: "build/processes/api.js",
      instances: "1",
      exec_mode: "cluster",
      watch: false,
    }
  ]
}
