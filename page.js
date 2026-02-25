// Simple HTML page test
module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html> 
    <head>
      <title>Vercel Test</title>
      <style>
        body { background:#060a0e; color:#00e5cc; font-family:monospace;
               display:flex; align-items:center; justify-content:center;
               height:100vh; margin:0; flex-direction:column; gap:15px }
        h1   { color:#fff; font-size:2rem }
        .ok  { color:#00dd77; font-size:1.2rem }
        .box { background:#0c1520; border:1px solid #152535; padding:20px;
               border-radius:4px; min-width:300px }
        .row { display:flex; justify-content:space-between; padding:5px 0;
               border-bottom:1px solid #152535 }
      </style>
    </head>
    <body>
      <h1>⚡ VERCEL TEST</h1>
      <div class="ok">✅ Page is working!</div>
      <div class="box">
        <div class="row"><span>Page</span><span style="color:#00dd77">✅ OK</span></div>
        <div class="row"><span>Time</span><span>${new Date().toLocaleTimeString()}</span></div>
        <div class="row"><span>API test</span>
          <span id="api">checking...</span>
        </div>
        <div class="row"><span>DB test</span>
          <span id="db">checking...</span>
        </div>
      </div>
      <script>
        // Test API
        fetch('/api/hello')
          .then(r => r.json())
          .then(d => {
            document.getElementById('api').textContent = '✅ OK';
            document.getElementById('api').style.color = '#00dd77';
          })
          .catch(e => {
            document.getElementById('api').textContent = '❌ FAILED';
            document.getElementById('api').style.color = '#ff3355';
          });

        // Test DB
        fetch('/api/dbtest')
          .then(r => r.json())
          .then(d => {
            if (d.status === 'ok') {
              document.getElementById('db').textContent = '✅ DB Connected!';
              document.getElementById('db').style.color = '#00dd77';
            } else {
              document.getElementById('db').textContent = '❌ ' + d.msg;
              document.getElementById('db').style.color = '#ff3355';
            }
          })
          .catch(e => {
            document.getElementById('db').textContent = '❌ ' + e.message;
            document.getElementById('db').style.color = '#ff3355';
          });
      </script>
    </body>
    </html>
  `);
};
