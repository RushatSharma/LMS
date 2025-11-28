@echo off
echo Starting LMS Full Stack Project...
echo.

echo Starting Backend Server...
cd server
start "Backend Server" cmd /k "npm start"
cd ..

echo Starting Frontend Client...
cd client  
start "Frontend Client" cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5001
echo.
pause
