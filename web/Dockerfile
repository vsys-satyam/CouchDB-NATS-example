FROM scratch

# Copy the source code into the container
COPY . .

# Add your executable to the container
ADD web ./

# Set the entrypoint to your executable
ENTRYPOINT ["/web"]