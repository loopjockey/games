# Build

npm run build

# Package

Tar -a -cf game-api-lambda-code.zip dist
aws s3 cp game-api-lambda-code.zip s3://...

