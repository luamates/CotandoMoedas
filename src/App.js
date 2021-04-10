//importando os requisitos necessários para o app.
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './style.css'
import icone from '../src/images/icone.png'
import Form from 'react-bootstrap/Form'

    const App = () => { //Declarando as constantes que serão usadas e atribuindo valores a elas.
        
        const [parametros, setParametros] = useState([])
        const [valorReal, setValorReal] = useState('') 
        const [valorFinal, setValorFinal] = useState('')
        const [tipo, setTipo] = useState('')

        useEffect(() => {
            document.title = "Cotando - A melhor plataforma de conversão de real do Mundo!" //Definindo o título da página.
            requisitaTroca()
        }, [])

        useEffect(() => { //funções (async e principal)
            mudaValor() 
        }, [tipo, valorReal])

    async function requisitaTroca() { //função que acessa a url da API de cotação e transcreve os resultados em formato json.
        let url = `https://economia.awesomeapi.com.br/json/all` //URL da API
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setParametros(data)
            })
            .catch(function (error) {
                console.error('Desculpe o imprevisto. Houve um problema no aplicativo.' + error.message); //Caso a requisição não funcione, o usuário receberá essa mensagem.
            });
    }

    function mudaValor() { //Função que converte valores.
        let operacao = tipo ? valorReal / parametros[tipo]['ask'] : 0 //isso é o + importante, pois aqui fica a operação.
        setValorFinal(operacao.toFixed(2))
    }

    return ( //O que retornará do App, tanto o input quanto a saída. No início há o cabeçalho contendo a logo, o título e o slogan. Após há o input do valor em real e da moeda desejada. Finalmente, há a saída com o valor atualizado. No final há o rodapé do site, com o site. 
        <div id="principal"> 
            <div id="topo">
                <img src={icone} title="Conversor de Moedas" alt="Conversor de Moedas" width="90px"/> 
                <h1>COTANDO - CONVERSOR DE MOEDAS</h1> 
            </div>
            <div class="frase">
              <marquee behavior="alternate"><strong>Cotando, o melhor dos melhores conversores de moedas de todo o mundo! Developed by: Mr. Amates & Mr.Lozano.</strong></marquee>
            </div>
            <spam id="input">
                <div id="formulario">
                    <spam id="real">
                        <p><br></br>Insira o valor em Real brasileiro: </p>
                        <Form.Control type="number" value={valorReal} onChange={e => setValorReal(e.target.value)} />
                    </spam>
                    <spam id="processamento">
                        <p><br></br>Converter para: </p>
                        <Form.Control as="select" value={tipo} onChange={e => {
                            setTipo(e.target.value)
                            mudaValor(e)}}>

                            <option value="USD">Dólar</option>
                            <option value="CAD">Dólar Canadense</option>
                            <option value="GBP">Libra Esterlina</option>
                            <option value="EUR">Euro</option>
                            <option value="CHF">Franco Suíço</option>
                            <option value="CNY">Yuan Chinês</option>
                            <option value="JPY">Iene Japonês</option>
                            <option value="ARS">Peso Argentino</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="LTC">Litecoin</option>
                                
                          </Form.Control>
                      </spam>
                      <Form.Group>
                          <Form.Label><br></br>Cotação:</Form.Label>
                          <Form.Control type="text" readOnly value={valorFinal} />
                      </Form.Group>
                      <p> <br></br></p>
                  </div>
            </spam>
            <spam id="footer">
              <h1><hr color="white"></hr><hr color="white"></hr>www.cotando.com.br<hr color="white"></hr><hr color="white"></hr><br></br></h1>
            </spam>
        </div>
    )
}
export default App //Exportar o app para ser usado no index.