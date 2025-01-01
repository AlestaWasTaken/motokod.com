function redirectToInput() {
    const input = document.getElementById('userInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    // Eğer input boşsa hata mesajını göster
    if (input.length === 0) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Takip kodu boş bırakılamaz.';
        return; // Fonksiyonu sonlandırarak diğer işlemleri engelle
    }

    // Eğer input geçerli ise yönlendirme yapılır
    const sanitizedInput = input.replace('-', ''); // "-" işaretini kaldır
    if (sanitizedInput.length === 6 && !isNaN(sanitizedInput)) {
        window.location.href = `./users/${sanitizedInput}/`; // "-" olmadan yönlendirme yap
    } else {
        // Geçerli değilse hata mesajını göster
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Hatalı giriş! Lütfen 6 haneli bir sayı girin.';
    }
}

function handleKeyPress(event) {
    // Yalnızca Enter tuşuna basıldığında işlem yapılır
    if (event.key === 'Enter') {
        redirectToInput();
    }
}

function validateInput(event) {
    let input = event.target.value.replace('-', ''); // "-" karakterini temizle
    const errorMessage = document.getElementById('errorMessage');
    
    // Sadece sayı olmasına izin ver
    if (isNaN(input)) {
        event.target.value = input.slice(0, -1);
        return;
    }

    // Eğer 3 karakter girilmişse otomatik olarak "-" ekle
    if (input.length > 3) {
        input = input.slice(0, 3) + '-' + input.slice(3, 6);
    }

    // En fazla 6 karaktere izin ver
    if (input.replace('-', '').length > 6) {
        input = input.slice(0, 7); // Sadece 6 haneli sayı kabul et
    }

    event.target.value = input;

    // Input boşsa, hata mesajını gizle
    if (input.length === 0) {
        errorMessage.style.display = 'none';
    }
}

// Bu satırda, input elemanına keydown olayını ekliyoruz
document.getElementById('userInput').addEventListener('input', validateInput);
document.getElementById('userInput').addEventListener('keydown', handleKeyPress);
