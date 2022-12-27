function deixaInteiros(e) {
    var value = e.value;
    value = value.replace(/\D/g, "");
    e.value = value
}

function gerarRestricoes(e) {
    e.preventDefault();
    var num_variavies = document.getElementById('num_variavies').value;
    var num_restricoes = document.getElementById('num_restricoes').value;
    if (num_restricoes > 0 && num_variavies > 0) {
        let num_linhas = parseInt(num_restricoes) + 1
        document.getElementById('valores_form').innerHTML = '<label class="my-1 mr-2 ">Preencha os valores das expressões:</label>'
        for (var j = 1; j < num_linhas; j++) {
            var line = '<div class="form-inline">';
            for (var i = 1; i <= num_variavies; i++) {
                if (j == 1 && i == 1) { // primeira linha
                    line += '<label class="my-1 mr-2 ">Max Z = </label>';
                } else if (i == 1) {
                    line += '<label class="my-1 mr-2 "> { </label>';
                }
                line += '<input type="number" class="form-control my-1 mr-sm-2 restricoes-input meio" />';

                let sinal = ''
                if (i == num_variavies) {
                    if (j !== 1) {
                        sinal = '<='
                    }
                } else {
                    sinal = '+'
                }
            
                line += '<label class="my-1 mr-2" > X' + i + ' ' + sinal + ' </label>';
                if (j !== 1 && i == num_variavies ) {
                    line += '<input type="number" class="form-control my-1 mr-sm-2 restricoes-input igual"/>'
                }
            }
            line += "</div>";
            document.getElementById('valores_form').innerHTML += line;
        }
        document.getElementById('valores_form').innerHTML += line;
        let lineX = '<div class="form-inline"> <label class="my-1 mr-2" > { X1';
        for (var i = 2; i <= num_variavies; i++) {
            lineX += ', X'+i
        }
        lineX += ' >= 0 </label></div>'
        document.getElementById('valores_form').innerHTML += lineX
        document.getElementById('valores_form').innerHTML += '<button class="btn btn-primary" onclick="reformularRestricoes(event)">Reformular Restricoes</button>'
    } else {
        alert('Número de variáveis e/ou restrições precisam ser maiores que 0!')
    }
}
