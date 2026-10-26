@echo off
echo ===========================================
echo Packaging S.E. Associates for Namecheap...
echo ===========================================

echo [+] Building production React frontend...
call npx vite build --outDir namecheap_deployment

echo [+] Copying Backend (PHP API) files...
if not exist "D:\SE\namecheap_deployment\api" mkdir "D:\SE\namecheap_deployment\api"
xcopy "D:\SE\api\*" "D:\SE\namecheap_deployment\api\" /E /Y /Q >nul

echo [+] Copying Database Uploads (Images)...
if not exist "D:\SE\namecheap_deployment\uploads" mkdir "D:\SE\namecheap_deployment\uploads"
xcopy "D:\SE\uploads\*" "D:\SE\namecheap_deployment\uploads\" /E /Y /Q >nul

echo [+] Creating zip archive for 1-click cPanel upload...
powershell -NoProfile -Command "Compress-Archive -Path 'D:\SE\namecheap_deployment\*' -DestinationPath 'D:\SE\namecheap_deployment.zip' -Force"

echo ===========================================
echo SUCCESS! Your entire system has been packaged.
echo ===========================================
echo Folder: D:\SE\namecheap_deployment
echo Zip:    D:\SE\namecheap_deployment.zip
echo.
echo Upload the contents of namecheap_deployment (or upload namecheap_deployment.zip
echo and click Extract) directly inside your Namecheap public_html directory!
echo ===========================================
