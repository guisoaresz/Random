function formatUSPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');

    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else {
        return phone;
    }
}

async function fetchRandomUser() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const person = data.results[0];

        document.querySelector('.card-foto img').src = person.picture.large;
        document.querySelector('.card-foto img').alt = `Foto de ${person.name.first} ${person.name.last}`;

        document.getElementById('card-random-name').textContent = `${person.name.first} ${person.name.last}`;
        document.getElementById('card-random-gender').textContent = `Gênero: ${person.gender === 'male' ? 'Masculino' : 'Feminino'}`;
        const birthDate = new Date(person.dob.date).toLocaleDateString('pt-BR');
        document.getElementById('card-random-birth').textContent = `Nascimento: ${birthDate}`;

        const rightContent = document.querySelector('.card-right-content');
        rightContent.innerHTML = `
            <p>Mãe: Sra. ${person.name.last}</p>
            <p>Pai: Sr. ${person.name.last}</p>
            <br>
            <p>Telefone: ${formatUSPhoneNumber(person.phone)}</p>
            <p>Celular: ${formatUSPhoneNumber(person.cell)}</p>
            <br>
            <p>Endereço</p>
            <p>Rua: ${person.location.street.name}, ${person.location.street.number}</p>
            <p>Estado: ${person.location.state}</p>
            <p>País: ${person.location.country}</p>
        `;
    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

document.querySelector('button').addEventListener('click', fetchRandomUser);
