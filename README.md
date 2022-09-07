# react-openwheatermap
Interface openweathermap.org api com React e puro CSS sem a utilização de npm ou webpack, ou outros componentes.
Interface openweathermap.org API using React and pure CSS without npm, webpack, or other components.

Este é uma demonstração de simplicidade, utilizando os recursos mais leves possíveis com React diretamente no navegador, sem compilação, sem node.js, sem modulos NPM.



Iniciando

Efetue o download do arquivo contendo nomes das cidades em http://bulk.openweathermap.org/sample/city.list.json.gz

descompacte o arquivo:

$ gunzip city.list.json.gz

O arquivo city.list.json contem cidades do mundo todo, atendidas pelo openwheatermap.org, para facilitar, filtraremos as cidades do Brasil no arquivo .json utilizando jq

$ cat city.list.json  | jq -c '.[] | select( .country | contains("BR")) | {"name","state","country","coord"}' > data/br_cidades.json

