Authorization: Bearer OPENAI_API_KEY
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Organization: $ORGANIZATION_ID" \
  -H "OpenAI-Project: $PROJECT_ID"
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



