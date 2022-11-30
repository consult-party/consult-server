SHELL_PATH="$(cd $(dirname $0); pwd)";
PROJECT_PATH="$(cd $SHELL_PATH ; cd ../ ; pwd)";

cd $PROJECT_PATH;

IMAGE_NAME="example-webfont-test";

npm run build;
docker rmi $IMAGE_NAME --force;
docker build --rm -f dockerfile.test -t $IMAGE_NAME .;