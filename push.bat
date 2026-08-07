@echo off
title Push to GitHub molokortx20-art
echo ====================================================
echo Pushing Kovalev Nikolai Resume Website to GitHub...
echo ====================================================
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" remote remove origin 2>nul
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" remote add origin https://github.com/molokortx20-art/resume-website.git
"C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" push -u origin master
echo ====================================================
echo Done! Press any key to exit.
pause
