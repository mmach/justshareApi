echo A|xcopy /s  .\..\Shared\ .\
git add -A && git commit -m "Auto deploy"
git push origin master