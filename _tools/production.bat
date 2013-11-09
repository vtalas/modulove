call minifyCssJs.bat;
xcopy ..\*.html ..\_production /I /Y
xcopy ..\.htaccess ..\_production /I /Y
xcopy ..\Css\font-awesome ..\_production\Css\font-awesome /I /E /Y
xcopy ..\Content ..\_production\Content /I /E /Y

call minifyHtml "..\_production\*.html"

