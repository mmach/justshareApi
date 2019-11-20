echo A|xcopy /s  .\..\Shared\* .\Shared\*
git add -A && git commit -m "Auto deploy"
git push origin master