#!/bin/bash

dotnet publish **/*.csproj -r linux-arm

zip -r publish/speechgenerator.zip SpeechGenerator/bin/Debug/netcoreapp2.1/linux-arm/publish
az storage blob upload --account-name mechi --container-name packages --file publish/speechgenerator.zip --name speechgenerator.zip