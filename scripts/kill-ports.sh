#!/bin/bash
# Kill any process using ports 3001 or 3002
for port in 3001 3002; do
  pid=$(lsof -ti :$port)
  if [ -n "$pid" ]; then
    echo "Killing process on port $port (PID $pid)"
    kill -9 $pid
  else
    echo "No process found on port $port"
  fi
done
