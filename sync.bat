@echo off
echo.
echo ═══ SYNCING TO GITHUB ═══
echo.
git add .
git commit -m "Finalize end-to-end RFQ workflow, add testing scripts, and complete system readiness"
git push origin main
echo.
echo ═══ SYNC COMPLETE! ═══
echo.
pause
