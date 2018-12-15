#!/bin/bash

dotnet publish **/*.csproj -r linux-arm

mkdir publish
zip -r publish/mainpackage.zip SpeechGenerator/bin/Debug/netcoreapp2.1/linux-arm/publish
az storage blob upload --account-name mechi --container-name packages --file publish/mainpackage.zip --name mainpackage.zip