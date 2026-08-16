@echo off
echo ===========================================
echo Packaging S.E. Associates for Namecheap...
echo ===========================================

echo [+] Re-building the React source code...
call npm run build

echo [+] Cleaning old deployment folder if exists...
rmdir /S /Q "D:\SE\namecheap_deployment_folder" 2>nul
mkdir "D:\SE\namecheap_deployment_folder"

echo [+] Moving Frontend (React) files...
xcopy "D:\SE\dist\*" "D:\SE\namecheap_deployment_folder\" /E /Y /Q >nul

echo [+] Moving Backend (PHP API) files...
mkdir "D:\SE\namecheap_deployment_folder\api"
xcopy "D:\SE\api\*" "D:\SE\namecheap_deployment_folder\api\" /E /Y /Q >nul

echo [+] Moving Database Uploads (Images)...
mkdir "D:\SE\namecheap_deployment_folder\uploads"
xcopy "D:\SE\uploads\*" "D:\SE\namecheap_deployment_folder\uploads\" /E /Y /Q >nul

echo ===========================================
echo SUCCESS! Your entire system has been packaged.
echo ===========================================
echo Please upload exactly the CONTENTS of:
echo D:\SE\namecheap_deployment_folder
echo ...directly into your Namecheap public_html directory!
