
document.getElementById('button').addEventListener('click', plotGraph());


function plotGraph() {
    let equation = document.getElementById('equationInput').value;
    let match= equation.match(/y\s*=\s*(\d+)\s*x\s*\+\s*(\d+)/);

    let m = parseInt(match[1]);
    console.log(m);
    let b = parseInt(match[2]);
    console.log(b);

    let xValues = [];
    let yValues = [];

    for (let x = -100; x <= 100; x++) {
        xValues.push(x);
        yValues.push(m * x + b);
    }

    let data = [{
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'y = ' + m + 'x + ' + b
    }];

    Plotly.newPlot('graph', data, {title: 'Graph Plotter'});}