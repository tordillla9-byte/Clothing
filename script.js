// API Key رو از متغیر محیطی دریافت کنید
const apiKey = process.env.OPENAI_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/images/generations';

async function generateImage(prompt) {
  try {
    // اعتبارسنجی داده‌ها
    if (!prompt) {
      throw new Error('Generate an image of a person wearing a black leather jacket. The person's face and body should remain the same, but the clothing should be replaced with a black leather jacket.');
    }

    // ارسال درخواست به API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '512x512'
      })
    });

    // بررسی وضعیت پاسخ
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // پردازش پاسخ
    const data = await response.json();

    // بررسی وجود خطا در پاسخ
    if (data.error) {
      throw new Error(data.error.message);
    }

    // بررسی وجود تصویر
    if (!data.data || data.data.length === 0) {
      throw new Error('تصویری تولید نشد.');
    }

    // بازگرداندن آدرس تصویر
    return data.data[0].url;
  } catch (error) {
    // مدیریت خطا
    console.error('Error generating image:', error);
    alert('خطا در تولید تصویر: ' + error.message);
    return null;
  }
}

