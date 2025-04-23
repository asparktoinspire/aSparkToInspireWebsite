// Website code Copyright © 2025 A Spark to Inspire. All rights reserved. Unauthorized reproduction, distribution, or use of this code, in whole or in part, is strictly prohibited and may result in legal action.

let donationAmount;

function donationSelect(item) {
    const donationButtons = document.querySelectorAll('.donationSelect');
    donationButtons.forEach((button) => {
        if (button.id === item) {
            button.style.backgroundColor = 'rgb(60, 73, 167)';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
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
        document.getElementById('transactionFeeConsentLabel').textContent = 'I agree to cover the transaction fee to ensure that A Spark to Inspire receives 100% of my donation';
    } else {
        document.getElementById('transactionFeeConsentLabel').textContent = `I agree to cover the $${(((donationAmount + 0.3)/(1 - 0.029)) - donationAmount).toFixed(2)} transaction fee to ensure that A Spark to Inspire receives 100% of my donation`
    }
});

function updateTransactionFee() {
    if (isNaN(donationAmount)) {
        document.getElementById('transactionFeeConsentLabel').textContent = 'I agree to cover the transaction fee to ensure that A Spark to Inspire receives 100% of my donation';
    } else {
        document.getElementById('transactionFeeConsentLabel').textContent = `I agree to cover the $${(((donationAmount + 0.3)/(1 - 0.029)) - donationAmount).toFixed(2)} transaction fee to ensure that A Spark to Inspire receives 100% of my donation`
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
        securityStatus.textContent = 'Secure';
        securityStatus.style.color = 'rgb(13,197,13)';
    } else {
        securityStatus.textContent = 'Not Secure';
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
    document.getElementById('linkInMainParagraph').textContent = '[domain]';
    document.getElementById('websiteURL').textContent = '[link]';
    securityStatus.textContent = '[securityStatus]';
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
    if (langDropdown.value === 'spanish') {
        setTimeout(() => {
            window.location.href = 'https://www.asparktoinspire.org/es';
            langDropdown.selectedIndex = 0;
        }, 250);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const langWarning = document.getElementById('langNotice');
    if (navigator.language.includes('es')) {
        langWarning.style.display = 'block';
    } else {
        langWarning.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.userAgent.includes('Windows')) {
        document.getElementById('enOption').textContent = 'English';
        document.getElementById('esOption').textContent = 'Español';
    }
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const formData = new FormData(document.getElementById('contactForm'));

        const response = await fetch('https://script.google.com/macros/s/AKfycbyrQrEVJtvc80CEf2lP2fCmm324b1l6dw0YOoP3UkSiNurkebzIOCrULYUaBBs5Wq7obw/exec', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById('contactForm').reset();
        }
    } catch (err) {
        console.error(err);
        document.getElementById('contactForm').reset();
    }
});

// Website code Copyright © 2025 A Spark to Inspire. All rights reserved. Unauthorized reproduction, distribution, or use of this code, in whole or in part, is strictly prohibited and may result in legal action.