FROM ubuntu:latest
LABEL authors="Usuario"

ENTRYPOINT ["top", "-b"]

FROM mysql:8.4