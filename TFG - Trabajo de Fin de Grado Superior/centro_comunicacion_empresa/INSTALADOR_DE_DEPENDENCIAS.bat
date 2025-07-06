echo "Instalador de dependencias creado por Jose Angel Chouza Estevez para proyecto final DAW"
powershell -Command "& {Start-Process powershell -Verb RunAs -ArgumentList \"-Command Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))\"}"

