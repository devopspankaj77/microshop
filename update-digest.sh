#!/bin/bash
set -e

# 🏷 Registry aur Images
REGISTRY="ghcr.io/devopspankaj77/microshop"
BACKEND_IMAGE="backend"
FRONTEND_IMAGE="frontend"
TAG="main"   # 👈 agar tum tag alag use kar rahe ho to change kar dena

# 🛠 Function: digest nikalna
get_digest () {
  local image=$1
  local tag=$2
  echo "👉 Pulling latest image: $REGISTRY/$image:$tag"
  docker pull $REGISTRY/$image:$tag >/dev/null
  DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' $REGISTRY/$image:$tag)
  echo "$DIGEST"
}

# 🔎 Backend Digest
BACKEND_DIGEST=$(get_digest $BACKEND_IMAGE $TAG)
echo "✅ Backend digest: $BACKEND_DIGEST"

# 🔎 Frontend Digest
FRONTEND_DIGEST=$(get_digest $FRONTEND_IMAGE $TAG)
echo "✅ Frontend digest: $FRONTEND_DIGEST"

# 📂 Update YAMLs
echo "🔧 Updating backend-deployment.yaml..."
sed -i "s|image: $REGISTRY/$BACKEND_IMAGE.*|image: $BACKEND_DIGEST|" k8s/backend-deployment.yaml

echo "🔧 Updating frontend-deployment.yaml..."
sed -i "s|image: $REGISTRY/$FRONTEND_IMAGE.*|image: $FRONTEND_DIGEST|" k8s/frontend-deployment.yaml

echo "🚀 Done! YAML files updated with latest digests."
