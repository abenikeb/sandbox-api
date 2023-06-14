module.exports = {
  apps: [{
    script: 'npm start'
  }],

  deploy: {
    production: {
      key: 'key.pem',
      user: 'root',
      host: '196.189.126.129',
      ref: 'origin/main',
      repo: 'git@github.com:abenikeb/sandbox-api.git',
      path: '/var/opt/sandbox/api',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options': 'ForwardAgent=yes'
    }
  }
};
