
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: /Users/skup/Downloads/GrafanaK6/src/GrafanaTestTypes/xss2.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


     ✓ X-Frame-Options is DENY or SAMEORIGIN

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 10 kB   47 kB/s
     data_sent......................: 539 B   2.5 kB/s
     http_req_blocked...............: avg=165ms    min=165ms    med=165ms    max=165ms    p(90)=165ms    p(95)=165ms   
     http_req_connecting............: avg=53.53ms  min=53.53ms  med=53.53ms  max=53.53ms  p(90)=53.53ms  p(95)=53.53ms 
     http_req_duration..............: avg=53.09ms  min=53.09ms  med=53.09ms  max=53.09ms  p(90)=53.09ms  p(95)=53.09ms 
       { expected_response:true }...: avg=53.09ms  min=53.09ms  med=53.09ms  max=53.09ms  p(90)=53.09ms  p(95)=53.09ms 
     http_req_failed................: 0.00%   ✓ 0        ✗ 1
     http_req_receiving.............: avg=95µs     min=95µs     med=95µs     max=95µs     p(90)=95µs     p(95)=95µs    
     http_req_sending...............: avg=54µs     min=54µs     med=54µs     max=54µs     p(90)=54µs     p(95)=54µs    
     http_req_tls_handshaking.......: avg=109.56ms min=109.56ms med=109.56ms max=109.56ms p(90)=109.56ms p(95)=109.56ms
     http_req_waiting...............: avg=52.94ms  min=52.94ms  med=52.94ms  max=52.94ms  p(90)=52.94ms  p(95)=52.94ms 
     http_reqs......................: 1       4.577057/s
     iteration_duration.............: avg=218.39ms min=218.39ms med=218.39ms max=218.39ms p(90)=218.39ms p(95)=218.39ms
     iterations.....................: 1       4.577057/s


running (00m00.2s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  00m00.2s/10m0s  1/1 iters, 1 per VU
