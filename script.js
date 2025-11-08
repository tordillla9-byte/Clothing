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
    const apiEndpoint = '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'; // جایگزین کنید
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

