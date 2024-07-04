setlocal enabledelayedexpansion

REM Directory where the files are located
set "directory=C:\Users\aman\Desktop\Personal\D\Dishita's Bday Celebrations (File responses)-20240701T121959Z-001\Dishita_s Bday Celebrations (File responses)\Upload the cover photo of your memories (File responses)\"

REM Loop through all the files in the directory
for %%F in ("%directory%\*-*.*) do (
    REM Extract the person name from the file name
    for /f "tokens=2 delims=-" %%P in ("%%~nF") do (
        REM Create a folder for the person if it doesn't exist
        if not exist "%directory%\%%P" (
            mkdir "%directory%\%%P"
        )
        REM Move the file to the person's folder
        move "%%F" "%directory%\%%P"
    )
)
