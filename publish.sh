#!/bin/bash

dotnet publish **/*.csproj -r linux-arm

mkdir publish
mkdir publish/main
rm -rf publish/main/*
cp -R Robot/bin/Debug/netcoreapp2.1/linux-arm/publish/* publish/main

rm publish/mainpackage.zip
zip -r publish/mainpackage.zip publish/main
az storage blob upload --account-name mechi --container-name packages --file publish/mainpackage.zip --name mainpackage.zip