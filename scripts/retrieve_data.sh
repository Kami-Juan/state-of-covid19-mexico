yarn --cwd ../packages/scrapper generate

echo "Copiando información del COVID al sitio web"

cp -avr ../packages/scrapper/process_data/covid-data.json ../packages/website/src/assets/maps/covid-counters.json

echo "Compilando el sitio web ..."

yarn --cwd ../ website:build