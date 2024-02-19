// this has the simple job of flipping the graph question and the user's interpretation
// No changes needed
document.getElementById("graphs").addEventListener('click', () => {
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


