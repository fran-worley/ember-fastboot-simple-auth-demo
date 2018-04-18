/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {},
    'revision-data': {
      type: 'git-commit'
    },
    'fastboot-app-server-aws': {
      region: 'eu-west-1'
    }
    // include other plugin configuration that applies to all deploy targets here
  };

  ENV.pipeline = {
    activateOnDeploy: true
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV['fastboot-app-server-aws'].bucket = 'staging'
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV['fastboot-app-server-aws'].bucket = 'prod'
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
