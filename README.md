
# Faucet 2024 Setup Instructions

````bash
docker run -d --rm \
-v ./pwd.txt:/p.txt \
-v ./datos:/data \
-p 5556:8545 \
ethereum/client-go:v1.13.15 \
--datadir /data \
--unlock 4142b25ffe322f1b8c43b7cf86b4fcc6c4856dfc \
--allow-insecure-unlock \
--mine \
--miner.etherbase 4142b25ffe322f1b8c43b7cf86b4fcc6c4856dfc \
--password /p.txt \
--nodiscover \
--http \
--http.addr "0.0.0.0" \
--http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
--http.corsdomain "*"

````
