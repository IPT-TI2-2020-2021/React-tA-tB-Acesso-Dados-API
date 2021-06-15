// Formulario.js
// este ficheiro irá conter o código para
// representar o formulário no ecrã
// ***************************************************

import React from 'react'

/**
 * mostrar os dados dos cães
 * e escolher um deles
 */
const EscolheCao = (props) => {
    // itera todos os cães, da lista de cães, e produz as 'options' necessárias à <select></select>
    const opcoes = props.listaCaes.map((opcao) => {
        return (<option key={opcao.idCao} value={opcao.idCao}>{opcao.nomeCao}</option>)
    })

    // criação do objeto <SELECT></SELECT>
    // este mesmo objeto, também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    // o parâmetro 'idCaoEscolhido' irá receber o ID do cão que foi escolhido
    return (
        <select required className="form-select" onChange={props.idCaoEscolhido}>
            <option value="">Escolha um cão</option>
            {opcoes}
        </select>
    )
}



/**
 * Formulário para adicionar (fazer upload) uma Fotografia
 */
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        // variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            fichFoto: null,
            localDaFoto: "",
            dataDaFoto: "",
            idDoCao: ""
        }
    }

    /**
     * handler para manipular os dados escritos pelo
     * utilizador na textbox do nome do ficheiro
     * @param {*} evento - contém o dado (nome da Foto) escrito pelo utilizador
     */
    handlerFotoChange = (evento) => {
        this.setState({ fichFoto: evento.target.files[0] });
    }


    /**
     * handler para manipular os dados escritos pelo
     * utilizador na textbox do nome do ficheiro
     * @param {*} evento - contém o dado (data da Foto) escrito pelo utilizador
     */
    handlerDataChange = (evento) => {
        // eventuais validações dos dados podem ser aqui escritas...


        // atribuição ao STATE os dados lidos
        this.setState({ dataDaFoto: evento.target.value });
    }


    /**
     * handler para manipular os dados escritos pelo
     * utilizador na textbox do nome do ficheiro
     * @param {*} evento - contém o dado (local da Foto) escrito pelo utilizador
     */
    handlerLocalChange = (evento) => {
        // validação do conteúdo do texto inserido
        if (/\d/.test(evento.target.value)) {
            evento.target.setCustomValidity("Não são permitidos números aqui.")
            return;
        } else {
            evento.target.setCustomValidity("")
        }

        // devolve os dados recolhidos
        this.setState({ localDaFoto: evento.target.value });
    }

    /**
    * handler para manipular os dados escolhidos pelo
    * utilizador na dropdown do nome do ficheiro
    * @param {*} evento - contém o id do cão escolhidos pelo utilizador
    */
    handlerCaoChange = (evento) => {
        this.setState({ idDoCao: evento.target.value });
    }

    /**
     * função que irá exportar os dados para fora do Formulário
     */
    handlerSubmitForm = (evento) => {
        // impede que o Browser efetue o submit do formulário
        // essa tarefa será efetuada pelo React
        evento.preventDefault();

        // preparar os dados a serem enviados para a API
        let dadosForm = {
            UploadFotografia: this.state.fichFoto,
            Local: this.state.localDaFoto,
            DataFoto: this.state.dataDaFoto,
            CaoFK: this.state.idDoCao
        };

        // exportar os dados recolhidos para fora do componente 'Formulario'
        // para serem lidos pelo objeto que o invocou 
        // cria-se um parâmetro que os irá exportar
        this.props.dadosRecolhidos(dadosForm);
    }

    render() {
        // estamos a ler os dados que são recebidos pelo componente
        const { dadosCaes } = this.props

        return (
            // o 'return' só consegue devolver UM objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-4">
                        Fotografia: <input type="file"
                            required
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handlerFotoChange} /><br />
                Data da Foto: <input type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={this.state.dataDaFoto}
                            className="form-control"
                            onChange={this.handlerDataChange} /><br />
                    </div>
                    <div className="col-md-4">
                        Local da Foto: <input type="text"
                            required
                            value={this.state.localDaFoto}
                            className="form-control"
                            onChange={this.handlerLocalChange} /><br />
                        {/* o componente 'EscolheCao' irá ter dois parâmetros:
                        - listaCaes: serve para introduzir no componente a lista dos cães a representar na dropdown
                        - idCaoEscolhido: serve para retirar do componente o ID do cão que o utilizador escolheu,
                                          que será entregue ao 'handlerCaoChange' */}
                Cão: <EscolheCao listaCaes={dadosCaes}
                            idCaoEscolhido={this.handlerCaoChange}
                        /><br />
                    </div>
                </div>
                <input type="submit" value="Adicionar foto" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario;

