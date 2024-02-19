let compX = [];
let compY = [];

generateRandomGraph();

document.getElementById('submit').addEventListener('click', function() {
    let equationInput = document.getElementById('input-equation').value.trim();
    if (equationInput !== '') {
        plotGraph(equationInput);
        document.getElementById('input-equation').value = '';
    } else {
        alert('Please enter a valid equation.');
    }
});

function plotGraph(equation) {
    let match = equation.match(/y\s*=\s*(-?\d*(?:\.\d+)?)\s*x\s*(?:\+\s*(-?\d*(?:\.\d+)?))?/);

    if (match && match.length >= 2) {
        let m = Number(match[1]);
        let b = match[2] ? Number(match[2]) : 0;

        let xValues = [];
        let yValues = [];

        for (let x = -10; x <= 10; x++) {
            xValues.push(x);
            yValues.push(m * x + b);
        }

        let equationData = {
            x: xValues,
            y: yValues,
            mode: 'lines',
            name: 'y = ' + m + 'x' + (b !== 0 ? ' + ' + b : '')
        };

        Plotly.newPlot('graph', [equationData]);

        compX = xValues;
        compY = yValues;
    } else {
        alert('Invalid equation format. Please enter a valid linear equation.');
    }
}

function generateRandomGraph() {
    let randomCompX = [];
    let randomCompY = [];

    let m = Math.floor(Math.random() * 10) + 1;
    let c = Math.floor(Math.random() * 20) - 10;

    for (let x = -10; x <= 10; x++) {
        randomCompX.push(x);
        randomCompY.push(m * x + c);
    }

    let equationData = {
        x: randomCompX,
        y: randomCompY,
        mode: 'lines',
        name: 'Random Graph (y = ' + m + 'x + ' + c + ')'
    };
    console.log(m,c);
    Plotly.newPlot('graph2', [equationData]);
}

document.getElementById('submit').addEventListener('click', function() {
    generateRandomGraph();
});

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
