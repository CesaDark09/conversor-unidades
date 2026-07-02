const unidades = {
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin'],
    distancia: ['Metros', 'Kilómetros', 'Millas']
};

function actualizarUnidades() {
    const cat = document.getElementById('categoria').value;
    const opciones = unidades[cat] || [];
    const opts = opciones.map(u => `<option value="${u}">${u}</option>`).join('');
    const desde = document.getElementById('desde');
    const hacia = document.getElementById('hacia');
    const resultado = document.getElementById('resultado');

    desde.innerHTML = opts;
    hacia.innerHTML = opts;
    desde.selectedIndex = 0;
    hacia.selectedIndex = opciones.length > 1 ? 1 : 0;
    resultado.textContent = 'Resultado';
    resultado.style.color = '#333';
}

function convertirTemperatura(valor, de, a) {
    let celsius;
    if (de === 'Celsius') {
        celsius = valor;
    } else if (de === 'Fahrenheit') {
        // Hotfix: fórmula correcta de Fahrenheit a Celsius
        celsius = (valor - 32) * 5 / 9;
    } else if (de === 'Kelvin') {
        celsius = valor - 273.15;
    }

    if (a === 'Celsius') {
        return celsius;
    } else if (a === 'Fahrenheit') {
        return celsius * 9 / 5 + 32;
    } else if (a === 'Kelvin') {
        return celsius + 273.15;
    }

    return null;
}

function convertirDistancia(valor, de, a) {
    const factores = {
        Metros: 1,
        Kilómetros: 1000,
        Millas: 1609.34
    };

    const metros = valor * factores[de];
    return metros / factores[a];
}

function convertir() {
    const cantidadInput = document.getElementById('cantidad');
    const val = Number.parseFloat(cantidadInput.value);
    const de = document.getElementById('desde').value;
    const a = document.getElementById('hacia').value;
    const cat = document.getElementById('categoria').value;
    const resultado = document.getElementById('resultado');

    if (!Number.isFinite(val) || cantidadInput.value.trim() === '') {
        resultado.textContent = 'Ingresa un valor numérico válido';
        cantidadInput.focus();
        return;
    }

    if (de === a) {
        resultado.textContent = 'Selecciona unidades diferentes';
        return;
    }

    let valorConvertido = null;
    if (cat === 'temperatura') {
        valorConvertido = convertirTemperatura(val, de, a);
    } else if (cat === 'distancia') {
        valorConvertido = convertirDistancia(val, de, a);
    }

    if (valorConvertido === null) {
        resultado.textContent = 'No se pudo realizar la conversión';
        return;
    }

    resultado.textContent = `${val} ${de} = ${valorConvertido.toFixed(2)} ${a}`;
    resultado.style.color = '#1f4f3f';
}

actualizarUnidades();
