@echo off
echo ========================================================
echo Packaging S.E. Vault for Namecheap Deployment...
echo ========================================================

echo [+] 1. Building React frontend production bundle...
call npx vite build --outDir namecheap_deployment --emptyOutDir

echo [+] 2. Copying Backend (PHP API)...
if exist "D:\SE\namecheap_deployment\api" rmdir /S /Q "D:\SE\namecheap_deployment\api"
mkdir "D:\SE\namecheap_deployment\api"
xcopy "D:\SE\api\*" "D:\SE\namecheap_deployment\api\" /E /Y /Q >nul

echo [+] 3. Copying Uploads (media & images)...
if exist "D:\SE\namecheap_deployment\uploads" rmdir /S /Q "D:\SE\namecheap_deployment\uploads"
mkdir "D:\SE\namecheap_deployment\uploads"
xcopy "D:\SE\uploads\*" "D:\SE\namecheap_deployment\uploads\" /E /Y /Q >nul

echo [+] 4. Copying Database SQL Dump...
copy /Y "D:\SE\shoplgkr_sevault.sql" "D:\SE\namecheap_deployment\shoplgkr_sevault.sql" >nul

echo [+] 5. Ensuring .htaccess Apache routing config...
copy /Y "D:\SE\public\.htaccess" "D:\SE\namecheap_deployment\.htaccess" >nul

echo [+] 6. Creating zip archives for 1-click cPanel upload...
powershell -NoProfile -Command "Compress-Archive -Path 'D:\SE\namecheap_deployment\*' -DestinationPath 'D:\SE\namecheap_deployment.zip' -Force; Copy-Item 'D:\SE\namecheap_deployment.zip' 'D:\SE\namecheap_deployment_folder.zip' -Force"

echo ========================================================
echo SUCCESS! The entire system has been packaged.
echo ========================================================
echo Folder: D:\SE\namecheap_deployment
echo Zip:    D:\SE\namecheap_deployment.zip
echo.
echo Upload the contents of namecheap_deployment (or upload namecheap_deployment.zip
echo and click Extract) directly inside your Namecheap public_html directory!
echo ========================================================
