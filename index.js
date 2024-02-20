// Flipping the graph
document.getElementById("graphs").addEventListener('dblclick', () => {
    const problem = document.getElementById('problem');
    const usrSolution = document.getElementById('usr_solution');

    if (problem.classList.contains('flipped')) {
        problem.style.transform = 'rotateX(0deg)';
        usrSolution.style.transform = 'rotateX(-180deg)';
        problem.classList.remove('flipped');
    } else {
        problem.style.transform = 'rotateX(180deg)';
        usrSolution.style.transform = 'rotateX(0deg)';
        problem.classList.add('flipped');
    }
});

// Main part
let compX = [];
let compY = [];
let scores = 0;
let randomCompX = [];
let randomCompY = [];

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

        let layout = getLayout();
        let data = [{
            x: xValues,
            y: yValues,
            mode: 'lines',
            name: 'y = ' + m + 'x' + (b !== 0 ? ' + ' + b : '')
        }];

        Plotly.newPlot('graph2', data, layout);

        compX = xValues;
        compY = yValues;
        compareArrays();
    } else {
        alert('Invalid equation format. Please enter a valid linear equation.');
    }
}

function generateRandomGraph() {
    let m = Math.floor(Math.random() * 10) + 1;
    let c = Math.floor(Math.random() * 21);

    randomCompX = [];
    randomCompY = [];

    for (let x = -10; x <= 10; x++) {
        randomCompX.push(x);
        randomCompY.push(m * x + c);
    }

    let layout = getLayout();
    let data = [{
        x: randomCompX,
        y: randomCompY,
        mode: 'lines',
        name: 'Random Graph (y = ' + m + 'x + ' + c + ')'
    }];

    console.log(m, c);

    Plotly.purge('graph');
    Plotly.newPlot('graph', data, layout);
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

function getLayout() {
    return {
        width: '100%',
        height: '100%'
    };
}

function compareArrays() {
    if (arraysEqual(compX, randomCompX) && arraysEqual(compY, randomCompY)) {
        scores++;
        document.getElementById('score').textContent = `Total Score: ${scores}`;
    } else {
        alert('You are wrong! -1 point');
    }
}
