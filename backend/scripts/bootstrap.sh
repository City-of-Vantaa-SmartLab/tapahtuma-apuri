#!/bin/bash
set -euo pipefail

# Initializes the environment before the first deployment.
# This needs to be run only once. Run ./scripts/generateEnvFile.js to obtain the required private-key.pem.

if [[ ! -f ./scripts/private-key.pem ]] ; then
    echo 'Missing private key. Did you run ./scripts/generateEnvFile.js?'
    exit 1
fi

ssh -i scripts/private-key.pem ec2-user@18.198.50.112 << EOF
  sudo yum update -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 16
  npm i -g yarn
  npm i -g pm2
  mkdir product
EOF