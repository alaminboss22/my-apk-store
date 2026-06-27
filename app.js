// Telegram WebApp Initialize
const tg = window.Telegram.WebApp;
tg.expand(); // অ্যাপটি সম্পূর্ণ স্ক্রিনে খোলার জন্য

// এখানে আপনার Admin Telegram ID টি দিন
const ADMIN_TELEGRAM_ID = 7884258698; // আপনার আসল আইডি দিয়ে পরিবর্তন করুন

// ডেমো ডেটা (প্রাথমিক অবস্থায় দেখানোর জন্য)
let apkList = [
    { name: "Minecraft Mod", price: "Free", link: "https://example.com/minecraft", image: "https://cdn-icons-png.flaticon.com/512/5261/5261835.png" },
    { name: "GTA SA Mod", price: "Free", link: "https://example.com/gta", image: "https://cdn-icons-png.flaticon.com/512/5261/5261835.png" },
    { name: "PUBG Mod Tool", price: "$1.99", link: "https://example.com/pubg", image: "https://cdn-icons-png.flaticon.com/512/5261/5261835.png" }
];

// ইউজারের রোল চেক করা (Admin নাকি সাধারণ User)
function checkUserRole() {
    const user = tg.initDataUnsafe?.user;
    if (user && user.id === ADMIN_TELEGRAM_ID) {
        document.getElementById('admin-sec').style.display = 'block';
    }
}

// গ্রিডে আইটেম রেন্ডার করা
function renderApks() {
    const grid = document.getElementById('apk-grid');
    grid.innerHTML = ""; // আগেরগুলো ক্লিয়ার করা

    apkList.forEach((apk, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${apk.image}" alt="APK Icon">
            <div>
                <div class="title">${apk.name}</div>
                <div class="price">${apk.price}</div>
            </div>
            <a href="${apk.link}" target="_blank" class="btn-action" onclick="trackDownload('${apk.name}')">GET / ADD</a>
        `;
        grid.appendChild(card);
    });
}

// নতুন APK যুক্ত করার ফাংশন (Admin Only)
function addNewApk() {
    const name = document.getElementById('apk-name').value;
    const price = document.getElementById('apk-price').value;
    const url = document.getElementById('apk-url').value;

    if (!name || !price || !url) {
        alert("দয়া করে সব তথ্য পূরণ করুন।");
        return;
    }

    const newApk = {
        name: name,
        price: price,
        link: url,
        image: "https://cdn-icons-png.flaticon.com/512/5261/5261835.png" // ডিফল্ট অ্যান্ড্রয়েড আইকন
    };

    apkList.push(newApk);
    renderApks(); // গ্রিড আপডেট করুন

    // ইনপুট ফিল্ড ক্লিয়ার করা
    document.getElementById('apk-name').value = '';
    document.getElementById('apk-price').value = '';
    document.getElementById('apk-url').value = '';
}

// ট্র্যাকিং বা টেলিগ্রাম মেসেজ (ঐচ্ছিক)
function trackDownload(apkName) {
    tg.sendData(`Downloaded: ${apkName}`);
}

// অ্যাপ চালুর সময় লোড হবে
window.onload = function() {
    checkUserRole();
    renderApks();
};
