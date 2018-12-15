#!/bin/bash

wget https://mechi.blob.core.windows.net/packages/mainpackage.zip
unzip mainpackage.zip
rm mainpackage.zip
dotnet ./SpeechGenerator/bin/Debug/netcoreapp2.1/linux-arm/publish/SpeechGenerator.dll
