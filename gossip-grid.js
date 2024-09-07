import { gossips as initialGossips } from "./gossip-grid.data.js";

export function grid() {
    let gossips = [...initialGossips];

    // Create ranges
    const ranges = createRanges();
    document.body.appendChild(ranges);

    // Create form for new gossips
    const form = createGossipForm();
    document.body.appendChild(form);

    // Render initial gossips
    renderGossips();

    function createRanges() {
        const rangesDiv = document.createElement('div');
        rangesDiv.className = 'ranges';

        const widthRange = createRange('width', 200, 800, 400, 'Width', (value) => {
            document.querySelectorAll('.gossip').forEach(card => card.style.width = value + 'px');
        });

        const fontSizeRange = createRange('fontSize', 20, 40, 30, 'Font Size', (value) => {
            document.querySelectorAll('.gossip').forEach(card => card.style.fontSize = value + 'px');
        });

        const backgroundRange = createRange('background', 20, 75, 50, 'Background', (value) => {
            document.querySelectorAll('.gossip').forEach(card => card.style.backgroundColor = `hsl(280, 50%, ${value}%)`);
        });

        rangesDiv.append(widthRange, fontSizeRange, backgroundRange);
        return rangesDiv;
    }

    function createRange(id, min, max, value, label, onChange) {
        const rangeDiv = document.createElement('div');
        rangeDiv.className = 'range';

        const input = document.createElement('input');
        input.type = 'range';
        input.id = id;
        input.min = min;
        input.max = max;
        input.value = value;

        const labelElem = document.createElement('label');
        labelElem.htmlFor = id;
        labelElem.textContent = label;

        const span = document.createElement('span');
        span.textContent = value;

        rangeDiv.append(labelElem, input, span);

        input.addEventListener('input', (e) => {
            span.textContent = e.target.value;
            onChange(e.target.value);
        });

        return rangeDiv;
    }

    function createGossipForm() {
        const gossipForm = document.createElement('form');
        gossipForm.className = 'gossip';

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Got a gossip to share?';

        const button = document.createElement('button');
        button.textContent = 'Share gossip!';
        button.type = 'submit';

        button.addEventListener('click', (e) => {
            e.preventDefault();
            let gossip = textarea.value;
            if (gossip.trim()) {
                gossips.unshift(gossip);
                textarea.value = "";
                rerenderGossips();
            }
        });

        gossipForm.append(textarea, button);
        return gossipForm;
    }

    function renderGossips() {
        gossips.forEach(displayGossip);
    }

    function rerenderGossips() {
        document.querySelectorAll(".gossip:not(form)").forEach((gossip) => gossip.remove());
        renderGossips();
    }

    function displayGossip(gossip) {
        const gossipDiv = document.createElement('div');
        gossipDiv.className = 'gossip fade-in';
        gossipDiv.textContent = gossip;
        document.body.appendChild(gossipDiv);
    }
}
