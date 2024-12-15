import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

   /* Create current date */
   const currentDate = new Date();
   const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

   /* Add the current date below the image */
    const dateDiv = document.createElement('div');
    const dateText = document.createElement('p');
    dateText.textContent = formattedDate; //Set the formatted date text
    dateDiv.className = 'cards-card-date'; //Add a class for styling
    dateDiv.appendChild(dateText);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      }
      else {
        div.prepend(dateDiv); // Prepend the date div below text section
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
