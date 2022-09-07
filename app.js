class Autocomplete extends React.Component {
    componentDidMount() {
        fetch(`./data/br_cidades.json`)
        .then(response => response.json())
        .then(data => this.data = data);
    }
    constructor(props) {
        super(props);
        this.state = {
            opcoesAtivas: 0,
            opcoesFiltradas: [],
            exibirOpcoes: false,
            userInput: "",
        };
    }
    onChange = e => {
        let { selecoes } = this.data;
        const userInput = e.currentTarget.value;
        let arrayFiltrado = this.data.filter( (auto) => auto.name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, "").includes(userInput.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, "")));
        let opcoesFiltradas = arrayFiltrado.map((item, i)=> (item.name) );
        opcoesFiltradas = Array.from(new Set(opcoesFiltradas));

        this.setState({
            opcoesAtivas: 0,
            opcoesFiltradas,
            exibirOpcoes: true,
            userInput: e.currentTarget.value,
        });
    };
    onClick = e => {
        this.setState({
            opcoesAtivas: 0,
            opcoesFiltradas: [],
            exibirOpcoes: false,
            userInput: e.currentTarget.innerText
        });
    };
    onKeyDown = e => {
        const { opcoesAtivas, opcoesFiltradas } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                opcoesAtivas: 0,
                exibirOpcoes: false,
                userInput: opcoesFiltradas[opcoesAtivas]
            });
        } else if (e.keyCode === 38) {
            if (opcoesAtivas === 0) {
                return;
            }
            this.setState({ opcoesAtivas: opcoesAtivas - 1 });
        }
        else if (e.keyCode === 40) {
            if (opcoesAtivas - 1 === opcoesFiltradas.length) {
                return;
            }
            this.setState({ opcoesAtivas: opcoesAtivas + 1 });
        }
    };
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                opcoesAtivas,
                opcoesFiltradas,
                exibirOpcoes,
                userInput
            }
        } = this;

        let selecoesListComponent;
        if (exibirOpcoes && userInput) {
            if (opcoesFiltradas.length) {
                selecoesListComponent = (
                    <ul class="selecoes">
                        {opcoesFiltradas.map((selecao, index) => {
                            let className;
                            if (index === opcoesAtivas) {
                                className = "selecao-active";
                            }
                            return (
                                <li className={className} key={selecao} onClick={onClick}>
                                    {selecao}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                selecoesListComponent = (
                    <div class="sem-selecoes">
                        <em>Nenhuma Cidade encontrada</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="digite..."
                />
                {selecoesListComponent}
            </React.Fragment>
        );
    }
}



class App extends React.Component {
    state = {
        temperatura: undefined,
        cidade: undefined,
        umidade: undefined,
        descricao: undefined,
        erro: undefined
    }
    lerTempo = async (e) => {
        e.preventDefault();
        var cidade = e.currentTarget.elements[0].value;

        if (cidade) {
            const api_call = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+encodeURIComponent(cidade)+"&country=Brazil&APPID=6f4d6389e9ab1e771de47c9effa7facc&units=metric&lang=pt_BR");
            const data = await api_call.json();
            this.setState({
                temperatura: data.main.temp,
                cidade: data.name,
                umidade: data.main.humidity,
                descricao: data.weather[0].description,
                erro: ""
            });
        } else {
            this.setState({
                temperatura: undefined,
                cidade: undefined,
                umidade: undefined,
                descricao: undefined,
                erro: "Digite o nome da cidade corretamente."
            });
        }
    }

    render() {
        return (
            <div>      
                <div className = "wrapper">
                    <div className = "main">
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className = "col-xs-7 form-container">
                                    <Form
                                        lerTempo = {this.lerTempo}
                                    />
                                    <Clima
                                        temperatura = {this.state.temperatura}
                                        cidade = {this.state.cidade}
                                        umidade = {this.state.umidade}
                                        descricao = {this.state.descricao}
                                        erro = {this.state.erro}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Titles = () => (
    <div>
        <h1 className = "title-container__title" >O Clima Agora</h1>
        <p className = "title-container__subtitle" >Escolha sua cidade</p>
    </div>
);

const Form = props => (
    <div>
        <form  onSubmit={props.lerTempo} >      
            <Autocomplete name="cidade" placeholder="Cidade..." />            
            <button>Consultar</button>
        </form>
    </div>
);

const Clima = props => (

    <div className = "clima__info" >
        {
            props.cidade && <p className = "clima__key" ><i className="fas fa-map-pin"></i> Local: 
            <span> {props.cidade}, Brasil</span>
            </p>
        }
        {
            props.temperatura && <p className = "clima__key" ><i className="fas fa-thermometer-half"></i> Temperatura: 
            <span className = "clima__value" >  {props.temperatura} °C</span>
            </p>
        }
        {
            props.umidade && <p className = "clima__key" ><i className="fas fa-cloud"></i> Umidade: 
            <span className = "clima__value" > {props.umidade} %</span>
            </p>
        }
        {
            props.descricao && <p className = "clima__key" ><i className="fas fa-sun"></i> Condição: 
            <span className = "clima__value" > {props.descricao}</span>
            </p>
        }
        {
            props.erro && <p className = "clima__erro"> {props.erro}</p>
        }
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("root")
)    

