#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting esbuild development server...${NC}"

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}❌ Port 8000 is already in use. Please stop the existing process.${NC}"
    echo "You can find the process with: lsof -i :8000"
    echo "And kill it with: kill -9 <PID>"
    exit 1
fi

# Navigate to client directory
cd "$(dirname "$0")"

# Start the development server
echo -e "${GREEN}✅ Starting esbuild on port 8000...${NC}"
echo -e "${BLUE}📝 Your Rails app should be running on port 5000${NC}"
echo -e "${BLUE}🔄 Live reload is enabled - changes will auto-refresh the browser${NC}"
echo ""

npm run dev
