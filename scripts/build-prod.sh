SHELL_PATH="$(cd $(dirname $0); pwd)";
PROJECT_PATH="$(cd $SHELL_PATH ; cd ../ ; pwd)";

cd $PROJECT_PATH;

IMAGE_NAME="example-webfont-prod";

npm run build;
docker rmi $IMAGE_NAME --force;
docker build --rm -f dockerfile.prod -t $IMAGE_NAME .;