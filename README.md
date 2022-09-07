# react-openweathermap-web

Interface openweathermap.org API com React e puro CSS sem a utilização de npm ou webpack, ou outros componentes.

Interface openweathermap.org API using React and pure CSS without npm, webpack, or other components.

Este é uma demonstração de simplicidade, utilizando os recursos mais leves possíveis com React diretamente no navegador, sem compilação, sem node.js, sem modulos NPM.


Recursos:

Campo de “input” para digitar a cidade
Caixa de resultados que informa local, umidade, condição e temperatura corrente em graus Celsius.
Caso a cidade não esteja na lista do openweathermap, será informado: “Cidade não encontrada”
A cada caractere digitado no campo da cidade atualiza os resultados carregados via json.



Efetue download deste repositório diretamente em seu servidor web sem a necessidade de instalar nenhum outro recurso.

$ git clone  https://github.com/mitgate/react-openweathermap-web.git


Caso deseje atualizar a lista de cidades:

Efetue o download do arquivo contendo nomes das cidades.

$ wget http://bulk.openweathermap.org/sample/city.list.json.gz

descompacte o arquivo:

$ gunzip city.list.json.gz

O arquivo city.list.json contem cidades do mundo todo, atendidas pelo openwheatermap.org, para facilitar, filtraremos as cidades do Brasil no arquivo .json utilizando jq

$ cat city.list.json  | jq -c '.[] | select( .country | contains("BR")) | {"name","state","country","coord"}' > data/br_cidades.json

