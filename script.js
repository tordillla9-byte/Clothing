async function processImages() {
    const clothingImageInput = document.getElementById('clothingImage');
    const personImageInput = document.getElementById('personImage');
    const resultImage = document.getElementById('resultImage');

    const clothingImageFile = clothingImageInput.files[0];
    const personImageFile = personImageInput.files[0];

    if (!clothingImageFile || !personImageFile) {
        alert('لطفا هر دو عکس را انتخاب کنید.');
        return;
    }

    // تبدیل عکس‌ها به Base64
    const clothingImageBase64 = await toBase64(clothingImageFile);
    const personImageBase64 = await toBase64(personImageFile);

    // ارسال درخواست به API هوش مصنوعی
    const apiKey = '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'; // جایگزین کنید

    const data = {
        clothingImage: clothingImageBase64,
        personImage: personImageBase64
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        resultImage.src = result.outputImage; // فرض بر این است که API یک فیلد به نام outputImage برمی‌گرداند
    } catch (error) {
        console.error('Error:', error);
        alert('خطا در پردازش عکس.');
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

