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

    return (<select>{opcoes}</select>)
}



/**
 * Formulário para adicionar (fazer upload) uma Fotografia
 */
class Formulario extends React.Component {

    // criar objeto que irá receber os dados do novo aluno
    novoAluno = {
        nome: "",
        apelido: "",
    }

    // adicionar este novo objeto ao 'state'
    state = this.novoAluno;

    /**
     * handler para manipular os dados escritos pelo
     * utilizador nas textboxs do formulário
     * @param {*} evento - contém os dados escritos pelo utilizador
     */
    handlerAdicao = (evento) => {
        // ler os dados contidos no 'evento'
        // e atribuí-los às variáveis name e value
        // name - nome do objeto que foi manipulado
        // value - o conteúdo da textbox
        const { name, value } = evento.target;

        // atribuir os dados lidos à 'state'
        this.setState({
            [name]: value
        });
    }

    /**
     * função que irá exportar os dados para fora do Formulário
     */
    submitForm = () => {
        // atribuir ao parâmetro de 'saída'-dadosRecolhidos- o conteúdo do state
        this.props.dadosRecolhidos(this.state);
        this.setState(this.novoAluno);
    }

    render() {
        // estamos a ler os dados que são recebidos pelo componente
        const { dadosCaes } = this.props

        return (
            // o 'return' só consegue devolver UM objeto
            <form>
                Fotografia: <input type="text" /><br />
                Data da Foto: <input type="date" /><br />
                Local da Foto: <input type="text" /><br />
                Cão: <EscolheCao listaCaes={dadosCaes} /><br />
                <input type="submit" value="Adicionar foto" />


                {/* Nome: <input type="text"
                    className="form-control"
                    name="nome"
                    value={nome}
                    onChange={this.handlerAdicao}
                /><br />
                Apelido: <input type="text"
                    className="form-control"
                    name="apelido"
                    value={apelido}
                    onChange={this.handlerAdicao}
                /><br />
                <input type="button"
                    className="btn btn-primary"
                    value="Adicionar"
                    onClick={this.submitForm}
                /> */}
            </form>
        )
    }
}

export default Formulario;

