#!/bin/bash
cd /Users/hadib/Documents/flutter-project
echo "=== GIT STATUS ==="
git status
echo ""
echo "=== UNCOMMITTED CHANGES ==="
git diff --name-only
echo ""
echo "=== STAGED CHANGES ==="
git diff --cached --name-only
echo ""
echo "=== LAST 5 COMMITS ==="
git log --oneline -5
echo ""
echo "=== REMOTE STATUS ==="
git status -sb
echo ""
echo "=== ATTEMPTING PUSH ==="
git push 2>&1

