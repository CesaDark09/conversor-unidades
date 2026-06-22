const unidades = {
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
};

function actualizarUnidades() {
    const cat  = document.getElementById('categoria').value;
    const opts = unidades[cat].map(u => `<option value="${u}">${u}</option>`).join('');
    document.getElementById('desde').innerHTML = opts;
    document.getElementById('hacia').innerHTML = opts;
    document.getElementById('hacia').selectedIndex = 1;
    document.getElementById('resultado').textContent = 'Resultado';
}

function convertir() {
    const val = parseFloat(document.getElementById('cantidad').value);
    const de  = document.getElementById('desde').value;
    const a   = document.getElementById('hacia').value;
    const cat = document.getElementById('categoria').value;

    if (isNaN(val)) { alert('Ingresa un valor numérico'); return; }

    if (cat === 'temperatura') {
        let celsius;
        if (de === 'Celsius')    celsius = val;
        if (de === 'Fahrenheit') celsius = (val - 32) * 5 / 9;
        if (de === 'Kelvin')     celsius = val - 273.15;

        let resultado;
        if (a === 'Celsius')    resultado = celsius;
        if (a === 'Fahrenheit') resultado = celsius * 9 / 5 + 32;
        if (a === 'Kelvin')     resultado = celsius + 273.15;

        document.getElementById('resultado').textContent =
            val + ' ' + de + ' = ' + resultado.toFixed(2) + ' ' + a;
    }

}

actualizarUnidades();
