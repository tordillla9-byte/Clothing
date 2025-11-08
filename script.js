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


