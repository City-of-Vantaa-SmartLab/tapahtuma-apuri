#!/usr/bin/env node

/**
 * This script fetches the environment variables used by the application in production
 * and the private key for accessing the EC2 instance. Ask for access to the vantaa-pwa
 * AWS account from the Gofore Service Center. Create your programmatic access keys
 * using the IAM service in the AWS console. Using aws-vault for storing and using your
 * programmatic access credentials is highly recommended.
 */

const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm');
const { writeFileSync } = require('fs');
const path = require('path');

async function main() {
  const client = new SSMClient({
    region: 'eu-central-1',
  });
  const command = new GetParametersCommand({
    WithDecryption: true,
    Names: [
      '/tapahtuma-apuri/ec2-keypair',
      '/tapahtuma-apuri/rds-password',
      '/tapahtuma-apuri/rds-host',
      '/tapahtuma-apuri/rds-user',
      '/tapahtuma-apuri/rds-database',
      '/tapahtuma-apuri/session-secret',
    ],
  });
  const { Parameters } = await client.send(command);

  const variables = Parameters.reduce(
    (acc, { Name, Value }) => ({
      ...acc,
      [Name]: Value,
    }),
    {}
  );

  const PGUSER = variables['/tapahtuma-apuri/rds-user'];
  const PGPASSWORD = variables['/tapahtuma-apuri/rds-password'];
  const PGHOST = variables['/tapahtuma-apuri/rds-host'];
  const PGDATABASE = variables['/tapahtuma-apuri/rds-database'];
  const SESSION_SECRET = variables['/tapahtuma-apuri/session-secret'];
  const envFileContent =
    `export DATABASE_URL="postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}"\n` +
    'export NODE_ENV="production"\n' +
    `export PGUSER="${PGUSER}"\n` +
    `export PGPASSWORD="${PGPASSWORD}"\n` +
    `export PGHOST="${PGHOST}"\n` +
    `export PGDATABASE="${PGDATABASE}"\n` +
    `export SESSION_SECRET="${SESSION_SECRET}"\n`;

  writeFileSync(
    path.resolve(process.cwd(), 'env/production.sh'),
    envFileContent
  );

  writeFileSync(
    path.resolve(__dirname, 'private-key.pem'),
    variables['/tapahtuma-apuri/ec2-keypair']
  );
}

main();
