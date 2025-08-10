#!/bin/bash

echo "🚀 Deploying LifeManager with immediate updates..."

# Build and deploy to Cloud Run (immediate updates)
echo "📦 Building container..."
gcloud builds submit --config=cloudbuild.web.yaml .

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy lifemanager-web \
    --image us-docker.pkg.dev/bcimarketplace/lifemanager-repo/lifemanager-web:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080

echo "📁 Uploading to Storage (with no-cache headers)..."
gsutil -h "Cache-Control:no-store, no-cache, must-revalidate, max-age=0" \
       -h "Pragma:no-cache" \
       -h "Expires:0" \
       -m cp *.html *.css *.js gs://lifemanagement.app/

echo "✅ Deployment complete!"
echo "🔗 Cloud Run URL (immediate): https://lifemanager-web-368412098058.us-central1.run.app"
echo "🔗 Custom Domain: https://lifemanagement.app (may take a few minutes)"
