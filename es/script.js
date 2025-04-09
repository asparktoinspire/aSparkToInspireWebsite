// Código del sitio web Copyright © 2025 A Spark to Inspire. La reproducción, distribución o uso no autorizado de este código, total o parcial, está estrictamente prohibido y puede resultar en acciones legales.

let donationAmount;

function donationSelect(item) {
    const donationButtons = document.querySelectorAll('.donationSelect');
    donationButtons.forEach((button) => {
        if (button.id === item) {
            button.style.backgroundColor = 'rgb(0, 174, 248)';
        } else {
            button.style.backgroundColor = 'white';
        }

        if (item === 'donationOther') {
            document.getElementById('otherAmountContainer').style.display = 'flex';
        } else {
            document.getElementById('otherAmountContainer').style.display = 'none';
            document.getElementById('transactionFeeConsentLabel').textContent = `I agree to cover the $${(((donationAmount + 0.3)/(1 - 0.029)) - donationAmount).toFixed(2)} transaction fee to ensure that A Spark to Inspire receives 100% of my donation`
        }
    });
}

document.getElementById('otherAmount').addEventListener('input', () => {
    if (document.getElementById('otherAmount').value > 2000) {
        document.getElementById('otherAmount').value = '2000';
    } else if (document.getElementById('otherAmount').value < 0) {
        document.getElementById('otherAmount').value = '0';
    }

    if (document.getElementById('otherAmount').value.includes('.')) {
        [dollars, cents] = document.getElementById('otherAmount').value.split('.');
        document.getElementById('otherAmount').value = dollars;
    }

    donationAmount = parseInt(document.getElementById('otherAmount').value);
    if (isNaN(donationAmount)) {
        document.getElementById('transactionFeeConsentLabel').textContent = 'Acepto cubrir la tarifa de transacción para garantizar que A Spark to Inspire reciba el 100% de mi donación';
    } else {
        document.getElementById('transactionFeeConsentLabel').textContent = `Acepto cubrir la tarifa de transacción de $${(((donationAmount + 0.3)/(1 - 0.029)) - donationAmount).toFixed(2)} para garantizar que A Spark to Inspire reciba el 100% de mi donación`;
    }
});

function updateTransactionFee() {
    if (isNaN(donationAmount)) {
        document.getElementById('transactionFeeConsentLabel').textContent = 'Acepto cubrir la tarifa de transacción para garantizar que A Spark to Inspire reciba el 100% de mi donación';
    } else {
        document.getElementById('transactionFeeConsentLabel').textContent = `Acepto cubrir la tarifa de transacción de $${(((donationAmount + 0.3)/(1 - 0.029)) - donationAmount).toFixed(2)} para garantizar que A Spark to Inspire reciba el 100% de mi donación`;
    }
}

function checkSize() {
    if (document.documentElement.clientWidth < 750) {
        document.getElementById('teamMemberOverviews').style.display = 'block';
    } else {
        document.getElementById('teamMemberOverviews').style.display = 'flex';
    }

    if (document.documentElement.clientWidth < 650) {
        document.getElementById('headerItems').style.display = 'none';
        document.getElementById('mainTitle').style.fontSize = '50pt';
    } else {
        document.getElementById('headerItems').style.display = 'block';
        document.getElementById('mainTitle').style.fontSize = '75pt';
    }
}

window.addEventListener('resize', checkSize);
document.addEventListener('DOMContentLoaded', checkSize);

let focusedLink;

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (!link.href.includes(window.location.hostname) && !link.href.includes('mailto') && link.id !== 'langSwitchPromptLink') {
                e.preventDefault();
                linkSecurity(link.href);
            }
        });
    });
});

function linkSecurity(url) {
    const securityDialog = document.getElementById('linkSecurity');
    const securityStatus = document.getElementById('securityStatus');
    const background = document.getElementById('popupBackground');
    [security, mainLink] = url.split('://');
    [domain, sublinks] = mainLink.split('/');
    document.getElementById('linkInMainParagraph').textContent = domain;
    document.getElementById('websiteURL').textContent = url;
    if (security === 'https') {
        securityStatus.textContent = 'Seguro';
        securityStatus.style.color = 'rgb(13,197,13)';
    } else {
        securityStatus.textContent = 'No Seguro';
        securityStatus.style.color = 'rgb(207,7,7)';
    }
    securityDialog.style.display = 'block';
    background.style.display = 'block';
    focusedLink = url;
    document.body.style.overflow = 'hidden';
}

function linkApproved() {
    window.open(focusedLink, '_blank');
    closeDialog();
}

function closeDialog() {
    const securityDialog = document.getElementById('linkSecurity');
    const securityStatus = document.getElementById('securityStatus');
    const background = document.getElementById('popupBackground');
    focusedLink = undefined;
    document.getElementById('linkInMainParagraph').textContent = '[dominio]';
    document.getElementById('websiteURL').textContent = '[enlace]';
    securityStatus.textContent = '[estado de seguridad]';
    securityStatus.style.color = 'rgb(0, 0, 0)';
    securityDialog.style.display = 'none';
    background.style.display = 'none';
    document.body.style.overflow = 'visible';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

const langDropdown = document.getElementById('langSelect');

langDropdown.addEventListener('change', () => {
    if (langDropdown.value === 'english') {
        setTimeout(() => {
            window.location.href = 'https://www.asparktoinspire.org';
            langDropdown.selectedIndex = 1;
        }, 250);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const langWarning = document.getElementById('langNotice')
    if (navigator.language.includes('en')) {
        langWarning.style.display = 'block';
    } else {
        langWarning.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.userAgent.includes("Windows")) {
        document.getElementById('enOption').textContent = 'English';
        document.getElementById('esOption').textContent = 'Español';
    }
});

// Código del sitio web Copyright © 2025 A Spark to Inspire. La reproducción, distribución o uso no autorizado de este código, total o parcial, está estrictamente prohibido y puede resultar en acciones legales.