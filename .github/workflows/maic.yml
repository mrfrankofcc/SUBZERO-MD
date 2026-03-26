name: SUBZERO-MD-DEPLOY
on:
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Debug Environment
        run: |
          echo "=== ENVIRONMENT DEBUG ==="
          echo "Node version: $(node --version)"
          echo "NPM version: $(npm --version)"
          echo "Working directory: $(pwd)"
          echo "Files in current directory:"
          ls -la
          echo "=== SESSION ID CHECK ==="
          if [ -f ".env" ]; then
            echo ".env file found:"
            cat .env
          else
            echo "No .env file found"
          fi
          echo "=== CONFIG FILE CHECK ==="
          if [ -f "settings.js" ]; then
            echo "settings.js content:"
            cat settings.js
          else
            echo "No settings.js found"
          fi
          
      - name: Install Dependencies
        run: |
          echo "=== INSTALLING DEPENDENCIES ==="
          npm install --verbose
          echo "=== DEPENDENCY TREE ==="
          npm list --depth=0
          
      - name: Pre-run Checks
        run: |
          echo "=== PRE-RUN CHECKS ==="
          echo "Checking package.json scripts:"
          cat package.json | grep -A 10 '"scripts"'
          echo "=== CHECKING FOR MAIN FILES ==="
          if [ -f "index.js" ]; then echo "✓ index.js found"; else echo "✗ index.js missing"; fi
          
      - name: Run Bot with Detailed Logging
        run: |
          echo "=== STARTING SUBZERO-MD BOT ==="
          echo "Timestamp: $(date)"
          echo "Starting bot with detailed logging..."
          
          # Function to run bot with logging
          run_bot() {
            echo ">>> Attempting to start bot..."
            npm start 2>&1 | while IFS= read -r line; do
              echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line"
            done
            echo ">>> Bot process ended with exit code: $?"
          }
          
          # Run bot in loop with detailed error handling
          timeout 18000 bash -c '
            attempt=1
            while true; do
              echo "=== ATTEMPT #$attempt ==="
              run_bot() {
                echo ">>> Starting bot attempt #$attempt at $(date)"
                npm start 2>&1 | while IFS= read -r line; do
                  echo "[$(date +"%H:%M:%S")] $line"
                done
                exit_code=$?
                echo ">>> Bot stopped with exit code: $exit_code at $(date)"
                return $exit_code
              }
              
              if run_bot; then
                echo "Bot exited normally, restarting in 5 seconds..."
              else
                echo "Bot crashed, analyzing error and restarting in 10 seconds..."
                echo "=== ERROR ANALYSIS ==="
                echo "Checking system resources:"
                free -h
                df -h
                echo "Recent system messages:"
                dmesg | tail -5 2>/dev/null || echo "No system messages available"
              fi
              
              attempt=$((attempt + 1))
              if [ $attempt -gt 1 ]; then
                echo "Waiting before restart..."
                sleep 10
              else
                sleep 5
              fi
            done
          ' || echo "Timeout reached after 5 hours"
          
      - name: Post-Run Analysis
        if: always()
        run: |
          echo "=== POST-RUN ANALYSIS ==="
          echo "Final timestamp: $(date)"
          echo "Checking for any log files:"
          find . -name "*.log" -type f 2>/dev/null || echo "No log files found"
          echo "=== FINAL SYSTEM STATE ==="
          free -h
          df -h
          
      - name: Re-Trigger Workflow
        if: always()
        run: |
          echo "=== AUTO-RESTART ==="
          echo "Preparing to restart workflow at $(date)"
          sleep 30
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/${{ github.repository }}/actions/workflows/deploy.yml/dispatches \
            -d '{"ref":"${{ github.ref_name }}"}'
          echo "Restart triggered successfully"
