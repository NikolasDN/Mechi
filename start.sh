#!/bin/bash

wget https://mechi.blob.core.windows.net/packages/speechgenerator.zip
unzip speechgenerator.zip
rm speechgenerator.zip
dotnet ./SpeechGenerator/bin/Debug/netcoreapp2.1/linux-arm/publish/SpeechGenerator.dll
