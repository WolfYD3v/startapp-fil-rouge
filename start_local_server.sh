port=$(shuf -i 8000-8080 -n 1) # Generate a random port between 8000 and 8080 (shot out to the folks of from Stack Overflow for this bash skill I learned !)
printf "Port Selected: $port\nLINK: http://127.0.0.1:$port/\n\n"

python3 -m http.server $port   # Start the Python Server, on the random port generated earlier
