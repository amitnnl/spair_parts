@echo off
echo.
echo ═══ SYNCING TO GITHUB ═══
echo.
git add .
git commit -m "Enhance branding, logo-only header, and layout adjustments"
git push origin main
echo.
echo ═══ SYNC COMPLETE! ═══
echo.
pause
