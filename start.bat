@echo off
echo Dang cap nhat moi truong Node.js...
set PATH=%PATH%;C:\Program Files\nodejs

echo Dang cai dat thu vien...
call npm install

echo Dang khoi dong Backend Server...
start "Mars Colony Backend" node src/server.js

echo Backend dang chay ngam. Ban co the vao thu muc src de mo index.html len nhe!
pause
