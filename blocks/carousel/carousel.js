export default function decorate(block) {
    [...block.children].forEach((row, r) => {
        [...row.children].forEach((column, c) => {
            if (c === 2) {
                const ul = document.createElement('ul');
                const li = document.createElement('li');
                const text = document.createTextNode('Health');
                li.append(text);
                ul.append(li);
                column.replaceWith(ul);
            }
        });
    });
}