# Monero-Blockchain-Explorer
A Monero Blockchain Explorer based on the https://github.com/moneroexamples/onion-monero-blockchain-explorer API with some additions, such as forward lookup of outputs. Supports a graph-like interface which allows for a novel way of exploring the chain.

![Explorer screenshot](https://i.imgur.com/Kx1Upgq.png)

# Setup

Prepare .env in .
```
cd Monero-Blockchain-Explorer
cp .env.example .env
nano .env
```

Prepare .env in frontend/
```
cd Monero-Blockchain-Explorer/frontend
cp .env.example .env
nano .env
```

Run in docker
```
cd Monero-Blockchain-Explorer
sudo docker compose up -d
```

Stop docker
```
cd Monero-Blockchain-Explorer
sudo docker compose down
```
