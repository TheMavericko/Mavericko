const https = require('https');

https.get('https://www.google.com', (res) => {
    const serverTime = new Date(res.headers.date).getTime();
    const localTime = Date.now();
    const diff = localTime - serverTime;

    console.log('Server Time (Google):', new Date(serverTime).toISOString());
    console.log('Local Time (System): ', new Date(localTime).toISOString());
    console.log('Difference (ms):     ', diff);
    console.log('Difference (hours):  ', diff / 1000 / 60 / 60);
    console.log('Difference (days):   ', diff / 1000 / 60 / 60 / 24);
}).on('error', (e) => {
    console.error(e);
});
