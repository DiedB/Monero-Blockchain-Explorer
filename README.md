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

## Stop docker
```
sudo docker compose down
```
To remove all the volumes, add the -v flag. Make sure to do backups about the database before!