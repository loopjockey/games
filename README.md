# Build

npm run build

# Package

Tar -a -cf game-api-lambda-code.zip dist

aws s3 cp game-api-lambda-code.zip s3://...

aws cloudformation deploy --stack-name dev-game --template-file template.yml --capabilities CAPABILITY_IAM --region ap-southeast-2 --parameter-overrides AppName=game EnvKey=dev LambdaCodeBucket=...