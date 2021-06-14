// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Nome do Cão</th>
                <th>Fotografia</th>
                <th>Local</th>
                <th>Data</th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDasFotos'
    const rows = props.dadosDasFotos.map((row) => {
        return (
            <tr key={row.idFoto}>
                <td>{row.nomeCao}</td>
                <td><img src={'fotos/' + row.nomeFoto}
                    alt={'foto do ' + row.nomeCao}
                    height="50" />
                </td>
                <td>{row.localFoto}</td>
                <td>{row.dataFoto}</td>
            </tr>
        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { dadosFotos } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosFotos' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDasFotos={dadosFotos} />
            </table>
        )
    }
}


export default Tabela

