const express = require('express');
const app = express();

app.get('/linked-in', (req, res) => {
    // res.send('All good, you can close this tab');
    res.redirect('http://localhost:4200/get-started')
});
app.get('/callback', (req, res) => {
    console.log(req.query.code);
    res.redirect('/linked-in');
});
app.get('/open', (req, res) => {
    res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86cya16mladui4&redirect_uri=http://localhost:3000/callback&state=foobar&scope=r_liteprofile%20r_emailaddress')
})

app.listen(3000, () => console.log('running on port 3000'));