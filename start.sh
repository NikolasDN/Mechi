#!/bin/bash

wget https://mechi.blob.core.windows.net/packages/mainpackage.zip
unzip mainpackage.zip
rm mainpackage.zip
dotnet ./publish/main/Robot.dll
