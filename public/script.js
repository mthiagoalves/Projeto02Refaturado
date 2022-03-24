const cards = document.querySelectorAll('.card');

const toggleExpansion = (element, to, duration = 350) => {
    return new Promise(res => {
        requestAnimationFrame(() => {
        Element.style.transition = `
            width ${duration}ms ease-in-out,
            height ${duration}ms ease-in-out,
            left ${duration}ms ease-in-out,
            top ${duration}ms ease-in-out`;

        Element.style.top = to.top;
        Element.style.left = to.left;
        Element.style.width = to.width;
        Element.style.height = to.height;
        });
        setTimeout(res, duration);
    })
}

const fadeContent = (element, duration = 300) => {
    return new Promise (res => {
        [...element.children].forEach((child) => {
            requestAnimationFrame(() => {
                child.style.transition = `opacity ${duration}ms linear`;
                child.style.opacity = '0';
            });
        });
        setTimeout(res, duration);
    })
}

const onCardClick = async (e) => {
    const card = e.currentTarget;

    //clone de card
    const cardClone = card.cloneNode(true);

    //ver a localização do card
    const {top, left, width, height} = card.getBoundingClientRect();

    //Pega as posições do card e faz o clone igual
    cardClone.style.position = 'fixed';
    cardClone.style.top = top + 'px';
    cardClone.style.left = left + 'px';
    cardClone.style.width = width + 'px';
    cardClone.style.height = height + 'px';

    //Esconder o card original zerando a opacidade
    card.style.opacity = '0';

    //adicionar o novo card no container
    card.parentNode.appendChild(cardClone);

    //Criar um botao para volta pro card de antes 
    const closeButton = document.createElement('button');

    closeButton.style = `
    position: 'fixed';
    z-index: 9999;
    top: 5rem;
    right: 5rem;
    width: 5rem;
    heigth:5rem;
    border-radius: 50%;
    background-color: #222;`;

    cardClone.addEventListener('click', async() => {
        //remove o botao de fechar
        cardClone.remove();

        await toggleExpansion(cardClone, {
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`}, 300);

    })

    await toggleExpansion(cardClone, {top:0, left: 0, width: '50vw', height: '50vh'});
    cardClone.appendChild(closeButton);

    //expandir o clone
    requestAnimationFrame(() => {
        Element.style.transition = `
        width 350ms ease-in-out,
        height 350ms ease-in-out,
        left 350ms ease-in-out,
        top 350ms ease-in-out`;

        Element.style.top = 0;
        Element.style.left = 0;
        Element.style.width = '50vw';
        Element.style.height = '50vh';
    })
}

cards.forEach(card => card.addEventListener('click', onCardClick));