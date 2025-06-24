#!/bin/bash

# Define your Go projects
goProjects=("../dao" "../web")

for i in "${goProjects[@]}"
do
   echo --------------------$i------------------ | tr [a-z] [A-Z]
   cd "$i"
   
   go clean
   go mod tidy
   CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -buildvcs=false -o ${i##*/} .
   cd - > /dev/null
done
