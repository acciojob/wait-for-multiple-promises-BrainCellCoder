// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(id) {
    return new Promise((resolve) => {
        const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ id, time });
        }, time * 1000);
    });
}

// Create an array of three promises
const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3)
];

// Start time
const startTime = performance.now();

// Set initial loading text in the table
const outputElement = document.getElementById('output');
outputElement.innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
    .then(results => {
        // Calculate total time taken
        const totalTime = (performance.now() - startTime) / 1000;

        // Clear the "Loading..." row
        outputElement.innerHTML = '';

        // Populate the table with the results
        results.forEach(result => {
            const row = document.createElement('tr');
            const promiseCell = document.createElement('td');
            const timeCell = document.createElement('td');

            promiseCell.textContent = `Promise ${result.id}`;
            timeCell.textContent = result.time.toFixed(3);

            row.appendChild(promiseCell);
            row.appendChild(timeCell);
            outputElement.appendChild(row);
        });

        // Add the total time row
        const totalRow = document.createElement('tr');
        const totalLabelCell = document.createElement('td');
        const totalTimeCell = document.createElement('td');

        totalLabelCell.textContent = 'Total';
        totalTimeCell.textContent = totalTime.toFixed(3);

        totalRow.appendChild(totalLabelCell);
        totalRow.appendChild(totalTimeCell);
        outputElement.appendChild(totalRow);
    });
