# Monero-Blockchain-Explorer
A Monero Blockchain Explorer based on the https://github.com/moneroexamples/onion-monero-blockchain-explorer API with some additions, such as forward lookup of outputs. Supports a graph-like interface which allows for a novel way of exploring the chain.

![Explorer screenshot](https://i.imgur.com/Kx1Upgq.png)

# Setup

```
cd Monero-Blockchain-Explorer
cp .env.example .env
nano .env
```

## Start docker
```
sudo docker compose up -d
```

If you want to collect forward lookup data, you need to enter start lookup.py manually. Enter the container's shell (commands below) and hit `python3 lookup.py`

## Stop docker
```
sudo docker compose down
```
To remove all the volumes, add the -v flag. Make sure to do backups about the database before!

## Open docker container's shell

List active containers:

`sudo docker ps`

Open shell:

`sudo docker exec -it <container_id> bash`


