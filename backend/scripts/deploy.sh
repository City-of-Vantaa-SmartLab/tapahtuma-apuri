#!/bin/bash
set -euo pipefail

# Deploy the current app version to production. Run generateEnvFile.js to obtain the required private-key.pem.

if [[ ! -f ./scripts/private-key.pem ]] ; then
    echo 'Missing private key. Did you run ./scripts/generateEnvFile.js?'
    exit 1
fi

if [[ ! -f ./env/production.sh ]] ; then
    echo 'Missing environment secrets. Did you run ./scripts/generateEnvFile.js?'
    exit 1
fi

echo "[DEPLOY SCRIPT 1/4] Removing existing deployment artifacts..."
ssh -i scripts/private-key.pem ec2-user@18.198.50.112 "sudo rm -R product && mkdir product"

echo "[DEPLOY SCRIPT 2/4] Deploying to EC2..."
scp -r -i scripts/private-key.pem package.json build src yarn.lock migrations env webpack.config.js webpack.prod.config.js ec2-user@18.198.50.112:/home/ec2-user/product

echo "[DEPLOY SCRIPT 3/4] Installing dependencies..."
ssh -i scripts/private-key.pem ec2-user@18.198.50.112 "cd product && yarn install"

echo "[DEPLOY SCRIPT 4/4] Restarting server..."
ssh -i scripts/private-key.pem ec2-user@18.198.50.112 << EOF
  cd product
  chmod +x ./env/production.sh
  . ./env/production.sh
  yarn migrate-prod
  pm2 flush
  pm2 delete server
  pm2 start src/server
EOF

echo "Done!"
